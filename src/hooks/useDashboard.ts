import { useState, useEffect, useMemo } from "react";
import {
  mockReferenceRequests,
  getMockRequestsByStatus,
  mockUsers,
} from "@/mocks/referenceRequests";
import { useInbox } from "./useInbox";
import type { ReferenceRequest } from "@/types";

// 대시보드 통계 타입
interface DashboardStats {
  totalRequests: number;
  inProgress: number;
  completed: number;
  pending: number;
  responseRate: number;
}

// 최근 요청 아이템 타입
interface RecentRequestItem {
  id: string;
  talentName: string;
  position: string;
  status: "pending" | "in_progress" | "completed";
  responses: number;
  total: number;
  createdAt: Date;
}

// 현재 사용자 (목업용 - 실제로는 AuthContext에서 가져와야 함)
const CURRENT_USER_ID = "user-001"; // 박매니저로 가정 (대부분의 요청을 생성한 사용자)

export const useDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 수신함 데이터 가져오기
  const { inboxItems, stats: inboxStats } = useInbox();

  // 현재 사용자가 생성한 요청들 필터링
  const userRequests = useMemo(() => {
    return mockReferenceRequests.filter(
      (request) => request.createdBy?.id === CURRENT_USER_ID
    );
  }, []);

  // 대시보드 통계 계산
  const stats = useMemo((): DashboardStats => {
    const total = userRequests.length;
    const pending = userRequests.filter(
      (req) => req.status === "pending"
    ).length;
    const inProgress = userRequests.filter(
      (req) => req.status === "in_progress"
    ).length;
    const completed = userRequests.filter(
      (req) => req.status === "completed"
    ).length;

    // 응답률 계산 (완료된 요청들의 평균 응답률)
    const completedRequests = userRequests.filter(
      (req) => req.status === "completed"
    );
    let totalResponseRate = 0;

    if (completedRequests.length > 0) {
      completedRequests.forEach((request) => {
        const totalCompanies = request.companies.length;
        const respondedCompanies = request.companies.filter(
          (company) => company.status === "responded"
        ).length;

        if (totalCompanies > 0) {
          totalResponseRate += (respondedCompanies / totalCompanies) * 100;
        }
      });
      totalResponseRate = totalResponseRate / completedRequests.length;
    }

    return {
      totalRequests: total,
      pending,
      inProgress,
      completed,
      responseRate: Math.round(totalResponseRate),
    };
  }, [userRequests]);

  // 최근 요청들 (최신 5개)
  const recentRequests = useMemo((): RecentRequestItem[] => {
    return userRequests
      .map((request) => {
        const totalCompanies = request.companies.length;
        const respondedCompanies = request.companies.filter(
          (company) => company.status === "responded"
        ).length;

        return {
          id: request.id,
          talentName: request.talentName,
          position: request.position,
          status: request.status,
          responses: respondedCompanies,
          total: totalCompanies,
          createdAt: request.createdAt,
        };
      })
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 5);
  }, [userRequests]);

  // 최근 수신한 요청들 (최신 5개, 수신함 데이터 활용)
  const recentReceivedRequests = useMemo(() => {
    return inboxItems.slice(0, 5).map((item) => ({
      id: item.token, // 토큰을 ID로 사용
      talentName: item.talentName,
      position: item.position,
      company: item.requestingCompany,
      status: item.status,
      token: item.token,
      requestDate: item.requestDate,
    }));
  }, [inboxItems]);

  // 현재 사용자 정보
  const currentUser = useMemo(() => {
    return mockUsers.find((user) => user.id === CURRENT_USER_ID);
  }, []);

  // 로딩 시뮬레이션
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return {
    stats,
    recentRequests,
    recentReceivedRequests,
    inboxStats,
    loading,
    error,
    currentUser,
    totalUserRequests: userRequests.length,
    totalReceivedRequests: inboxItems.length,
  };
};

export default useDashboard;
