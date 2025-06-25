import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { dashboardService, type DashboardStats, type RecentRequestItem } from "@/services/dashboardService";
import { useInbox } from "./useInbox";
import type { User as AuthUser } from "@/contexts/AuthContext";
// Assuming mockUsers is part of a User type definition used by dashboardService, or can be mapped
// For now, we'll use AuthUser from AuthContext as the primary User type in the hook.

export const useDashboard = () => {
  const { user: authUser, isLoading: authLoading } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentRequests, setRecentRequests] = useState<RecentRequestItem[]>([]);
  const [currentUserDetails, setCurrentUserDetails] = useState<AuthUser | null>(null); // Using AuthUser type
  const [totalUserRequests, setTotalUserRequests] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { inboxItems, stats: inboxStats, loading: inboxLoading, error: inboxError } = useInbox();

  const fetchData = useCallback(async (userId: string) => {
    setLoading(true);
    setError(null);
    try {
      const [userStats, userRecentRequests, userDetails, userRequestsList] = await Promise.all([
        dashboardService.getDashboardStats(userId),
        dashboardService.getRecentRequests(userId),
        // dashboardService.getUserDetails(userId), // This returns DataUser, might need mapping or use authUser
        authUser, // Prefer authUser directly if sufficient
        dashboardService.getUserRequests(userId)
      ]);
      setStats(userStats);
      setRecentRequests(userRecentRequests);
      // If getUserDetails was called and returned a different User type, map it here or use authUser
      setCurrentUserDetails(authUser); // Using authUser directly
      setTotalUserRequests(userRequestsList.length);

    } catch (e) {
      console.error("Failed to fetch dashboard data:", e);
      setError("대시보드 데이터를 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }, [authUser]); // Depend on authUser to refetch if it changes

  useEffect(() => {
    if (authUser && authUser.id && !authLoading) {
      fetchData(authUser.id);
    } else if (!authLoading) {
      // Handle case where there is no authenticated user
      setLoading(false);
      // Optionally set error or clear data
      // setError("사용자 인증이 필요합니다.");
      setStats(null);
      setRecentRequests([]);
      setCurrentUserDetails(null);
      setTotalUserRequests(0);
    }
  }, [authUser, authLoading, fetchData]);

  // 최근 수신한 요청들 (최신 5개, 수신함 데이터 활용)
  // This part remains largely the same as it depends on useInbox
  const recentReceivedRequests = inboxItems.slice(0, 5).map((item) => ({
    id: item.token,
    talentName: item.talentName,
    position: item.position,
    company: item.requestingCompany,
    status: item.status,
    token: item.token,
    requestDate: item.requestDate,
  }));

  return {
    stats,
    recentRequests,
    recentReceivedRequests,
    inboxStats,
    loading: loading || authLoading || inboxLoading, // Combine loading states
    error: error || inboxError, // Combine error states
    currentUser: currentUserDetails, // This is now AuthUser type
    totalUserRequests,
    totalReceivedRequests: inboxItems.length, // from useInbox
  };
};

export default useDashboard;
