import { useState, useEffect, useMemo } from "react";
import { mockResponseTokens, isTokenExpired } from "@/mocks/responseTokens";
import { findMockRequestById } from "@/mocks/referenceRequests";
import { isTokenRejected, getRejectionInfo } from "@/mocks/rejectionRecords";

// 수신함 아이템 타입 정의
export interface InboxItem {
  id: string; // 토큰 아이디를 사용
  token: string;
  requestId: string;
  talentName: string;
  talentEmail: string;
  position: string;
  requestingCompany: string;
  requestingPerson: string;
  requestDate: Date;
  dueDate: Date;
  status: "pending" | "responded" | "rejected" | "expired";
  priority: "high" | "medium" | "low";
  respondedAt?: Date;
  rejectionReason?: string;
  notes?: string;
}

// 현재 사용자 (목업용 - 실제로는 AuthContext에서 가져와야 함)
const CURRENT_USER_EMAIL = "kim.dev@innovationlab.co.kr"; // 김개발자로 가정

export const useInbox = () => {
  const [loading, setLoading] = useState(true);

  // 현재 사용자에게 발송된 토큰들 필터링
  const userTokens = useMemo(() => {
    return Object.values(mockResponseTokens).filter(
      (token) => token.respondentEmail === CURRENT_USER_EMAIL
    );
  }, []);

  // 토큰을 InboxItem으로 변환
  const inboxItems = useMemo((): InboxItem[] => {
    const items: InboxItem[] = [];

    userTokens.forEach((token) => {
      const request = findMockRequestById(token.requestId);
      if (!request) return;

      // 우선순위 계산 (최근 요청일수록 높은 우선순위)
      const daysSinceRequest = Math.floor(
        (Date.now() - token.createdAt.getTime()) / (1000 * 60 * 60 * 24)
      );
      const priority: InboxItem["priority"] =
        daysSinceRequest <= 3
          ? "high"
          : daysSinceRequest <= 7
          ? "medium"
          : "low";

      // 상태 결정
      let status: InboxItem["status"];
      let respondedAt: Date | undefined;
      let rejectionReason: string | undefined;

      // 거절 여부 확인
      const isRejected = isTokenRejected(token.token);
      const rejectionInfo = isRejected ? getRejectionInfo(token.token) : null;

      if (isRejected && rejectionInfo) {
        status = "rejected";
        rejectionReason = rejectionInfo.reason;
        respondedAt = rejectionInfo.rejectedAt;
      } else if (isTokenExpired(token.token) && !token.isUsed) {
        status = "expired";
      } else if (token.isUsed) {
        // 거절되지 않고 사용된 토큰은 응답 완료
        status = "responded";
        respondedAt = token.usedAt;
      } else {
        status = "pending";
      }

      // 요청한 회사/사람 정보 찾기
      const requestingCompany = request.companies.find(
        (company) => company.organization.id === token.companyId
      );

      items.push({
        id: token.token,
        token: token.token,
        requestId: token.requestId,
        talentName: request.talentName,
        talentEmail: request.talentEmail,
        position: request.position,
        requestingCompany:
          requestingCompany?.organization.name || "알 수 없는 회사",
        requestingPerson: request.createdBy?.name || "알 수 없는 요청자",
        requestDate: token.createdAt,
        dueDate: token.expiresAt,
        status,
        priority,
        respondedAt,
        rejectionReason,
        notes: request.notes,
      });
    });

    // 최신 요청 순으로 정렬
    return items.sort(
      (a, b) => b.requestDate.getTime() - a.requestDate.getTime()
    );
  }, [userTokens]);

  // 통계 계산
  const stats = useMemo(() => {
    const total = inboxItems.length;
    const pending = inboxItems.filter(
      (item) => item.status === "pending"
    ).length;
    const responded = inboxItems.filter(
      (item) => item.status === "responded"
    ).length;
    const rejected = inboxItems.filter(
      (item) => item.status === "rejected"
    ).length;
    const expired = inboxItems.filter(
      (item) => item.status === "expired"
    ).length;

    return {
      total,
      pending,
      responded,
      rejected,
      expired,
      responseRate: total > 0 ? ((responded + rejected) / total) * 100 : 0,
    };
  }, [inboxItems]);

  // 상태별 필터링 함수
  const getItemsByStatus = (status: InboxItem["status"]) => {
    return inboxItems.filter((item) => item.status === status);
  };

  // 검색 및 필터링 함수
  const filterItems = (
    items: InboxItem[],
    searchTerm: string,
    statusFilter: string
  ) => {
    return items.filter((item) => {
      const matchesSearch =
        item.talentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.requestingCompany.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  };

  // 로딩 시뮬레이션
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return {
    inboxItems,
    stats,
    loading,
    getItemsByStatus,
    filterItems,
    currentUserEmail: CURRENT_USER_EMAIL,
  };
};

export default useInbox;
