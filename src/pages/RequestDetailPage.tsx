import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { useRequestDetail } from "@/hooks/useRequestDetail";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface RequestDetailPageProps {
  onNavigate?: (path: string) => void;
}

export const RequestDetailPage: React.FC<RequestDetailPageProps> = ({
  onNavigate,
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { request, responses, stats, loading, error, refetch } =
    useRequestDetail(id || "");

  const handleNavigate = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      navigate(path);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="grid gap-6">
          <div className="h-32 bg-gray-200 rounded animate-pulse" />
          <div className="h-48 bg-gray-200 rounded animate-pulse" />
          <div className="h-64 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  if (error || !request) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleNavigate("/requests")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            목록으로
          </Button>
        </div>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error || "요청을 찾을 수 없습니다."}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "in_progress":
        return "bg-blue-500";
      case "pending":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "완료";
      case "in_progress":
        return "진행 중";
      case "pending":
        return "대기 중";
      default:
        return "알 수 없음";
    }
  };

  const getCompanyStatusIcon = (status: string) => {
    switch (status) {
      case "responded":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getCompanyStatusText = (status: string) => {
    switch (status) {
      case "responded":
        return "응답 완료";
      case "pending":
        return "응답 대기";
      case "rejected":
        return "응답 거절";
      default:
        return "알 수 없음";
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date);
  };

  const getRatingStars = (rating: number) => {
    return "★".repeat(Math.round(rating)) + "☆".repeat(5 - Math.round(rating));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleNavigate("/requests")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            목록으로
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">평판 요청 상세</h1>
            <p className="text-gray-600 mt-1">요청 ID: {request.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={`${getStatusColor(request.status)} text-white`}>
            {getStatusText(request.status)}
          </Badge>
          <Button onClick={refetch} variant="outline" size="sm">
            새로고침
          </Button>
        </div>
      </div>

      {/* Request Info Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            요청 정보
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  인재명
                </label>
                <p className="text-lg font-semibold">{request.talentName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  포지션
                </label>
                <p className="text-lg">{request.position}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  이메일
                </label>
                <p className="text-sm text-gray-700">{request.talentEmail}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-500">
                  요청일
                </label>
                <p className="text-lg">{formatDate(request.createdAt)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  마지막 업데이트
                </label>
                <p className="text-lg">
                  {request.updatedAt ? formatDate(request.updatedAt) : "-"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">
                  요청자
                </label>
                <p className="text-lg">{request.createdBy?.name || "-"}</p>
              </div>
            </div>
          </div>
          {request.notes && (
            <div className="pt-4 border-t">
              <label className="text-sm font-medium text-gray-500">
                요청 메모
              </label>
              <p className="text-gray-700 mt-1">{request.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Progress Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle>진행 현황</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">전체 진행률</span>
                <span className="text-sm text-gray-600">
                  {stats.responseRate.toFixed(1)}% ({stats.respondedCompanies}/
                  {stats.totalCompanies})
                </span>
              </div>
              <Progress value={stats.responseRate} className="h-2" />
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {stats.totalCompanies}
                </div>
                <div className="text-sm text-blue-700">총 요청</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {stats.respondedCompanies}
                </div>
                <div className="text-sm text-green-700">응답 완료</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">
                  {stats.pendingCompanies}
                </div>
                <div className="text-sm text-yellow-700">응답 대기</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">
                  {stats.rejectedCompanies}
                </div>
                <div className="text-sm text-red-700">응답 거절</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Company Response Status */}
      <Card>
        <CardHeader>
          <CardTitle>회사별 응답 상태</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {request.companies.map((company, index) => (
              <div
                key={`${company.organization.id}-${index}`}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  {getCompanyStatusIcon(company.status)}
                  <div>
                    <h3 className="font-semibold">
                      {company.organization.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      담당자:{" "}
                      {company.respondents.map((r) => r.name).join(", ")}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    variant={
                      company.status === "responded" ? "default" : "secondary"
                    }
                  >
                    {getCompanyStatusText(company.status)}
                  </Badge>
                  {company.respondedAt && (
                    <p className="text-sm text-gray-500 mt-1">
                      {formatDate(company.respondedAt)}
                    </p>
                  )}
                  {company.status === "rejected" && company.rejectionReason && (
                    <p className="text-sm text-red-600 mt-1">
                      {company.rejectionReason}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Response Summary */}
      {stats.totalResponses > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>응답 요약</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">평점 평균</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {Object.entries(stats.averageRatings).map(
                    ([questionId, rating]) => {
                      const questionLabels: Record<string, string> = {
                        q1: "업무 능력",
                        q2: "팀워크",
                        q4: "리더십",
                      };

                      return (
                        <div
                          key={questionId}
                          className="text-center p-4 bg-gray-50 rounded-lg"
                        >
                          <div className="text-lg font-bold text-gray-900">
                            {getRatingStars(rating)} ({rating.toFixed(1)})
                          </div>
                          <div className="text-sm text-gray-600">
                            {questionLabels[questionId] || questionId}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">
                    총 {stats.totalResponses}개의 응답
                  </span>
                  <Button
                    onClick={() =>
                      handleNavigate(`/request/${id}/result/detail`)
                    }
                    variant="outline"
                  >
                    상세 응답 보기
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Development Test Links */}
      {import.meta.env.DEV && (
        <Card className="border-2 border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="text-yellow-800">
              🔧 개발 테스트 링크
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-yellow-700 mb-4">
                아래 링크들을 사용해서 평판 응답/동의/거절 페이지를 테스트할 수
                있습니다.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-yellow-800">
                    사용 가능한 토큰:
                  </h4>
                  <div className="space-y-1 text-sm">
                    <div>
                      <a
                        href="/consent/ghi789token"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        동의 페이지: ghi789token
                      </a>
                    </div>
                    <div>
                      <a
                        href="/respond/ghi789token"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:underline"
                      >
                        응답 페이지: ghi789token
                      </a>
                    </div>
                    <div>
                      <a
                        href="/reject/ghi789token"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 hover:underline"
                      >
                        거절 페이지: ghi789token
                      </a>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-yellow-800">
                    다른 토큰들:
                  </h4>
                  <div className="space-y-1 text-sm">
                    <div>
                      <a
                        href="/consent/jkl012token"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        동의 페이지: jkl012token
                      </a>
                    </div>
                    <div>
                      <a
                        href="/respond/pqr678token"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:underline"
                      >
                        응답 페이지: pqr678token
                      </a>
                    </div>
                    <div>
                      <a
                        href="/reject/pqr678token"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-600 hover:underline"
                      >
                        거절 페이지: pqr678token
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-yellow-100 rounded border border-yellow-300">
                <h4 className="font-semibold text-yellow-800 mb-1">
                  사용된 토큰들 (오류 테스트용):
                </h4>
                <p className="text-sm text-yellow-700">
                  abc123token, def456token, mno345token - "이미 사용된 토큰"
                  오류 확인용
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
