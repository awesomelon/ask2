import { useState, useEffect } from "react";
import type { ReferenceRequest } from "@/types";
import type { ReferenceResponse } from "@/mocks";
import {
  findMockRequestById,
  findMockResponsesByRequestId,
  getResponseStatsByRequestId,
  getTokensByRequestId,
} from "@/mocks";

export interface RequestDetailStats {
  totalCompanies: number;
  respondedCompanies: number;
  pendingCompanies: number;
  rejectedCompanies: number;
  responseRate: number;
  averageRatings: Record<string, number>;
  totalResponses: number;
}

export interface UseRequestDetailReturn {
  request: ReferenceRequest | null;
  responses: ReferenceResponse[];
  stats: RequestDetailStats;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useRequestDetail = (requestId: string): UseRequestDetailReturn => {
  const [request, setRequest] = useState<ReferenceRequest | null>(null);
  const [responses, setResponses] = useState<ReferenceResponse[]>([]);
  const [stats, setStats] = useState<RequestDetailStats>({
    totalCompanies: 0,
    respondedCompanies: 0,
    pendingCompanies: 0,
    rejectedCompanies: 0,
    responseRate: 0,
    averageRatings: {},
    totalResponses: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRequestDetail = async () => {
    try {
      setLoading(true);
      setError(null);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Find request by ID
      const foundRequest = findMockRequestById(requestId);
      if (!foundRequest) {
        setError("요청을 찾을 수 없습니다.");
        return;
      }

      // Get responses
      const requestResponses = findMockResponsesByRequestId(requestId);

      // Get response statistics
      const responseStats = getResponseStatsByRequestId(requestId);

      // Calculate company statistics
      const totalCompanies = foundRequest.companies.length;
      const respondedCompanies = foundRequest.companies.filter(
        (company) => company.status === "responded"
      ).length;
      const pendingCompanies = foundRequest.companies.filter(
        (company) => company.status === "pending"
      ).length;
      const rejectedCompanies = foundRequest.companies.filter(
        (company) => company.status === "rejected"
      ).length;

      const responseRate =
        totalCompanies > 0 ? (respondedCompanies / totalCompanies) * 100 : 0;

      setRequest(foundRequest);
      setResponses(requestResponses);
      setStats({
        totalCompanies,
        respondedCompanies,
        pendingCompanies,
        rejectedCompanies,
        responseRate,
        averageRatings: responseStats.averageRatings,
        totalResponses: responseStats.totalResponses,
      });
    } catch (err) {
      setError("데이터를 불러오는 중 오류가 발생했습니다.");
      console.error("Error fetching request detail:", err);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchRequestDetail();
  };

  useEffect(() => {
    if (requestId) {
      fetchRequestDetail();
    }
  }, [requestId]);

  return {
    request,
    responses,
    stats,
    loading,
    error,
    refetch,
  };
};
