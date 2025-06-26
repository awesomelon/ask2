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
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  User,
  Building,
  Calendar,
  ExternalLink,
} from "lucide-react";
import { useInbox, type InboxItem } from "@/hooks/useInbox";

interface InboxPageProps {
  onNavigate?: (path: string) => void;
}

export const InboxPage: React.FC<InboxPageProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const {
    inboxItems,
    stats,
    loading,
    getItemsByStatus,
    filterItems,
    currentUserEmail,
  } = useInbox();

  // 검색 및 필터링된 아이템들
  const filteredItems = filterItems(inboxItems, searchTerm, statusFilter);

  const getStatusBadge = (status: InboxItem["status"]) => {
    switch (status) {
      case "pending":
        return (
          <Badge
            variant="outline"
            className="text-yellow-600 border-yellow-300"
          >
            <Clock className="h-3 w-3 mr-1" />
            응답 대기
          </Badge>
        );
      case "responded":
        return (
          <Badge variant="default" className="bg-green-500">
            <CheckCircle className="h-3 w-3 mr-1" />
            응답 완료
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />
            거절
          </Badge>
        );
      case "expired":
        return (
          <Badge variant="secondary" className="text-red-600">
            <AlertTriangle className="h-3 w-3 mr-1" />
            만료
          </Badge>
        );
      default:
        return <Badge variant="secondary">알 수 없음</Badge>;
    }
  };

  const getPriorityBadge = (priority: InboxItem["priority"]) => {
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

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const handleAction = (action: string, token: string) => {
    let path = "";
    switch (action) {
      case "respond":
        path = `/respond/${token}`;
        break;
      case "reject":
        path = `/reject/${token}`;
        break;
      case "consent":
        path = `/consent/${token}`;
        break;
      case "view":
        // 응답 완료된 경우, 실제로는 응답 내용을 보여주는 페이지로 이동
        path = `/respond/${token}`;
        break;
      default:
        return;
    }

    if (onNavigate) {
      // 새 창에서 열기
      window.open(path, "_blank", "noopener,noreferrer");
    } else {
      window.open(path, "_blank", "noopener,noreferrer");
    }
  };

  // 로딩 상태
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
        <div className="h-32 bg-gray-200 rounded animate-pulse" />
        <div className="h-64 bg-gray-200 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">수신함</h1>
        <p className="text-gray-600 mt-1">
          다른 회사에서 요청한 평판 검증 요청들을 확인하고 응답하세요
        </p>
        <p className="text-sm text-gray-500 mt-1">
          현재 사용자: {currentUserEmail}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {stats.total}
            </div>
            <div className="text-sm text-gray-600">전체</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {stats.pending}
            </div>
            <div className="text-sm text-gray-600">응답 대기</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {stats.responded}
            </div>
            <div className="text-sm text-gray-600">응답 완료</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {stats.rejected}
            </div>
            <div className="text-sm text-gray-600">거절</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-600">
              {stats.expired}
            </div>
            <div className="text-sm text-gray-600">만료</div>
          </CardContent>
        </Card>
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
                <SelectItem value="responded">응답 완료</SelectItem>
                <SelectItem value="rejected">거절</SelectItem>
                <SelectItem value="expired">만료</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for different views */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">전체 ({stats.total})</TabsTrigger>
          <TabsTrigger value="pending">대기중 ({stats.pending})</TabsTrigger>
          <TabsTrigger value="responded">완료 ({stats.responded})</TabsTrigger>
          <TabsTrigger value="rejected">거절 ({stats.rejected})</TabsTrigger>
          <TabsTrigger value="expired">만료 ({stats.expired})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <RequestList items={filteredItems} onAction={handleAction} />
        </TabsContent>

        <TabsContent value="pending" className="mt-6">
          <RequestList
            items={getItemsByStatus("pending")}
            onAction={handleAction}
          />
        </TabsContent>

        <TabsContent value="responded" className="mt-6">
          <RequestList
            items={getItemsByStatus("responded")}
            onAction={handleAction}
          />
        </TabsContent>

        <TabsContent value="rejected" className="mt-6">
          <RequestList
            items={getItemsByStatus("rejected")}
            onAction={handleAction}
          />
        </TabsContent>

        <TabsContent value="expired" className="mt-6">
          <RequestList
            items={getItemsByStatus("expired")}
            onAction={handleAction}
          />
        </TabsContent>
      </Tabs>

      {/* Development Test Info */}
      {import.meta.env.DEV && stats.total === 0 && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>개발 모드:</strong> 현재 사용자 ({currentUserEmail})에게
            발송된 평판 요청이 없습니다. 목업 데이터에서 ghi789token이 이
            사용자에게 발송된 유일한 토큰입니다.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );

  function RequestList({
    items,
    onAction,
  }: {
    items: InboxItem[];
    onAction: (action: string, token: string) => void;
  }) {
    if (items.length === 0) {
      return (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-gray-500">해당하는 요청이 없습니다.</p>
          </CardContent>
        </Card>
      );
    }

    return (
      <div className="space-y-4">
        {items.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {item.talentName}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-4 mt-1">
                    <span>{item.position}</span>
                    <span className="flex items-center gap-1">
                      <Building className="h-3 w-3" />
                      요청: {item.requestingCompany}
                    </span>
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  {getPriorityBadge(item.priority)}
                  {getStatusBadge(item.status)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Request Details */}
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="space-y-1">
                    <p className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      요청일: {formatDate(item.requestDate)}
                    </p>
                    <p className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      마감일: {formatDate(item.dueDate)}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p>요청자: {item.requestingPerson}</p>
                    <p>인재 이메일: {item.talentEmail}</p>
                  </div>
                </div>

                {/* Notes */}
                {item.notes && (
                  <div className="p-3 bg-gray-50 rounded text-sm">
                    <strong>요청 메모:</strong> {item.notes}
                  </div>
                )}

                {/* Response Details */}
                {item.status === "responded" && item.respondedAt && (
                  <div className="p-3 bg-green-50 rounded text-sm text-green-700">
                    <strong>응답 완료:</strong> {formatDate(item.respondedAt)}
                  </div>
                )}

                {item.status === "rejected" && item.rejectionReason && (
                  <div className="p-3 bg-red-50 rounded text-sm text-red-700">
                    <strong>거절 사유:</strong> {item.rejectionReason}
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-between items-center pt-2 border-t">
                  <div className="text-xs text-gray-500">
                    토큰: {item.token}
                  </div>
                  <div className="flex space-x-2">
                    {item.status === "pending" && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onAction("consent", item.token)}
                          className="gap-1"
                        >
                          <ExternalLink className="h-3 w-3" />
                          동의 페이지
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onAction("reject", item.token)}
                          className="gap-1"
                        >
                          <XCircle className="h-3 w-3" />
                          거절하기
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => onAction("respond", item.token)}
                          className="gap-1"
                        >
                          <CheckCircle className="h-3 w-3" />
                          응답하기
                        </Button>
                      </>
                    )}

                    {item.status === "responded" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onAction("view", item.token)}
                        className="gap-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        응답 보기
                      </Button>
                    )}

                    {item.status === "rejected" && (
                      <Button variant="outline" size="sm" disabled>
                        거절됨
                      </Button>
                    )}

                    {item.status === "expired" && (
                      <Button variant="outline" size="sm" disabled>
                        만료됨
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
};

export default InboxPage;
