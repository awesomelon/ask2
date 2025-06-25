import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Shield,
  CheckCircle,
  AlertCircle,
  FileText,
  User,
  PenTool,
} from "lucide-react";
import { useConsentForm } from "@/hooks/useConsentForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

interface ConsentPageProps {
  onNavigate?: (path: string) => void;
}

export const ConsentPage: React.FC<ConsentPageProps> = ({ onNavigate }) => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    tokenValidation,
    isValidatingToken,
    requestInfo,
    formData,
    updateConsent,
    updateSignature,
    isSubmitting,
    submitConsent,
    canSubmit,
  } = useConsentForm(token || "");

  const handleNavigate = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      navigate(path);
    }
  };

  // Submit consent form
  const handleSubmit = async () => {
    const result = await submitConsent();

    if (result.success) {
      setIsSubmitted(true);
      toast({
        title: "동의 완료",
        description: "개인정보 수집 및 이용에 동의해주셔서 감사합니다.",
      });

      // Navigate to response page after short delay
      setTimeout(() => {
        handleNavigate(`/respond/${token}`);
      }, 2000);
    } else {
      toast({
        title: "처리 실패",
        description: result.error || "동의 처리 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  // Loading state
  if (isValidatingToken) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">링크를 확인하고 있습니다...</p>
        </div>
      </div>
    );
  }

  // Token validation error
  if (!tokenValidation?.isValid) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              접근할 수 없습니다
            </h2>
            <p className="text-gray-600 mb-4">
              {tokenValidation?.message || "유효하지 않은 링크입니다."}
            </p>
            <Button onClick={() => window.close()} variant="outline">
              창 닫기
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Success state
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              동의가 완료되었습니다
            </h2>
            <p className="text-gray-600 mb-4">
              잠시 후 평판 응답 페이지로 자동 이동됩니다.
            </p>
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            개인정보 수집 및 이용 동의
          </h1>
          <p className="text-gray-600">
            평판 조회를 위해 아래 내용을 확인하고 동의해주세요
          </p>
        </div>

        {/* Request Info */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              요청 정보
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    평가 대상자
                  </label>
                  <p className="text-lg font-semibold">
                    {requestInfo?.talentName}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    포지션
                  </label>
                  <p className="text-lg">{requestInfo?.position}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    응답 요청자
                  </label>
                  <p className="text-lg">{requestInfo?.respondentName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    요청일
                  </label>
                  <p className="text-lg">
                    {requestInfo?.createdAt
                      ? formatDate(requestInfo.createdAt)
                      : "-"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Consent Items */}
        <div className="space-y-4 mb-6">
          {formData.consentItems.map((item) => (
            <Card key={item.id} className="border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <input
                      type="checkbox"
                      id={item.id}
                      checked={item.accepted}
                      onChange={(e) => updateConsent(item.id, e.target.checked)}
                      disabled={isSubmitting}
                      className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor={item.id} className="cursor-pointer">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {item.title}
                        </h3>
                        {item.required ? (
                          <Badge variant="destructive">필수</Badge>
                        ) : (
                          <Badge variant="secondary">선택</Badge>
                        )}
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {item.description}
                      </p>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Signature */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PenTool className="h-5 w-5" />
              전자 서명
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-700">
                위 내용에 동의하며, 본인의 성명을 정확히 입력하여 전자 서명으로
                갈음합니다.
              </p>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  성명 (전자서명) *
                </label>
                <Input
                  type="text"
                  placeholder="성명을 입력해주세요"
                  value={formData.signature}
                  onChange={(e) => updateSignature(e.target.value)}
                  disabled={isSubmitting}
                  className="text-lg"
                />
              </div>
              {formData.signatureDate && (
                <p className="text-sm text-gray-500">
                  서명일시: {formatDate(formData.signatureDate)}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Legal Notice */}
        <Alert className="mb-6">
          <FileText className="h-4 w-4" />
          <AlertDescription>
            <strong>법적 고지사항:</strong> 전자 서명은 「전자서명법」에 따라
            본인 확인 및 의사표시의 수단으로 사용됩니다. 허위 정보 제공 시 관련
            법령에 따라 처벌받을 수 있으며, 제공된 정보는 평판 조회 목적으로만
            사용됩니다.
          </AlertDescription>
        </Alert>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pb-8">
          <Button
            onClick={() => window.close()}
            variant="outline"
            disabled={isSubmitting}
            className="flex-1"
          >
            취소
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="flex-1"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                처리 중...
              </>
            ) : (
              "동의하고 계속하기"
            )}
          </Button>
        </div>

        {/* Form Status */}
        {!formData.allRequiredAccepted && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              필수 동의 항목에 모두 동의해주세요.
            </AlertDescription>
          </Alert>
        )}

        {!formData.signature.trim() && formData.allRequiredAccepted && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>전자 서명을 입력해주세요.</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};
