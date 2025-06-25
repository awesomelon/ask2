import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

// 타입 정의
export interface TalentInfo {
  name: string;
  email: string;
  phone: string;
}

export interface WorkHistory {
  id: string;
  position: string;
  company: string;
  startDate: string;
  endDate: string;
  responsibilities: string;
}

export interface TargetCompany {
  id: string;
  name: string;
  domain: string;
  contactPerson: string;
  contactEmail: string;
}

export interface Question {
  id: string;
  text: string;
  isDefault: boolean;
  isEnabled: boolean;
  order: number;
}

export interface WizardFormData {
  talentInfo: TalentInfo;
  workHistory: WorkHistory[];
  targetCompanies: TargetCompany[];
  questions: Question[];
  termsAccepted: boolean;
}

interface WizardContextType {
  currentStep: number;
  totalSteps: number;
  formData: WizardFormData;
  isStepValid: (step: number) => boolean;
  canNavigateNext: boolean;
  canNavigatePrevious: boolean;
  goToStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  updateFormData: <K extends keyof WizardFormData>(
    key: K,
    value: WizardFormData[K]
  ) => void;
  updateTalentInfo: (info: Partial<TalentInfo>) => void;
  addWorkHistory: (history: Omit<WorkHistory, "id">) => void;
  updateWorkHistory: (id: string, history: Partial<WorkHistory>) => void;
  removeWorkHistory: (id: string) => void;
  addTargetCompany: (company: Omit<TargetCompany, "id">) => void;
  removeTargetCompany: (id: string) => void;
  updateQuestion: (id: string, question: Partial<Question>) => void;
  addCustomQuestion: (text: string) => void;
  reorderQuestions: (questions: Question[]) => void;
  resetWizard: () => void;
  clearFormData: () => void;
  exportFormData: () => {
    formData: WizardFormData;
    currentStep: number;
    timestamp: string;
  };
}

const initialFormData: WizardFormData = {
  talentInfo: {
    name: "",
    email: "",
    phone: "",
  },
  workHistory: [],
  targetCompanies: [],
  questions: [
    {
      id: "q1",
      text: "해당 인재의 업무 성과를 어떻게 평가하시나요?",
      isDefault: true,
      isEnabled: true,
      order: 1,
    },
    {
      id: "q2",
      text: "팀워크와 협업 능력은 어떠했나요?",
      isDefault: true,
      isEnabled: true,
      order: 2,
    },
    {
      id: "q3",
      text: "의사소통 능력과 리더십은 어떠했나요?",
      isDefault: true,
      isEnabled: true,
      order: 3,
    },
    {
      id: "q4",
      text: "기술적 역량과 전문성은 어떠했나요?",
      isDefault: true,
      isEnabled: true,
      order: 4,
    },
    {
      id: "q5",
      text: "다시 함께 일할 의향이 있으신가요?",
      isDefault: true,
      isEnabled: true,
      order: 5,
    },
  ],
  termsAccepted: false,
};

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export const useWizard = () => {
  const context = useContext(WizardContext);
  if (context === undefined) {
    throw new Error("useWizard must be used within a WizardProvider");
  }
  return context;
};

interface WizardProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = "ask2-wizard-form-data";
const STORAGE_STEP_KEY = "ask2-wizard-current-step";

// 로컬 스토리지에서 데이터 로드
const loadFromStorage = (): {
  formData: WizardFormData;
  currentStep: number;
} => {
  try {
    const savedFormData = localStorage.getItem(STORAGE_KEY);
    const savedStep = localStorage.getItem(STORAGE_STEP_KEY);

    return {
      formData: savedFormData ? JSON.parse(savedFormData) : initialFormData,
      currentStep: savedStep ? parseInt(savedStep, 10) : 1,
    };
  } catch (error) {
    console.warn("Failed to load wizard data from localStorage:", error);
    return {
      formData: initialFormData,
      currentStep: 1,
    };
  }
};

// 로컬 스토리지에 데이터 저장
const saveToStorage = (formData: WizardFormData, currentStep: number) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    localStorage.setItem(STORAGE_STEP_KEY, currentStep.toString());
  } catch (error) {
    console.warn("Failed to save wizard data to localStorage:", error);
  }
};

