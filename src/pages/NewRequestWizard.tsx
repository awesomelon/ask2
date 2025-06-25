import React, { useEffect } from "react";
import { WizardProvider, useWizard } from "@/contexts/WizardContext";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TalentInfoStep } from "@/components/wizard/TalentInfoStep";
import { WorkHistoryStep } from "@/components/wizard/WorkHistoryStep";
import { TargetCompaniesStep } from "@/components/wizard/TargetCompaniesStep";
import { QuestionsStep } from "@/components/wizard/QuestionsStep";
import { ConfirmationStep } from "@/components/wizard/ConfirmationStep";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";

// All step components are now implemented

const WizardContent: React.FC = () => {
  const {
    currentStep,
    totalSteps,
    formData,
    canNavigateNext,
    canNavigatePrevious,
    nextStep,
    previousStep,
  } = useWizard();

  // 페이지 언로드 시 데이터 손실 경고
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // 폼에 데이터가 있고 마지막 단계가 아닌 경우에만 경고
      const hasData =
        formData.talentInfo.name ||
        formData.workHistory.length > 0 ||
        formData.targetCompanies.length > 0;

      if (hasData && currentStep < totalSteps) {
        const message =
          "입력한 정보가 저장되지 않을 수 있습니다. 정말 나가시겠습니까?";
        event.returnValue = message;
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [formData, currentStep, totalSteps]);

  const stepTitles = [
    "인재 정보",
    "근무 이력",
    "대상 기업",
    "질문 구성",
    "확인",
  ];

  const stepDescriptions = [
    "평판을 확인할 인재의 기본 정보를 입력합니다",
    "인재의 근무 이력을 추가합니다",
    "평판을 요청할 기업을 선택합니다",
    "평판 요청에 포함할 질문을 구성합니다",
    "입력한 정보를 확인하고 요청을 제출합니다",
  ];

  const progressPercentage = (currentStep / totalSteps) * 100;

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <TalentInfoStep />;
      case 2:
        return <WorkHistoryStep />;
      case 3:
        return <TargetCompaniesStep />;
      case 4:
        return <QuestionsStep />;
      case 5:
        return <ConfirmationStep />;
      default:
        return <TalentInfoStep />;
    }
  };

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            새 평판 요청 만들기
          </h1>
          <p className="text-gray-600">
            단계별로 정보를 입력하여 평판 요청을 생성하세요
          </p>
        </div>

        {/* Progress Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-gray-700">
              단계 {currentStep} / {totalSteps}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(progressPercentage)}% 완료
            </span>
          </div>

          <Progress value={progressPercentage} className="mb-4" />

          {/* Step Indicators */}
          <div className="flex justify-between">
            {stepTitles.map((title, index) => (
              <div key={index} className="flex flex-col items-center">
                <Badge
                  variant={index + 1 <= currentStep ? "default" : "outline"}
                  className="mb-1"
                >
                  {index + 1}
                </Badge>
                <span className="text-xs text-gray-600 text-center max-w-16">
                  {title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{stepTitles[currentStep - 1]}</CardTitle>
            <CardDescription>
              {stepDescriptions[currentStep - 1]}
            </CardDescription>
          </CardHeader>
          <CardContent>{renderCurrentStep()}</CardContent>
        </Card>

        {/* Navigation - 마지막 단계에서는 ConfirmationStep에서 자체 제출 처리 */}
        {currentStep < totalSteps && (
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={previousStep}
              disabled={!canNavigatePrevious}
              className="flex items-center"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              이전
            </Button>

            <Button
              onClick={nextStep}
              disabled={!canNavigateNext}
              className="flex items-center"
            >
              다음
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Button>
          </div>
        )}

        {/* 마지막 단계에서는 이전 버튼만 표시 */}
        {currentStep === totalSteps && (
          <div className="flex justify-start">
            <Button
              variant="outline"
              onClick={previousStep}
              className="flex items-center"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              이전 단계로
            </Button>
          </div>
        )}

        {/* Debug Info (개발 중에만 표시) */}
        {import.meta.env.DEV && (
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">개발 정보</h4>
            <p className="text-sm text-yellow-700">
              현재 단계: {currentStep} | 다음 가능:{" "}
              {canNavigateNext ? "Yes" : "No"} | 이전 가능:{" "}
              {canNavigatePrevious ? "Yes" : "No"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const NewRequestWizard: React.FC = () => {
  return (
    <ErrorBoundary>
      <WizardProvider>
        <WizardContent />
      </WizardProvider>
    </ErrorBoundary>
  );
};

export default NewRequestWizard;
