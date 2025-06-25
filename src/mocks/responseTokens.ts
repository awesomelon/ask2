// 응답 토큰 타입 정의
export interface ResponseToken {
  token: string;
  requestId: string;
  companyId: string;
  respondentEmail: string;
  respondentName: string;
  createdAt: Date;
  expiresAt: Date;
  isUsed: boolean;
  usedAt?: Date;
  remindersSent: number;
  lastReminderAt?: Date;
}

// 목업 응답 토큰 데이터
export const mockResponseTokens: Record<string, ResponseToken> = {
  abc123token: {
    token: "abc123token",
    requestId: "req-001",
    companyId: "org-001",
    respondentEmail: "park.manager@techstartup.com",
    respondentName: "박매니저",
    createdAt: new Date("2024-03-15T10:00:00"),
    expiresAt: new Date("2024-04-15T23:59:59"),
    isUsed: true,
    usedAt: new Date("2024-03-18T14:30:00"),
    remindersSent: 1,
    lastReminderAt: new Date("2024-03-20T09:00:00"),
  },
  def456token: {
    token: "def456token",
    requestId: "req-001",
    companyId: "org-002",
    respondentEmail: "lee.team@globalit.com",
    respondentName: "이팀장",
    createdAt: new Date("2024-03-15T10:00:00"),
    expiresAt: new Date("2024-04-15T23:59:59"),
    isUsed: true,
    usedAt: new Date("2024-03-20T09:15:00"),
    remindersSent: 2,
    lastReminderAt: new Date("2024-03-25T14:00:00"),
  },
  ghi789token: {
    token: "ghi789token",
    requestId: "req-001",
    companyId: "org-003",
    respondentEmail: "kim.dev@innovationlab.co.kr",
    respondentName: "김개발자",
    createdAt: new Date("2024-03-15T10:00:00"),
    expiresAt: new Date("2025-07-15T23:59:59"),
    isUsed: false,
    remindersSent: 3,
    lastReminderAt: new Date("2025-07-28T16:30:00"),
  },
  jkl012token: {
    token: "jkl012token",
    requestId: "req-001",
    companyId: "org-004",
    respondentEmail: "choi.cto@digitalsolution.com",
    respondentName: "최CTO",
    createdAt: new Date("2024-03-15T10:00:00"),
    expiresAt: new Date("2024-04-15T23:59:59"),
    isUsed: false,
    remindersSent: 0,
  },
  mno345token: {
    token: "mno345token",
    requestId: "req-002",
    companyId: "org-001",
    respondentEmail: "park.manager@techstartup.com",
    respondentName: "박매니저",
    createdAt: new Date("2024-03-10T09:00:00"),
    expiresAt: new Date("2024-04-10T23:59:59"),
    isUsed: true,
    usedAt: new Date("2024-03-12T16:45:00"),
    remindersSent: 0,
  },
  pqr678token: {
    token: "pqr678token",
    requestId: "req-003",
    companyId: "org-001",
    respondentEmail: "jung.hr@techstartup.com",
    respondentName: "정HR",
    createdAt: new Date("2024-03-22T11:00:00"),
    expiresAt: new Date("2024-04-22T23:59:59"),
    isUsed: false,
    remindersSent: 1,
    lastReminderAt: new Date("2024-03-29T10:00:00"),
  },
};

// 토큰 검증 함수
export const validateResponseToken = (token: string) => {
  const tokenData = mockResponseTokens[token];

  if (!tokenData) {
    return {
      isValid: false,
      error: "TOKEN_NOT_FOUND",
      message: "유효하지 않은 토큰입니다.",
    };
  }

  if (tokenData.isUsed) {
    return {
      isValid: false,
      error: "TOKEN_ALREADY_USED",
      message: "이미 사용된 토큰입니다.",
      usedAt: tokenData.usedAt,
    };
  }

  if (new Date() > tokenData.expiresAt) {
    return {
      isValid: false,
      error: "TOKEN_EXPIRED",
      message: "만료된 토큰입니다.",
      expiresAt: tokenData.expiresAt,
    };
  }

  return {
    isValid: true,
    tokenData,
  };
};

// 토큰 사용 처리 함수
export const markTokenAsUsed = (token: string): boolean => {
  const tokenData = mockResponseTokens[token];

  if (!tokenData || tokenData.isUsed) {
    return false;
  }

  tokenData.isUsed = true;
  tokenData.usedAt = new Date();
  return true;
};

// 특정 요청의 토큰들 가져오기
export const getTokensByRequestId = (requestId: string): ResponseToken[] => {
  return Object.values(mockResponseTokens).filter(
    (token) => token.requestId === requestId
  );
};

// 토큰 만료 확인
export const isTokenExpired = (token: string): boolean => {
  const tokenData = mockResponseTokens[token];
  if (!tokenData) return true;
  return new Date() > tokenData.expiresAt;
};

// 리마인더 발송 필요 토큰들 가져오기
export const getTokensNeedingReminder = (): ResponseToken[] => {
  const now = new Date();
  const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);

  return Object.values(mockResponseTokens).filter((token) => {
    if (token.isUsed || now > token.expiresAt) return false;

    // 3일 이상 경과한 미사용 토큰
    if (!token.lastReminderAt) {
      return token.createdAt < threeDaysAgo;
    }

    // 마지막 리마인더 후 3일 이상 경과
    return token.lastReminderAt < threeDaysAgo && token.remindersSent < 3;
  });
};

// 토큰 통계
export const getTokenStats = (requestId?: string) => {
  const tokens = requestId
    ? getTokensByRequestId(requestId)
    : Object.values(mockResponseTokens);

  const total = tokens.length;
  const used = tokens.filter((t) => t.isUsed).length;
  const expired = tokens.filter(
    (t) => !t.isUsed && isTokenExpired(t.token)
  ).length;
  const pending = tokens.filter(
    (t) => !t.isUsed && !isTokenExpired(t.token)
  ).length;

  return {
    total,
    used,
    expired,
    pending,
    responseRate: total > 0 ? (used / total) * 100 : 0,
  };
};
