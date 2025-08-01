// Mock Data Export
// Centralized export of all mock data

// Reference Requests
export {
  mockOrganizations,
  mockUsers,
  mockReferenceRequests,
  findMockRequestById,
  getMockRequestsByStatus,
  getMockRequestsByOrganization,
} from "./referenceRequests";

// Reference Responses
export {
  mockReferenceQuestions,
  mockReferenceResponses,
  findMockResponsesByRequestId,
  findMockResponseById,
  getResponseStatsByRequestId,
} from "./referenceResponses";

// Response Tokens
export {
  mockResponseTokens,
  validateResponseToken,
  markTokenAsUsed,
  getTokensByRequestId,
  isTokenExpired,
  getTokensNeedingReminder,
  getTokenStats,
} from "./responseTokens";

// Rejection Records
export {
  mockRejectionRecords,
  isTokenRejected,
  getRejectionInfo,
  recordRejection,
} from "./rejectionRecords";

// Export types for external use
export type {
  ReferenceQuestion,
  ReferenceResponse,
} from "./referenceResponses";
export type { ResponseToken } from "./responseTokens";
export type { RejectionRecord } from "./rejectionRecords";
