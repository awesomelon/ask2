import {
  mockReferenceRequests,
  mockUsers,
  type ReferenceRequestStatusType,
  type User as DataUser, // Renaming to avoid conflict if User type is imported from AuthContext
  type ReferenceRequest,
} from "@/mocks/referenceRequests"; // Adjust path as necessary
import type { User as AuthUser } from "@/contexts/AuthContext"; // For current user type

// Ensure consistent User type if possible, or map between them.
// For now, assuming DataUser is the primary type for dashboard data.

export interface DashboardStats {
  totalRequests: number;
  inProgress: number;
  completed: number;
  pending: number;
  responseRate: number; // Percentage
}

export interface RecentRequestItem {
  id: string;
  talentName: string;
  position: string;
  status: ReferenceRequestStatusType;
  responses: number;
  total: number;
  createdAt: Date;
}

// Simulating API calls
export const dashboardService = {
  async getDashboardStats(userId: string): Promise<DashboardStats> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200));

    const userRequests = mockReferenceRequests.filter(
      (request) => request.createdBy?.id === userId
    );

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

    const completedRequests = userRequests.filter(
      (req) => req.status === "completed"
    );
    let totalResponseRateValue = 0;

    if (completedRequests.length > 0) {
      completedRequests.forEach((request) => {
        const totalCompanies = request.companies.length;
        const respondedCompanies = request.companies.filter(
          (company) => company.status === "responded"
        ).length;

        if (totalCompanies > 0) {
          totalResponseRateValue += (respondedCompanies / totalCompanies) * 100;
        }
      });
      totalResponseRateValue = totalResponseRateValue / completedRequests.length;
    }

    return {
      totalRequests: total,
      pending,
      inProgress,
      completed,
      responseRate: Math.round(totalResponseRateValue),
    };
  },

  async getRecentRequests(userId: string, limit: number = 5): Promise<RecentRequestItem[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200));

    const userRequests = mockReferenceRequests.filter(
        (request) => request.createdBy?.id === userId
    );

    return userRequests
      .map((request: ReferenceRequest): RecentRequestItem => {
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
      .slice(0, limit);
  },

  async getUserRequests(userId: string): Promise<ReferenceRequest[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockReferenceRequests.filter(request => request.createdBy?.id === userId);
  },

  // This function might be part of authService or a dedicated userService
  async getUserDetails(userId: string): Promise<DataUser | undefined> {
     // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockUsers.find((user) => user.id === userId);
  }
};
