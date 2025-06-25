import React, { useState } from "react";
import { useWizard } from "@/contexts/WizardContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import {
  CheckIcon,
  UserIcon,
  MailIcon,
  PhoneIcon,
  BuildingIcon,
  MessageSquareIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
} from "lucide-react";

// Mock API 호출 시뮬레이션
const mockSubmitRequest = (
  data: any
): Promise<{ success: boolean; requestId?: string; error?: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 90% 성공률
      if (Math.random() > 0.1) {
        resolve({
          success: true,
          requestId: `REQ-${Date.now()}`,
        });
      } else {
        resolve({
          success: false,
          error: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
        });
      }
    }, 2000); // 2초 지연
  });
};

export const ConfirmationStep: React.FC = () => {
  const { formData, updateFormData } = useWizard();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success?: boolean;
    requestId?: string;
    error?: string;
  } | null>(null);

  const handleTermsChange = (checked: boolean) => {
    updateFormData("termsAccepted", checked);
  };

  const handleSubmit = async () => {
    if (!formData.termsAccepted) {
      return;
    }

    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const result = await mockSubmitRequest(formData);
      setSubmitResult(result);
    } catch (error) {
      setSubmitResult({
        success: false,
        error: "네트워크 오류가 발생했습니다.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatWorkHistoryDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (years > 0 && remainingMonths > 0) {
      return `${years}년 ${remainingMonths}개월`;
    } else if (years > 0) {
      return `${years}년`;
    } else {
      return `${remainingMonths}개월`;
    }
  };

  // 제출 완료 화면
  if (submitResult?.success) {
    return (
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <CheckCircleIcon className="h-16 w-16 text-green-600" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            평판 요청이 성공적으로 제출되었습니다!
          </h3>
          <p className="text-gray-600">
            요청 번호:{" "}
            <span className="font-mono font-semibold">
              {submitResult.requestId}
            </span>
          </p>
        </div>
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="text-green-800 text-sm space-y-2">
              <p className="font-medium">다음 단계:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  선택하신 기업의 담당자들에게 평판 요청 이메일이 발송됩니다
                </li>
                <li>대상 기업에서 응답을 완료하면 알림을 받게 됩니다</li>
                <li>모든 응답이 완료되면 결과 리포트를 확인할 수 있습니다</li>
              </ul>
            </div>
          </CardContent>
        </Card>
        <Button
          onClick={() => (window.location.href = "/dashboard")}
          className="w-full"
        >
          대시보드로 이동
        </Button>
      </div>
    );
  }

  // 제출 오류 화면
  if (submitResult?.error) {
    return (
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <AlertTriangleIcon className="h-16 w-16 text-red-600" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            제출 중 오류가 발생했습니다
          </h3>
          <p className="text-red-600">{submitResult.error}</p>
        </div>
        <div className="flex space-x-4 justify-center">
          <Button variant="outline" onClick={() => setSubmitResult(null)}>
            다시 시도
          </Button>
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/dashboard")}
          >
            대시보드로 이동
          </Button>
        </div>
      </div>
    );
  }

  const enabledQuestions = formData.questions.filter((q) => q.isEnabled);

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          정보 확인 및 제출
        </h3>
        <p className="text-gray-600">
          입력하신 모든 정보를 확인하고 평판 요청을 제출해주세요.
        </p>
      </div>

      {/* 인재 정보 요약 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <UserIcon className="h-5 w-5" />
            <span>인재 정보</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <UserIcon className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">이름:</span>
              <span className="font-medium">{formData.talentInfo.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MailIcon className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">이메일:</span>
              <span className="font-medium">{formData.talentInfo.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <PhoneIcon className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">연락처:</span>
              <span className="font-medium">{formData.talentInfo.phone}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 근무 이력 요약 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BuildingIcon className="h-5 w-5" />
              <span>근무 이력</span>
            </div>
            <Badge variant="outline">{formData.workHistory.length}개</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {formData.workHistory.length > 0 ? (
            <div className="space-y-4">
              {formData.workHistory.map((work, index) => (
                <div
                  key={work.id}
                  className="border-l-4 border-l-blue-500 pl-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">
                      {work.position}
                    </h4>
                    <Badge variant="outline">
                      {formatWorkHistoryDuration(work.startDate, work.endDate)}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{work.company}</p>
                  <p className="text-sm text-gray-500">
                    {work.startDate} ~ {work.endDate}
                  </p>
                  {work.responsibilities && (
                    <p className="text-sm text-gray-700 mt-2">
                      {work.responsibilities}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">
              등록된 근무 이력이 없습니다.
            </p>
          )}
        </CardContent>
      </Card>

      {/* 대상 기업 요약 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BuildingIcon className="h-5 w-5" />
              <span>대상 기업</span>
            </div>
            <Badge variant="outline">{formData.targetCompanies.length}개</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {formData.targetCompanies.length > 0 ? (
            <div className="space-y-3">
              {formData.targetCompanies.map((company) => (
                <div
                  key={company.id}
                  className="border rounded-lg p-3 bg-gray-50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">
                      {company.name}
                    </span>
                    <Badge variant="outline">{company.domain}</Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    담당자: {company.contactPerson} ({company.contactEmail})
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">선택된 기업이 없습니다.</p>
          )}
        </CardContent>
      </Card>

      {/* 질문 요약 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageSquareIcon className="h-5 w-5" />
              <span>선택된 질문</span>
            </div>
            <Badge variant="outline">{enabledQuestions.length}개</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {enabledQuestions.length > 0 ? (
            <div className="space-y-3">
              {enabledQuestions
                .sort((a, b) => a.order - b.order)
                .map((question, index) => (
                  <div key={question.id} className="flex items-start space-x-3">
                    <Badge variant="outline" className="mt-1">
                      {index + 1}
                    </Badge>
                    <div className="flex-1">
                      <p className="text-gray-900">{question.text}</p>
                      {!question.isDefault && (
                        <Badge variant="secondary" className="mt-1 text-xs">
                          커스텀 질문
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">선택된 질문이 없습니다.</p>
          )}
        </CardContent>
      </Card>

      {/* 약관 동의 */}
      <Card className="border-2 border-dashed border-gray-300">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <input
              id="terms"
              type="checkbox"
              checked={formData.termsAccepted}
              onChange={(e) => handleTermsChange(e.target.checked)}
              className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor="terms"
              className="text-sm text-gray-700 cursor-pointer"
            >
              <span className="font-medium">
                개인정보 수집 및 이용에 동의합니다.
              </span>
              <p className="mt-1 text-gray-600">
                평판 확인을 위해 제공된 정보는 요청 처리 목적으로만 사용되며,
                처리 완료 후 관련 법령에 따라 안전하게 삭제됩니다.
              </p>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* 제출 버튼 */}
      <div className="flex justify-center">
        <Button
          onClick={handleSubmit}
          disabled={!formData.termsAccepted || isSubmitting}
          className="w-full max-w-md"
          size="lg"
        >
          {isSubmitting ? (
            <>
              <Spinner className="mr-2" />
              제출 중...
            </>
          ) : (
            <>
              <CheckIcon className="h-5 w-5 mr-2" />
              평판 요청 제출하기
            </>
          )}
        </Button>
      </div>

      {!formData.termsAccepted && (
        <p className="text-red-600 text-sm text-center">
          개인정보 수집 및 이용에 동의해야 제출할 수 있습니다.
        </p>
      )}

      {/* 개발용 검증 정보 */}
      {import.meta.env.DEV && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800 text-sm mb-2">
            <strong>개발용:</strong> 현재 상태 검증
          </p>
          <div className="text-xs text-yellow-700 space-y-1">
            <p>약관 동의: {formData.termsAccepted ? "✅" : "❌"}</p>
            <p>Step 5 유효성: {formData.termsAccepted ? "✅" : "❌"}</p>
            <p>
              제출 가능: {!formData.termsAccepted || isSubmitting ? "❌" : "✅"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