export const WizardProvider: React.FC<WizardProviderProps> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<WizardFormData>(initialFormData);
  const [isInitialized, setIsInitialized] = useState(false);
  const totalSteps = 5;

  // 컴포넌트 마운트 시 로컬 스토리지에서 데이터 로드
  useEffect(() => {
    const { formData: savedFormData, currentStep: savedStep } =
      loadFromStorage();
    setFormData(savedFormData);
    setCurrentStep(savedStep);
    setIsInitialized(true);
  }, []);

  // 폼 데이터나 현재 단계가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    if (isInitialized) {
      saveToStorage(formData, currentStep);
    }
  }, [formData, currentStep, isInitialized]);

  // 각 단계별 유효성 검사
  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1: // Talent Info
        return !!(
          formData.talentInfo.name.trim() &&
          formData.talentInfo.email.trim() &&
          formData.talentInfo.phone.trim() &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.talentInfo.email)
        );
      case 2: // Work History
        return formData.workHistory.length > 0;
      case 3: // Target Companies
        return formData.targetCompanies.length > 0;
      case 4: // Questions
        return formData.questions.some((q) => q.isEnabled);
      case 5: // Confirmation
        return formData.termsAccepted;
      default:
        return false;
    }
  };

  const canNavigateNext = currentStep < totalSteps && isStepValid(currentStep);
  const canNavigatePrevious = currentStep > 1;

  const goToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  };

  const nextStep = () => {
    if (canNavigateNext) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const previousStep = () => {
    if (canNavigatePrevious) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const updateFormData = <K extends keyof WizardFormData>(
    key: K,
    value: WizardFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const updateTalentInfo = (info: Partial<TalentInfo>) => {
    setFormData((prev) => ({
      ...prev,
      talentInfo: { ...prev.talentInfo, ...info },
    }));
  };

  const addWorkHistory = (history: Omit<WorkHistory, "id">) => {
    const newHistory: WorkHistory = {
      ...history,
      id: Date.now().toString(),
    };
    setFormData((prev) => ({
      ...prev,
      workHistory: [...prev.workHistory, newHistory],
    }));
  };

  const updateWorkHistory = (id: string, history: Partial<WorkHistory>) => {
    setFormData((prev) => ({
      ...prev,
      workHistory: prev.workHistory.map((item) =>
        item.id === id ? { ...item, ...history } : item
      ),
    }));
  };

  const removeWorkHistory = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      workHistory: prev.workHistory.filter((item) => item.id !== id),
    }));
  };

  const addTargetCompany = (company: Omit<TargetCompany, "id">) => {
    const newCompany: TargetCompany = {
      ...company,
      id: Date.now().toString(),
    };
    setFormData((prev) => ({
      ...prev,
      targetCompanies: [...prev.targetCompanies, newCompany],
    }));
  };

  const removeTargetCompany = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      targetCompanies: prev.targetCompanies.filter((item) => item.id !== id),
    }));
  };

  const updateQuestion = (id: string, question: Partial<Question>) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.map((item) =>
        item.id === id ? { ...item, ...question } : item
      ),
    }));
  };

  const addCustomQuestion = (text: string) => {
    const newQuestion: Question = {
      id: `custom-${Date.now()}`,
      text,
      isDefault: false,
      isEnabled: true,
      order: formData.questions.length + 1,
    };
    setFormData((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }));
  };

  const reorderQuestions = (questions: Question[]) => {
    setFormData((prev) => ({ ...prev, questions }));
  };

  // 로컬 스토리지 관리 함수들
  const clearFormData = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STORAGE_STEP_KEY);
    } catch (error) {
      console.warn("Failed to clear wizard data from localStorage:", error);
    }
  };

  const resetWizard = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
    clearFormData();
  };

  const exportFormData = () => {
    return {
      formData,
      currentStep,
      timestamp: new Date().toISOString(),
    };
  };

  const value: WizardContextType = {
    currentStep,
    totalSteps,
    formData,
    isStepValid,
    canNavigateNext,
    canNavigatePrevious,
    goToStep,
    nextStep,
    previousStep,
    updateFormData,
    updateTalentInfo,
    addWorkHistory,
    updateWorkHistory,
    removeWorkHistory,
    addTargetCompany,
    removeTargetCompany,
    updateQuestion,
    addCustomQuestion,
    reorderQuestions,
    resetWizard,
    clearFormData,
    exportFormData,
  };

  return (
    <WizardContext.Provider value={value}>{children}</WizardContext.Provider>
  );
};
