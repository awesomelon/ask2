import React, { useState } from "react";
import {
  Plus,
  Search,
  Eye,
  MoreHorizontal,
  Calendar,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface RequestListPageProps {
  onNavigate?: (path: string) => void;
}

interface ReferenceRequest {
  id: string;
  talentName: string;
  talentEmail: string;
  position: string;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  totalCompanies: number;
  respondedCompanies: number;
  createdAt: string;
  dueDate: string;
}

// Mock data
const mockRequests: ReferenceRequest[] = [
  {
    id: "REQ-001",
    talentName: "김철수",
    talentEmail: "kim.cs@email.com",
    position: "백엔드 개발자",
    status: "in_progress",
    totalCompanies: 3,
    respondedCompanies: 2,
    createdAt: "2024-03-15",
    dueDate: "2024-03-22",
  },
  {
    id: "REQ-002",
    talentName: "이영희",
    talentEmail: "lee.yh@email.com",
    position: "프론트엔드 개발자",
    status: "completed",
    totalCompanies: 2,
    respondedCompanies: 2,
    createdAt: "2024-03-10",
    dueDate: "2024-03-17",
  },
  {
    id: "REQ-003",
    talentName: "박민수",
    talentEmail: "park.ms@email.com",
    position: "DevOps 엔지니어",
    status: "pending",
    totalCompanies: 4,
    respondedCompanies: 0,
    createdAt: "2024-03-18",
    dueDate: "2024-03-25",
  },
];

const RequestListPage: React.FC<RequestListPageProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Status configurations
  const statusConfig = {
    pending: {
      label: "대기중",
      color: "bg-yellow-100 text-yellow-800",
      icon: Clock,
    },
    in_progress: {
      label: "진행중",
      color: "bg-blue-100 text-blue-800",
      icon: AlertCircle,
    },
    completed: {
      label: "완료",
      color: "bg-green-100 text-green-800",
      icon: CheckCircle,
    },
    cancelled: {
      label: "취소됨",
      color: "bg-red-100 text-red-800",
      icon: XCircle,
    },
  };

  const filteredRequests = mockRequests.filter((request) => {
    const matchesSearch =
      request.talentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleNewRequest = () => {
    onNavigate?.("/request/new");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">평판 요청 관리</h1>
          <p className="text-gray-600 mt-1">
            생성한 평판 요청을 관리하고 진행 상황을 확인하세요
          </p>
        </div>
        <Button
          onClick={handleNewRequest}
          className="flex items-center gap-2"
          size="lg"
        >
          <Plus className="h-4 w-4" />새 요청 보내기
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">전체 요청</p>
                <p className="text-2xl font-bold">{mockRequests.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">진행중</p>
                <p className="text-2xl font-bold">
                  {
                    mockRequests.filter((r) => r.status === "in_progress")
                      .length
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">완료</p>
                <p className="text-2xl font-bold">
                  {mockRequests.filter((r) => r.status === "completed").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">이번 주</p>
                <p className="text-2xl font-bold">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="인재명, 포지션으로 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">모든 상태</option>
              <option value="pending">대기중</option>
              <option value="in_progress">진행중</option>
              <option value="completed">완료</option>
              <option value="cancelled">취소됨</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Request List */}
      <div className="space-y-4">
        {filteredRequests.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-gray-400 mb-4">
                <Users className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                요청이 없습니다
              </h3>
              <p className="text-gray-600 mb-4">
                첫 번째 평판 요청을 만들어보세요
              </p>
              <Button onClick={handleNewRequest}>
                <Plus className="h-4 w-4 mr-2" />새 요청 만들기
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredRequests.map((request) => {
            const StatusIcon = statusConfig[request.status].icon;
            const progressPercentage = Math.round(
              (request.respondedCompanies / request.totalCompanies) * 100
            );

            return (
              <Card
                key={request.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {request.talentName}
                        </h3>
                        <Badge className={statusConfig[request.status].color}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {statusConfig[request.status].label}
                        </Badge>
                      </div>

                      <div className="space-y-1 text-sm text-gray-600 mb-4">
                        <p>
                          <span className="font-medium">포지션:</span>{" "}
                          {request.position}
                        </p>
                        <p>
                          <span className="font-medium">요청 번호:</span>{" "}
                          {request.id}
                        </p>
                        <p>
                          <span className="font-medium">이메일:</span>{" "}
                          {request.talentEmail}
                        </p>
                      </div>

                      <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          생성: {formatDate(request.createdAt)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          마감: {formatDate(request.dueDate)}
                        </div>
                      </div>

                      {/* Progress */}
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600">응답 진행률</span>
                          <span className="font-medium">
                            {request.respondedCompanies}/
                            {request.totalCompanies}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${progressPercentage}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        상세보기
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Show more button */}
      {filteredRequests.length > 0 && (
        <div className="text-center">
          <Button variant="outline">더 많은 결과 보기</Button>
        </div>
      )}
    </div>
  );
};

export default RequestListPage;
