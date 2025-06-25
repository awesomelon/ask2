import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Star,
  Save,
  Send,
  AlertCircle,
  CheckCircle,
  Clock,
  User,
} from "lucide-react";
import { useResponseForm } from "@/hooks/useResponseForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

interface ResponsePageProps {
  onNavigate?: (path: string) => void;
}

export const ResponsePage: React.FC<ResponsePageProps> = ({ onNavigate }) => {
  const { token } = useParams<{ token: string }>();
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    tokenValidation,
    isValidatingToken,
    formData,
    setFormData,
    questions,
    requestInfo,
    isSubmitting,
    submitResponse,
    saveToLocalStorage,
  } = useResponseForm(token || "");

  // Handle form field updates
  const updateResponse = (
    questionId: string,
    answer: string,
    rating?: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      responses: prev.responses.map((r) =>
        r.questionId === questionId ? { ...r, answer, rating } : r
      ),
    }));
  };

  // Handle additional comments update
  const updateAdditionalComments = (comments: string) => {
    setFormData((prev) => ({
      ...prev,
      additionalComments: comments,
    }));
  };

  // Handle anonymous setting
  const toggleAnonymous = () => {
    setFormData((prev) => ({
      ...prev,
      isAnonymous: !prev.isAnonymous,
    }));
  };

  // Manual save
  const handleSave = () => {
    saveToLocalStorage();
    toast({
      title: "임시 저장 완료",
      description: "응답이 안전하게 저장되었습니다.",
    });
  };

  // Submit form
  const handleSubmit = async () => {
    const result = await submitResponse();

    if (result.success) {
      setIsSubmitted(true);
      toast({
        title: "응답 제출 완료",
        description: "평판 응답이 성공적으로 제출되었습니다.",
      });
    } else {
      toast({
        title: "제출 실패",
        description: result.error || "응답 제출 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  // Star Rating Component
  const StarRating: React.FC<{
    value: number;
    onChange: (value: number) => void;
    disabled?: boolean;
  }> = ({ value, onChange, disabled = false }) => {
    const [hoverValue, setHoverValue] = useState(0);

    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={disabled}
            className={`p-1 transition-colors ${
              disabled ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            onMouseEnter={() => !disabled && setHoverValue(star)}
            onMouseLeave={() => !disabled && setHoverValue(0)}
            onClick={() => !disabled && onChange(star)}
          >
            <Star
              className={`h-6 w-6 ${
                star <= (hoverValue || value)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
        <span className="ml-2 text-sm text-gray-600">
          {value > 0 ? `${value}점` : "점수를 선택하세요"}
        </span>
      </div>
    );
  };

  // Loading state
  if (isValidatingToken) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">토큰을 검증하고 있습니다...</p>
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
              응답이 제출되었습니다
            </h2>
            <p className="text-gray-600 mb-4">
              소중한 평판 응답을 제공해주셔서 감사합니다. 귀하의 피드백은 인재
              평가에 큰 도움이 됩니다.
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            평판 응답하기
          </h1>
          <p className="text-gray-600">
            아래 질문들에 솔직하고 객관적으로 답변해주세요
          </p>
        </div>

        {/* Request Info */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              평가 대상자 정보
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    이름
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
                    응답자
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

        {/* Auto-save notification */}
        <Alert className="mb-6">
          <Clock className="h-4 w-4" />
          <AlertDescription>
            작성 중인 내용은 자동으로 임시 저장됩니다. 언제든지 중단하고 나중에
            이어서 작성할 수 있습니다.
          </AlertDescription>
        </Alert>

        {/* Questions */}
        <div className="space-y-6">
          {questions.map((question, index) => {
            const response = formData.responses.find(
              (r) => r.questionId === question.id
            );

            return (
              <Card key={question.id}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </span>
                    {question.text}
                    {question.required && (
                      <Badge variant="destructive" className="ml-2">
                        필수
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {question.type === "rating" && (
                    <div>
                      <StarRating
                        value={response?.rating || 0}
                        onChange={(rating) =>
                          updateResponse(question.id, "", rating)
                        }
                        disabled={isSubmitting}
                      />
                    </div>
                  )}

                  {question.type === "text" && (
                    <textarea
                      className="w-full min-h-[120px] p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical"
                      placeholder="자세한 답변을 작성해주세요..."
                      value={response?.answer || ""}
                      onChange={(e) =>
                        updateResponse(question.id, e.target.value)
                      }
                      disabled={isSubmitting}
                    />
                  )}

                  {question.type === "multiple_choice" && question.options && (
                    <div className="space-y-2">
                      {question.options.map((option) => (
                        <label
                          key={option}
                          className="flex items-center space-x-3 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name={question.id}
                            value={option}
                            checked={response?.answer === option}
                            onChange={(e) =>
                              updateResponse(question.id, e.target.value)
                            }
                            disabled={isSubmitting}
                            className="h-4 w-4 text-primary"
                          />
                          <span className="text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Comments */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>추가 의견 (선택사항)</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              className="w-full min-h-[120px] p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical"
              placeholder="추가로 전달하고 싶은 의견이나 특별한 사항이 있다면 자유롭게 작성해주세요..."
              value={formData.additionalComments}
              onChange={(e) => updateAdditionalComments(e.target.value)}
              disabled={isSubmitting}
            />
          </CardContent>
        </Card>

        {/* Anonymous Option */}
        <Card className="mt-6">
          <CardContent className="p-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isAnonymous}
                onChange={toggleAnonymous}
                disabled={isSubmitting}
                className="h-4 w-4 text-primary"
              />
              <span className="text-gray-700">
                익명으로 응답하기 (이름이 표시되지 않습니다)
              </span>
            </label>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 pb-8">
          <Button
            onClick={handleSave}
            variant="outline"
            disabled={isSubmitting}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            임시 저장
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                제출 중...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                응답 제출하기
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
