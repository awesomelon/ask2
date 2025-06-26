import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  XCircle,
  CheckCircle,
  AlertCircle,
  FileText,
  User,
} from "lucide-react";
import { validateResponseToken, markTokenAsUsed } from "@/mocks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

interface RejectPageProps {
  onNavigate?: (path: string) => void;
}

export const RejectPage: React.FC<RejectPageProps> = () => {
  const { token } = useParams<{ token: string }>();
  const { toast } = useToast();
  const [isValidatingToken, setIsValidatingToken] = useState(true);
  const [tokenValidation, setTokenValidation] = useState<any>(null);
  const [requestInfo, setRequestInfo] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 사전 정의된 거절 사유 옵션
  const rejectionReasons = [
    "평가 대상자와 직접적인 업무 경험이 없음",
    "기밀 유지 정책으로 인해 응답 불가",
    "회사 정책상 외부 평판 조회에 참여하지 않음",
    "평가 대상자에 대한 충분한 정보 부족",
    "시간 부족으로 인한 응답 불가",
    "기타 (직접 입력)",
  ];

  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  // 토큰 검증 및 데이터 로드
  useEffect(() => {
    const validateTokenAndLoadData = async () => {
      if (!token) return;

      try {
        setIsValidatingToken(true);

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Validate token
        const validation = validateResponseToken(token);
        setTokenValidation(validation);

        if (validation.isValid && validation.tokenData) {
          // Mock request info (in real app, this would come from API)
          setRequestInfo({
            id: validation.tokenData.requestId,
            talentName: "김철수", // Mock data
            position: "백엔드 개발자", // Mock data
            respondentName: validation.tokenData.respondentName,
            respondentEmail: validation.tokenData.respondentEmail,
            companyName: validation.tokenData.companyId,
            createdAt: validation.tokenData.createdAt,
          });
        }
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

    validateTokenAndLoadData();
  }, [token]);

  // 거절 처리
  const handleReject = async () => {
    try {
      setIsSubmitting(true);

      const finalReason =
        selectedReason === "기타 (직접 입력)" ? customReason : selectedReason;

      if (!finalReason.trim()) {
        toast({
          title: "거절 사유 필요",
          description: "거절 사유를 선택하거나 입력해주세요.",
          variant: "destructive",
        });
        return;
      }

      // Simulate API submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock rejection record
      const rejectionRecord = {
        id: `rejection-${Date.now()}`,
        token,
        requestId: tokenValidation?.tokenData?.requestId,
        respondentEmail: tokenValidation?.tokenData?.respondentEmail,
        reason: finalReason,
        rejectedAt: new Date(),
        ipAddress: "127.0.0.1", // Mock IP
      };

      console.log("Rejection submitted:", rejectionRecord);

      // Mark token as used (rejected)
      markTokenAsUsed(token || "");

      setIsSubmitted(true);
      toast({
        title: "거절 처리 완료",
        description: "평판 요청이 거절되었습니다.",
      });
    } catch (error) {
      console.error("Error submitting rejection:", error);
      toast({
        title: "처리 실패",
        description: "거절 처리 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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
              거절이 접수되었습니다
            </h2>
            <p className="text-gray-600 mb-4">
              평판 요청 거절이 정상적으로 처리되었습니다. 요청자에게 거절 사유가
              전달됩니다.
            </p>
            <Button onClick={() => window.close()}>창 닫기</Button>
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
            <div className="p-3 bg-red-100 rounded-full">
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            평판 요청 거절
          </h1>
          <p className="text-gray-600">
            아래 평판 요청에 대한 거절 사유를 선택해주세요
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

        {/* Rejection Reasons */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              거절 사유 선택
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {rejectionReasons.map((reason) => (
                <label
                  key={reason}
                  className="flex items-start space-x-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="rejectionReason"
                    value={reason}
                    checked={selectedReason === reason}
                    onChange={(e) => setSelectedReason(e.target.value)}
                    disabled={isSubmitting}
                    className="h-4 w-4 text-primary border-gray-300 mt-1"
                  />
                  <span className="text-gray-700">{reason}</span>
                </label>
              ))}
            </div>

            {selectedReason === "기타 (직접 입력)" && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  상세 사유
                </label>
                <textarea
                  className="w-full min-h-[100px] p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical"
                  placeholder="거절 사유를 자세히 입력해주세요..."
                  value={customReason}
                  onChange={(e) => setCustomReason(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Notice */}
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>안내사항:</strong> 거절 사유는 요청자에게 전달되며, 이후
            해당 요청에 대해서는 더 이상 알림을 받지 않습니다. 거절 처리 후에는
            변경하실 수 없으니 신중히 선택해주세요.
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
            onClick={handleReject}
            disabled={!selectedReason || isSubmitting}
            variant="destructive"
            className="flex-1"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                처리 중...
              </>
            ) : (
              "거절하기"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
