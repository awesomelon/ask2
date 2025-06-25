import { useState, useEffect } from "react";
import { validateResponseToken, findMockRequestById } from "@/mocks";

export interface ConsentItem {
  id: string;
  title: string;
  description: string;
  required: boolean;
  accepted: boolean;
}

export interface ConsentFormData {
  consentItems: ConsentItem[];
  signature: string;
  signatureDate: Date | null;
  allRequiredAccepted: boolean;
}

export interface UseConsentFormReturn {
  // Token state
  tokenValidation: any;
  isValidatingToken: boolean;

  // Request info
  requestInfo: any;

  // Consent form state
  formData: ConsentFormData;
  updateConsent: (itemId: string, accepted: boolean) => void;
  updateSignature: (signature: string) => void;

  // Submission
  isSubmitting: boolean;
  submitConsent: () => Promise<{ success: boolean; error?: string }>;

  // Helper
  canSubmit: boolean;
}

const defaultConsentItems: ConsentItem[] = [
  {
    id: "personal_info",
    title: "개인정보 수집 및 이용 동의",
    description:
      "평판 조회를 위해 귀하의 이름, 이메일, 직장 정보 등 개인정보를 수집하고 이용합니다. 수집된 정보는 평판 조회 목적으로만 사용되며, 조회 완료 후 안전하게 폐기됩니다.",
    required: true,
    accepted: false,
  },
  {
    id: "data_sharing",
    title: "제3자 정보 제공 동의",
    description:
      "평판 조회 요청자에게 귀하의 응답 내용이 제공됩니다. 단, 익명 응답을 선택하실 경우 개인 식별 정보는 제공되지 않습니다.",
    required: true,
    accepted: false,
  },
  {
    id: "marketing",
    title: "마케팅 정보 수신 동의 (선택)",
    description:
      "ASK2 서비스의 새로운 기능, 이벤트, 프로모션 등의 정보를 이메일로 받아보실 수 있습니다.",
    required: false,
    accepted: false,
  },
];

export const useConsentForm = (token: string): UseConsentFormReturn => {
  const [tokenValidation, setTokenValidation] = useState<any>(null);
  const [isValidatingToken, setIsValidatingToken] = useState(true);
  const [requestInfo, setRequestInfo] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<ConsentFormData>({
    consentItems: defaultConsentItems,
    signature: "",
    signatureDate: null,
    allRequiredAccepted: false,
  });

  // Update consent for specific item
  const updateConsent = (itemId: string, accepted: boolean) => {
    setFormData((prev) => {
      const updatedItems = prev.consentItems.map((item) =>
        item.id === itemId ? { ...item, accepted } : item
      );

      const allRequiredAccepted = updatedItems
        .filter((item) => item.required)
        .every((item) => item.accepted);

      return {
        ...prev,
        consentItems: updatedItems,
        allRequiredAccepted,
      };
    });
  };

  // Update signature
  const updateSignature = (signature: string) => {
    setFormData((prev) => ({
      ...prev,
      signature,
      signatureDate: signature ? new Date() : null,
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

  // Submit consent
  const submitConsent = async (): Promise<{
    success: boolean;
    error?: string;
  }> => {
    try {
      setIsSubmitting(true);

      // Validate required consents
      if (!formData.allRequiredAccepted) {
        return {
          success: false,
          error: "필수 동의 항목에 모두 동의해주세요.",
        };
      }

      // Validate signature
      if (!formData.signature.trim()) {
        return {
          success: false,
          error: "전자 서명을 입력해주세요.",
        };
      }

      // Simulate API submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock consent record
      const consentRecord = {
        id: `consent-${Date.now()}`,
        token,
        requestId: tokenValidation?.tokenData?.requestId,
        respondentEmail: tokenValidation?.tokenData?.respondentEmail,
        consentItems: formData.consentItems,
        signature: formData.signature,
        signatureDate: formData.signatureDate,
        submittedAt: new Date(),
        ipAddress: "127.0.0.1", // Mock IP
      };

      console.log("Consent submitted:", consentRecord);

      return { success: true };
    } catch (error) {
      console.error("Error submitting consent:", error);
      return {
        success: false,
        error: "동의 처리 중 오류가 발생했습니다.",
      };
    } finally {
      setIsSubmitting(false);
    }
  };

  // Initialize on token change
  useEffect(() => {
    if (token) {
      validateTokenAndLoadData();
    }
  }, [token]);

  // Calculate if form can be submitted
  const canSubmit =
    formData.allRequiredAccepted &&
    formData.signature.trim().length > 0 &&
    !isSubmitting;

  return {
    tokenValidation,
    isValidatingToken,
    requestInfo,
    formData,
    updateConsent,
    updateSignature,
    isSubmitting,
    submitConsent,
    canSubmit,
  };
};
