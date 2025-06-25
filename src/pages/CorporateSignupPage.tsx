import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";

interface CorporateSignupPageProps {
  onNavigate?: (path: string) => void;
}

export const CorporateSignupPage: React.FC<CorporateSignupPageProps> = ({
  onNavigate,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingDomain, setIsCheckingDomain] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    // Step 1: Company Info
    companyName: "",
    companyDomain: "",
    businessRegistration: "",

    // Step 2: Contact Info
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    jobTitle: "",
    password: "",
    confirmPassword: "",

    // Step 3: Verification
    verificationCode: "",
    termsAccepted: false,
    privacyAccepted: false,
  });

  const totalSteps = 3;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const stepTitles = ["회사 정보", "담당자 정보", "인증 완료"];

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Validation functions
  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = "회사명을 입력해주세요.";
    }

    if (!formData.companyDomain.trim()) {
      newErrors.companyDomain = "회사 도메인을 입력해주세요.";
    } else if (!/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.companyDomain)) {
      newErrors.companyDomain =
        "올바른 도메인 형식을 입력해주세요. (예: company.com)";
    }

    if (!formData.businessRegistration.trim()) {
      newErrors.businessRegistration = "사업자등록번호를 입력해주세요.";
    } else if (!/^\d{3}-\d{2}-\d{5}$/.test(formData.businessRegistration)) {
      newErrors.businessRegistration =
        "올바른 사업자등록번호 형식을 입력해주세요. (예: 123-45-67890)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.contactName.trim()) {
      newErrors.contactName = "담당자 이름을 입력해주세요.";
    }

    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = "담당자 이메일을 입력해주세요.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = "올바른 이메일 형식을 입력해주세요.";
    } else if (!formData.contactEmail.endsWith(`@${formData.companyDomain}`)) {
      newErrors.contactEmail = `회사 도메인(@${formData.companyDomain})과 일치해야 합니다.`;
    }

    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = "직책을 입력해주세요.";
    }

    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요.";
    } else if (formData.password.length < 8) {
      newErrors.password = "비밀번호는 8자 이상이어야 합니다.";
    } else if (
      !/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(formData.password)
    ) {
      newErrors.password = "영문, 숫자, 특수문자를 포함해야 합니다.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호 확인을 입력해주세요.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.verificationCode.trim()) {
      newErrors.verificationCode = "인증 코드를 입력해주세요.";
    } else if (formData.verificationCode.length !== 6) {
      newErrors.verificationCode = "6자리 인증 코드를 입력해주세요.";
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = "이용약관에 동의해주세요.";
    }

    if (!formData.privacyAccepted) {
      newErrors.privacyAccepted = "개인정보 처리방침에 동의해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Check domain availability (mock function)
  const checkDomainAvailability = async (domain: string) => {
    setIsCheckingDomain(true);
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock: reject common domains
      const unavailableDomains = [
        "google.com",
        "facebook.com",
        "microsoft.com",
      ];
      if (unavailableDomains.includes(domain.toLowerCase())) {
        setErrors((prev) => ({
          ...prev,
          companyDomain: "이미 등록된 도메인입니다.",
        }));
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        companyDomain: "도메인 확인 중 오류가 발생했습니다.",
      }));
    } finally {
      setIsCheckingDomain(false);
    }
  };

  const handleNext = async () => {
    let isValid = false;

    switch (currentStep) {
      case 1:
        isValid = validateStep1();
        if (isValid && formData.companyDomain) {
          await checkDomainAvailability(formData.companyDomain);
          // Recheck validation after domain check
          isValid = !errors.companyDomain;
        }
        break;
      case 2:
        isValid = validateStep2();
        break;
      case 3:
        isValid = validateStep3();
        break;
      default:
        isValid = true;
    }

    if (isValid && currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      setErrors({}); // Clear errors when going back
    }
  };

  const handleSubmit = async () => {
    if (!validateStep3()) {
      return;
    }

    setIsLoading(true);
    try {
      // Mock API submission
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Signup completed:", formData);
      setIsSubmitted(true);

      // Redirect after success message
      setTimeout(() => {
        onNavigate?.("/login");
      }, 3000);
    } catch (error) {
      setErrors({
        submit: "회원가입 중 오류가 발생했습니다. 다시 시도해주세요.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <label
                htmlFor="companyName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                회사명 *
              </label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => updateFormData("companyName", e.target.value)}
                placeholder="주식회사 ABC"
                required
                className={errors.companyName ? "border-red-500" : ""}
              />
              {errors.companyName && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.companyName}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="companyDomain"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                회사 도메인 *
              </label>
              <div className="relative">
                <Input
                  id="companyDomain"
                  value={formData.companyDomain}
                  onChange={(e) =>
                    updateFormData("companyDomain", e.target.value)
                  }
                  placeholder="abc.com"
                  required
                  className={errors.companyDomain ? "border-red-500" : ""}
                  disabled={isCheckingDomain}
                />
                {isCheckingDomain && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Spinner size="sm" />
                  </div>
                )}
              </div>
              {errors.companyDomain ? (
                <p className="text-xs text-red-500 mt-1">
                  {errors.companyDomain}
                </p>
              ) : (
                <p className="text-xs text-gray-500 mt-1">
                  이메일 인증에 사용됩니다. 예: abc.com
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="businessRegistration"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                사업자등록번호 *
              </label>
              <Input
                id="businessRegistration"
                value={formData.businessRegistration}
                onChange={(e) =>
                  updateFormData("businessRegistration", e.target.value)
                }
                placeholder="123-45-67890"
                required
                className={errors.businessRegistration ? "border-red-500" : ""}
              />
              {errors.businessRegistration && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.businessRegistration}
                </p>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label
                htmlFor="contactName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                담당자 이름 *
              </label>
              <Input
                id="contactName"
                value={formData.contactName}
                onChange={(e) => updateFormData("contactName", e.target.value)}
                placeholder="홍길동"
                required
                className={errors.contactName ? "border-red-500" : ""}
              />
              {errors.contactName && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.contactName}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contactEmail"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                담당자 이메일 *
              </label>
              <Input
                id="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={(e) => updateFormData("contactEmail", e.target.value)}
                placeholder="hong@abc.com"
                required
                className={errors.contactEmail ? "border-red-500" : ""}
              />
              {errors.contactEmail ? (
                <p className="text-xs text-red-500 mt-1">
                  {errors.contactEmail}
                </p>
              ) : (
                <p className="text-xs text-gray-500 mt-1">
                  회사 도메인과 일치해야 합니다.
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contactPhone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                담당자 연락처
              </label>
              <Input
                id="contactPhone"
                value={formData.contactPhone}
                onChange={(e) => updateFormData("contactPhone", e.target.value)}
                placeholder="010-1234-5678"
                className={errors.contactPhone ? "border-red-500" : ""}
              />
              {errors.contactPhone && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.contactPhone}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="jobTitle"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                직책 *
              </label>
              <Input
                id="jobTitle"
                value={formData.jobTitle}
                onChange={(e) => updateFormData("jobTitle", e.target.value)}
                placeholder="인사팀장"
                required
                className={errors.jobTitle ? "border-red-500" : ""}
              />
              {errors.jobTitle && (
                <p className="text-xs text-red-500 mt-1">{errors.jobTitle}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                비밀번호 *
              </label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => updateFormData("password", e.target.value)}
                placeholder="비밀번호를 입력하세요"
                required
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password ? (
                <p className="text-xs text-red-500 mt-1">{errors.password}</p>
              ) : (
                <p className="text-xs text-gray-500 mt-1">
                  영문, 숫자, 특수문자 포함 8자 이상
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                비밀번호 확인 *
              </label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  updateFormData("confirmPassword", e.target.value)
                }
                placeholder="비밀번호를 다시 입력하세요"
                required
                className={errors.confirmPassword ? "border-red-500" : ""}
              />
              {errors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <Alert>
              <AlertDescription>
                입력하신 이메일 주소로 인증 코드를 발송했습니다. 이메일을
                확인하고 인증 코드를 입력해주세요.
              </AlertDescription>
            </Alert>

            <div>
              <label
                htmlFor="verificationCode"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                인증 코드 *
              </label>
              <Input
                id="verificationCode"
                value={formData.verificationCode}
                onChange={(e) =>
                  updateFormData("verificationCode", e.target.value)
                }
                placeholder="6자리 인증 코드"
                maxLength={6}
                required
                className={errors.verificationCode ? "border-red-500" : ""}
              />
              {errors.verificationCode && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.verificationCode}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <input
                  id="terms"
                  type="checkbox"
                  checked={formData.termsAccepted}
                  onChange={(e) =>
                    updateFormData("termsAccepted", e.target.checked)
                  }
                  className={`mt-1 h-4 w-4 text-primary focus:ring-primary rounded ${
                    errors.termsAccepted ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <div className="flex-1">
                  <label htmlFor="terms" className="text-sm text-gray-700">
                    <span className="font-medium text-primary cursor-pointer">
                      이용약관
                    </span>
                    에 동의합니다 *
                  </label>
                  {errors.termsAccepted && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.termsAccepted}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <input
                  id="privacy"
                  type="checkbox"
                  checked={formData.privacyAccepted}
                  onChange={(e) =>
                    updateFormData("privacyAccepted", e.target.checked)
                  }
                  className={`mt-1 h-4 w-4 text-primary focus:ring-primary rounded ${
                    errors.privacyAccepted
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                <div className="flex-1">
                  <label htmlFor="privacy" className="text-sm text-gray-700">
                    <span className="font-medium text-primary cursor-pointer">
                      개인정보 처리방침
                    </span>
                    에 동의합니다 *
                  </label>
                  {errors.privacyAccepted && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.privacyAccepted}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Success state
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-8 w-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            회원가입 완료!
          </h1>
          <p className="text-gray-600 mb-2">
            ASK2에 오신 것을 환영합니다.
            <br />
            회원가입이 성공적으로 완료되었습니다.
          </p>
          <p className="text-sm text-gray-500">
            3초 후 로그인 페이지로 이동합니다...
          </p>
          <div className="mt-6">
            <Button onClick={() => onNavigate?.("/login")}>
              지금 로그인하기
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-white font-bold text-xl">
              A2
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">기업회원 가입</h1>
          <p className="mt-2 text-sm text-gray-600">
            이미 계정이 있으신가요?{" "}
            <button
              onClick={() => onNavigate?.("/login")}
              className="font-medium text-primary hover:text-primary/90"
            >
              로그인하기
            </button>
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              단계 {currentStep} / {totalSteps}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(progressPercentage)}% 완료
            </span>
          </div>
          <Progress value={progressPercentage} className="mb-2" />
          <div className="flex justify-between">
            {stepTitles.map((title, index) => (
              <div key={index} className="flex items-center">
                <Badge
                  variant={index + 1 <= currentStep ? "default" : "outline"}
                  className="text-xs"
                >
                  {index + 1}
                </Badge>
                <span className="ml-1 text-xs text-gray-600 hidden sm:inline">
                  {title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>{stepTitles[currentStep - 1]}</CardTitle>
            <CardDescription>
              {currentStep === 1 && "회사 정보를 입력해주세요"}
              {currentStep === 2 && "담당자 정보를 입력해주세요"}
              {currentStep === 3 && "이메일 인증을 완료해주세요"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderStep()}

            {errors.submit && (
              <Alert variant="destructive" className="mt-4">
                <AlertDescription>{errors.submit}</AlertDescription>
              </Alert>
            )}

            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1 || isLoading}
              >
                이전
              </Button>

              {currentStep === totalSteps ? (
                <Button onClick={handleSubmit} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Spinner size="sm" className="mr-2" />
                      가입 중...
                    </>
                  ) : (
                    "가입 완료"
                  )}
                </Button>
              ) : (
                <Button onClick={handleNext} disabled={isCheckingDomain}>
                  {isCheckingDomain && currentStep === 1 ? (
                    <>
                      <Spinner size="sm" className="mr-2" />
                      확인 중...
                    </>
                  ) : (
                    "다음"
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            가입 시 ASK2의 이용약관과 개인정보 처리방침에 동의하게 됩니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CorporateSignupPage;
