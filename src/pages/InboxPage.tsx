import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface InboxPageProps {
  onNavigate?: (path: string) => void;
}

export const InboxPage: React.FC<InboxPageProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock data
  const requests = [
    {
      id: 1,
      talentName: "홍길동",
      talentEmail: "hong@example.com",
      position: "프로젝트 매니저",
      requestingCompany: "ABC회사",
      requestDate: "2024-03-15",
      dueDate: "2024-03-22",
      status: "pending",
      priority: "high",
    },
    {
      id: 2,
      talentName: "김영수",
      talentEmail: "kim@example.com",
      position: "백엔드 개발자",
      requestingCompany: "XYZ회사",
      requestDate: "2024-03-14",
      dueDate: "2024-03-21",
      status: "completed",
      priority: "medium",
    },
    {
      id: 3,
      talentName: "이미영",
      talentEmail: "lee@example.com",
      position: "프론트엔드 개발자",
      requestingCompany: "DEF회사",
      requestDate: "2024-03-13",
      dueDate: "2024-03-20",
      status: "rejected",
      priority: "low",
    },
  ];

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.talentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.requestingCompany
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">응답 대기</Badge>;
      case "completed":
        return <Badge variant="default">응답 완료</Badge>;
      case "rejected":
        return <Badge variant="destructive">거절</Badge>;
      default:
        return <Badge variant="secondary">알 수 없음</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">높음</Badge>;
      case "medium":
        return <Badge variant="secondary">보통</Badge>;
      case "low":
        return <Badge variant="outline">낮음</Badge>;
      default:
        return <Badge variant="outline">보통</Badge>;
    }
  };

  const getRequestsByStatus = (status: string) => {
    return requests.filter((request) => request.status === status);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">수신함</h1>
        <p className="text-gray-600 mt-1">
          다른 회사에서 요청한 평판 검증 요청들을 확인하고 응답하세요
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>필터</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <div className="flex-1">
              <Input
                placeholder="인재명, 직책, 회사명으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="상태 필터" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="pending">응답 대기</SelectItem>
                <SelectItem value="completed">응답 완료</SelectItem>
                <SelectItem value="rejected">거절</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for different views */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">전체 ({requests.length})</TabsTrigger>
          <TabsTrigger value="pending">
            대기중 ({getRequestsByStatus("pending").length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            완료 ({getRequestsByStatus("completed").length})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            거절 ({getRequestsByStatus("rejected").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <RequestList requests={filteredRequests} onNavigate={onNavigate} />
        </TabsContent>

        <TabsContent value="pending" className="mt-6">
          <RequestList
            requests={getRequestsByStatus("pending")}
            onNavigate={onNavigate}
          />
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <RequestList
            requests={getRequestsByStatus("completed")}
            onNavigate={onNavigate}
          />
        </TabsContent>

        <TabsContent value="rejected" className="mt-6">
          <RequestList
            requests={getRequestsByStatus("rejected")}
            onNavigate={onNavigate}
          />
        </TabsContent>
      </Tabs>
    </div>
  );

  function RequestList({
    requests,
    onNavigate,
  }: {
    requests: any[];
    onNavigate?: (path: string) => void;
  }) {
    return (
      <div className="space-y-4">
        {requests.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-gray-500">해당하는 요청이 없습니다.</p>
            </CardContent>
          </Card>
        ) : (
          requests.map((request) => (
            <Card key={request.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg">
                      {request.talentName}
                    </CardTitle>
                    <CardDescription>
                      {request.position} • {request.requestingCompany}
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    {getPriorityBadge(request.priority)}
                    {getStatusBadge(request.status)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    <p>요청일: {request.requestDate}</p>
                    <p>마감일: {request.dueDate}</p>
                  </div>
                  <div className="flex space-x-2">
                    {request.status === "pending" && (
                      <>
                        <Button
                          variant="outline"
                          onClick={() =>
                            onNavigate?.(`/respond/${request.id}/reject`)
                          }
                        >
                          거절
                        </Button>
                        <Button
                          onClick={() => onNavigate?.(`/respond/${request.id}`)}
                        >
                          응답하기
                        </Button>
                      </>
                    )}
                    {request.status === "completed" && (
                      <Button
                        variant="outline"
                        onClick={() =>
                          onNavigate?.(`/respond/${request.id}/view`)
                        }
                      >
                        응답 보기
                      </Button>
                    )}
                    {request.status === "rejected" && (
                      <Button variant="outline" disabled>
                        거절됨
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    );
  }
};

export default InboxPage;
