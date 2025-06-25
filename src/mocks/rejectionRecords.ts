// 거절 기록 타입 정의
export interface RejectionRecord {
  id: string;
  token: string;
  requestId: string;
  respondentEmail: string;
  reason: string;
  rejectedAt: Date;
  ipAddress: string;
}

// 목업 거절 기록 데이터
export const mockRejectionRecords: Record<string, RejectionRecord> = {
  "rejection-yzab567": {
    id: "rejection-yzab567",
    token: "yzab567token",
    requestId: "req-005",
    respondentEmail: "kim.dev@innovationlab.co.kr",
    reason: "평가 대상자와 직접적인 업무 경험이 없음",
    rejectedAt: new Date("2025-04-21T10:30:00"),
    ipAddress: "192.168.1.100",
  },
};

// 토큰이 거절되었는지 확인하는 함수
export const isTokenRejected = (token: string): boolean => {
  return Object.values(mockRejectionRecords).some(
    (record) => record.token === token
  );
};

// 토큰의 거절 정보 가져오기
export const getRejectionInfo = (token: string): RejectionRecord | null => {
  const rejection = Object.values(mockRejectionRecords).find(
    (record) => record.token === token
  );
  return rejection || null;
};

// 거절 처리 함수 (새로운 거절 기록 생성)
export const recordRejection = (
  token: string,
  requestId: string,
  respondentEmail: string,
  reason: string
): RejectionRecord => {
  const rejectionId = `rejection-${Date.now()}`;
  const rejection: RejectionRecord = {
    id: rejectionId,
    token,
    requestId,
    respondentEmail,
    reason,
    rejectedAt: new Date(),
    ipAddress: "127.0.0.1", // Mock IP
  };

  mockRejectionRecords[rejectionId] = rejection;
  return rejection;
};
