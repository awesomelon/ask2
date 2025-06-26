import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useDashboard } from "@/hooks/useDashboard";

interface DashboardPageProps {
  onNavigate?: (path: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const { stats, recentRequests, recentReceivedRequests, loading } =
    useDashboard();

  const handleReceivedAction = (status: string, token: string) => {
    let path = "";
    switch (status) {
      case "pending":
        path = `/respond/${token}`;
        break;
      case "responded":
      case "rejected":
      case "expired":
        path = `/respond/${token}`;
        break;
      default:
        return;
    }

    // 새 창에서 열기
    window.open(path, "_blank", "noopener,noreferrer");
  };

  // 로딩 상태
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
        <div className="h-64 bg-gray-200 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">대시보드</h1>
          <p className="text-gray-600 mt-1">
            평판 요청 현황을 한눈에 확인하세요
          </p>
        </div>
        <Button onClick={() => onNavigate?.("/request/new")}>
          새 평판 요청
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">전체 요청</CardTitle>
            <div className="h-4 w-4 text-muted-foreground">📊</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRequests}</div>
            <p className="text-xs text-muted-foreground">이번 달 요청 수</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">진행 중</CardTitle>
            <div className="h-4 w-4 text-muted-foreground">⏳</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inProgress}</div>
            <p className="text-xs text-muted-foreground">현재 진행 중인 요청</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">완료</CardTitle>
            <div className="h-4 w-4 text-muted-foreground">✅</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completed}</div>
            <p className="text-xs text-muted-foreground">완료된 요청</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">응답률</CardTitle>
            <div className="h-4 w-4 text-muted-foreground">📈</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.responseRate || 0}%</div>
            <Progress value={stats.responseRate || 0} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Recent Requests */}
      <Card>
        <CardHeader>
          <CardTitle>최근 평판 요청</CardTitle>
          <CardDescription>
            최근에 생성한 평판 요청들의 진행 상황입니다
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentRequests.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                아직 생성한 평판 요청이 없습니다.
              </div>
            ) : (
              recentRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <h3 className="font-medium">{request.talentName}</h3>
                    <p className="text-sm text-gray-600">{request.position}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-600">
                      {request.responses}/{request.total} 응답
                    </div>
                    <Badge
                      variant={
                        request.status === "completed"
                          ? "default"
                          : request.status === "in_progress"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {request.status === "completed"
                        ? "완료"
                        : request.status === "in_progress"
                        ? "진행중"
                        : "대기중"}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        onNavigate?.(`/request/${request.id}/result`)
                      }
                    >
                      보기
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="mt-4 text-center">
            <Button variant="outline" onClick={() => onNavigate?.("/requests")}>
              모든 요청 보기
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Responses */}
      <Card>
        <CardHeader>
          <CardTitle>최근 수신한 요청</CardTitle>
          <CardDescription>
            다른 회사에서 요청한 평판 검증에 대한 응답 현황입니다
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReceivedRequests.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                아직 수신한 평판 요청이 없습니다.
              </div>
            ) : (
              recentReceivedRequests.map((response) => (
                <div
                  key={response.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <h3 className="font-medium">{response.talentName}</h3>
                    <p className="text-sm text-gray-600">
                      {response.position} • {response.company}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge
                      variant={
                        response.status === "responded" ? "default" : "outline"
                      }
                    >
                      {response.status === "responded"
                        ? "응답완료"
                        : response.status === "pending"
                        ? "응답대기"
                        : response.status === "rejected"
                        ? "거절"
                        : "만료"}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleReceivedAction(response.status, response.token)
                      }
                    >
                      {response.status === "pending" ? "응답하기" : "보기"}
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="mt-4 text-center">
            <Button variant="outline" onClick={() => onNavigate?.("/inbox")}>
              수신함 보기
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
