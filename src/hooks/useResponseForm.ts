import { useState, useEffect } from "react";
import type { ReferenceQuestion, ReferenceResponse } from "@/mocks";
import {
  validateResponseToken,
  markTokenAsUsed,
  mockReferenceQuestions,
  findMockRequestById,
} from "@/mocks";

export interface ResponseFormData {
  responses: Array<{
    questionId: string;
    answer: string;
    rating?: number;
  }>;
  additionalComments: string;
  isAnonymous: boolean;
}

export interface TokenValidationResult {
  isValid: boolean;
  error?: string;
  message?: string;
  tokenData?: any;
}

export interface UseResponseFormReturn {
  // Token state
  tokenValidation: TokenValidationResult | null;
  isValidatingToken: boolean;

  // Form state
  formData: ResponseFormData;
  setFormData: React.Dispatch<React.SetStateAction<ResponseFormData>>;

  // Questions
  questions: ReferenceQuestion[];

  // Request info
  requestInfo: any;

  // Submission
  isSubmitting: boolean;
  submitResponse: () => Promise<{ success: boolean; error?: string }>;

  // Local storage
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
  clearLocalStorage: () => void;
}

export const useResponseForm = (token: string): UseResponseFormReturn => {
  const [tokenValidation, setTokenValidation] =
    useState<TokenValidationResult | null>(null);
  const [isValidatingToken, setIsValidatingToken] = useState(true);
  const [questions, setQuestions] = useState<ReferenceQuestion[]>([]);
  const [requestInfo, setRequestInfo] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<ResponseFormData>({
    responses: [],
    additionalComments: "",
    isAnonymous: false,
  });

  const localStorageKey = `response_form_${token}`;

  // Initialize form responses based on questions
  const initializeFormResponses = (questionList: ReferenceQuestion[]) => {
    const initialResponses = questionList.map((question) => ({
      questionId: question.id,
      answer: question.type === "rating" ? "" : "",
      rating: question.type === "rating" ? undefined : undefined,
    }));

    setFormData((prev) => ({
      ...prev,
      responses: initialResponses,
    }));
  };

  // Token validation and data loading
  const validateTokenAndLoadData = async () => {
    try {
      setIsValidatingToken(true);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Validate token
      const validation = validateResponseToken(token);
      setTokenValidation(validation);

      if (!validation.isValid || !validation.tokenData) {
        return;
      }

      // Load request info
      const request = findMockRequestById(validation.tokenData.requestId);
      setRequestInfo({
        ...request,
        respondentName: validation.tokenData.respondentName,
        respondentEmail: validation.tokenData.respondentEmail,
        companyName: validation.tokenData.companyId,
      });

      // Load questions
      setQuestions(mockReferenceQuestions);
      initializeFormResponses(mockReferenceQuestions);

      // Try to load saved data from localStorage
      loadFromLocalStorage();
    } catch (error) {
      console.error("Error validating token:", error);
      setTokenValidation({
        isValid: false,
        error: "VALIDATION_ERROR",
        message: "토큰 검증 중 오류가 발생했습니다.",
      });
    } finally {
      setIsValidatingToken(false);
    }
  };

  // Local storage functions
  const saveToLocalStorage = () => {
    try {
      localStorage.setItem(localStorageKey, JSON.stringify(formData));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  };

  const loadFromLocalStorage = () => {
    try {
      const saved = localStorage.getItem(localStorageKey);
      if (saved) {
        const parsedData = JSON.parse(saved);
        setFormData((prev) => ({
          ...prev,
          ...parsedData,
        }));
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error);
    }
  };

  const clearLocalStorage = () => {
    try {
      localStorage.removeItem(localStorageKey);
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  };

  // Form submission
  const submitResponse = async (): Promise<{
    success: boolean;
    error?: string;
  }> => {
    try {
      setIsSubmitting(true);

      // Validate required fields
      const requiredQuestions = questions.filter((q) => q.required);
      const missingResponses = requiredQuestions.filter((q) => {
        const response = formData.responses.find((r) => r.questionId === q.id);
        if (q.type === "rating") {
          return !response?.rating || response.rating === 0;
        }
        return !response?.answer?.trim();
      });

      if (missingResponses.length > 0) {
        return {
          success: false,
          error: "필수 질문에 답변해주세요.",
        };
      }

      // Simulate API submission
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock response creation
      const responseData: Partial<ReferenceResponse> = {
        id: `resp-${Date.now()}`,
        requestId: tokenValidation?.tokenData?.requestId,
        companyId: tokenValidation?.tokenData?.companyId,
        respondentName: tokenValidation?.tokenData?.respondentName,
        respondentEmail: tokenValidation?.tokenData?.respondentEmail,
        responses: formData.responses.map((r) => {
          const question = questions.find((q) => q.id === r.questionId);
          return {
            questionId: r.questionId,
            question: question?.text || "",
            answer: r.answer,
            rating: r.rating,
          };
        }),
        additionalComments: formData.additionalComments,
        submittedAt: new Date(),
        isAnonymous: formData.isAnonymous,
      };

      console.log("Response submitted:", responseData);

      // Mark token as used
      markTokenAsUsed(token);

      // Clear local storage
      clearLocalStorage();

      return { success: true };
    } catch (error) {
      console.error("Error submitting response:", error);
      return {
        success: false,
        error: "응답 제출 중 오류가 발생했습니다.",
      };
    } finally {
      setIsSubmitting(false);
    }
  };

  // Auto-save to localStorage on form data change
  useEffect(() => {
    if (tokenValidation?.isValid && formData.responses.length > 0) {
      const timeoutId = setTimeout(() => {
        saveToLocalStorage();
      }, 1000); // Debounce for 1 second

      return () => clearTimeout(timeoutId);
    }
  }, [formData, tokenValidation?.isValid]);

  // Initialize on token change
  useEffect(() => {
    if (token) {
      validateTokenAndLoadData();
    }
  }, [token]);

  return {
    tokenValidation,
    isValidatingToken,
    formData,
    setFormData,
    questions,
    requestInfo,
    isSubmitting,
    submitResponse,
    saveToLocalStorage,
    loadFromLocalStorage,
    clearLocalStorage,
  };
};
