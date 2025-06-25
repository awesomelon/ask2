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

interface DashboardPageProps {
  onNavigate?: (path: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  // Mock data
  const stats = {
    totalRequests: 24,
    inProgress: 8,
    completed: 16,
    responseRate: 85,
  };

  const recentRequests = [
    {
      id: 1,
      talentName: "김철수",
      position: "백엔드 개발자",
      status: "in-progress",
      responses: 3,
      total: 5,
    },
    {
      id: 2,
      talentName: "이영희",
      position: "프론트엔드 개발자",
      status: "completed",
      responses: 4,
      total: 4,
    },
    {
      id: 3,
      talentName: "박민수",
      position: "DevOps 엔지니어",
      status: "pending",
      responses: 1,
      total: 3,
    },
  ];

  const recentResponses = [
    {
      id: 1,
      talentName: "홍길동",
      position: "PM",
      company: "ABC회사",
      status: "pending",
    },
    {
      id: 2,
      talentName: "김영수",
      position: "개발자",
      company: "XYZ회사",
      status: "completed",
    },
  ];

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
            <p className="text-xs text-muted-foreground">전월 대비 +12%</p>
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
            <div className="text-2xl font-bold">{stats.responseRate}%</div>
            <Progress value={stats.responseRate} className="mt-2" />
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
            {recentRequests.map((request) => (
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
                        : request.status === "in-progress"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {request.status === "completed"
                      ? "완료"
                      : request.status === "in-progress"
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
            ))}
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
            {recentResponses.map((response) => (
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
                      response.status === "completed" ? "default" : "outline"
                    }
                  >
                    {response.status === "completed" ? "응답완료" : "응답대기"}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onNavigate?.(`/respond/${response.id}`)}
                  >
                    {response.status === "completed" ? "보기" : "응답하기"}
                  </Button>
                </div>
              </div>
            ))}
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
