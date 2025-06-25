import type {
  ReferenceRequest,
  RequestCompany,
  User,
  Organization,
} from "@/types";

// 목업 조직 데이터
export const mockOrganizations: Organization[] = [
  {
    id: "org-001",
    name: "테크스타트업",
    domain: "techstartup.com",
    verified: true,
  },
  {
    id: "org-002",
    name: "글로벌IT",
    domain: "globalit.com",
    verified: true,
  },
  {
    id: "org-003",
    name: "이노베이션랩",
    domain: "innovationlab.co.kr",
    verified: true,
  },
  {
    id: "org-004",
    name: "디지털솔루션",
    domain: "digitalsolution.com",
    verified: false,
  },
];

// 목업 사용자 데이터
export const mockUsers: User[] = [
  {
    id: "user-001",
    name: "박매니저",
    email: "park.manager@techstartup.com",
    type: "corporate",
    organization: mockOrganizations[0],
  },
  {
    id: "user-002",
    name: "이팀장",
    email: "lee.team@globalit.com",
    type: "corporate",
    organization: mockOrganizations[1],
  },
  {
    id: "user-003",
    name: "김개발자",
    email: "kim.dev@innovationlab.co.kr",
    type: "corporate",
    organization: mockOrganizations[2],
  },
  {
    id: "user-004",
    name: "최CTO",
    email: "choi.cto@digitalsolution.com",
    type: "corporate",
    organization: mockOrganizations[3],
  },
  {
    id: "user-005",
    name: "정HR",
    email: "jung.hr@techstartup.com",
    type: "corporate",
    organization: mockOrganizations[0],
  },
];

// 목업 회사 응답 데이터
const createMockRequestCompany = (
  orgIndex: number,
  userIndexes: number[],
  status: RequestCompany["status"],
  respondedAt?: Date,
  rejectionReason?: string
): RequestCompany => ({
  organization: mockOrganizations[orgIndex],
  respondents: userIndexes.map((i) => mockUsers[i]),
  status,
  requestedAt: new Date("2024-03-15"),
  respondedAt,
  rejectionReason,
});

// 목업 평판 요청 데이터
export const mockReferenceRequests: ReferenceRequest[] = [
  {
    id: "req-001",
    talentName: "김철수",
    talentEmail: "kim.chulsoo@gmail.com",
    position: "시니어 백엔드 개발자",
    status: "in_progress",
    companies: [
      createMockRequestCompany(0, [0], "responded", new Date("2024-03-18")),
      createMockRequestCompany(1, [1], "responded", new Date("2024-03-20")),
      createMockRequestCompany(2, [2], "pending"),
      createMockRequestCompany(
        3,
        [3],
        "rejected",
        undefined,
        "인력 부족으로 응답 불가"
      ),
    ],
    createdAt: new Date("2024-03-15"),
    updatedAt: new Date("2024-03-20"),
    createdBy: mockUsers[0],
    notes:
      "React, Node.js 경험이 풍부한 개발자입니다. 팀 리더십 경험도 중요하게 평가해주세요.",
  },
  {
    id: "req-002",
    talentName: "이영희",
    talentEmail: "lee.younghee@example.com",
    position: "프론트엔드 개발자",
    status: "completed",
    companies: [
      createMockRequestCompany(0, [0, 4], "responded", new Date("2024-03-12")),
      createMockRequestCompany(1, [1], "responded", new Date("2024-03-14")),
      createMockRequestCompany(2, [2], "responded", new Date("2024-03-16")),
    ],
    createdAt: new Date("2024-03-10"),
    updatedAt: new Date("2024-03-16"),
    createdBy: mockUsers[1],
    notes: "Vue.js와 React 모두 경험이 있습니다. 디자인 감각도 뛰어납니다.",
  },
  {
    id: "req-003",
    talentName: "박민수",
    talentEmail: "park.minsu@company.com",
    position: "데이터 사이언티스트",
    status: "pending",
    companies: [
      createMockRequestCompany(1, [1], "pending"),
      createMockRequestCompany(2, [2], "pending"),
      createMockRequestCompany(3, [3], "pending"),
    ],
    createdAt: new Date("2024-03-22"),
    updatedAt: new Date("2024-03-22"),
    createdBy: mockUsers[0],
    notes: "Python, SQL, 머신러닝 경험을 중점적으로 평가해주세요.",
  },
];

// ID로 특정 요청 찾기 헬퍼 함수
export const findMockRequestById = (
  id: string
): ReferenceRequest | undefined => {
  return mockReferenceRequests.find((request) => request.id === id);
};

// 상태별 요청 필터링 헬퍼 함수
export const getMockRequestsByStatus = (
  status: ReferenceRequest["status"]
): ReferenceRequest[] => {
  return mockReferenceRequests.filter((request) => request.status === status);
};

// 특정 조직의 요청들 가져오기 헬퍼 함수
export const getMockRequestsByOrganization = (
  organizationId: string
): ReferenceRequest[] => {
  return mockReferenceRequests.filter((request) =>
    request.companies.some(
      (company) => company.organization.id === organizationId
    )
  );
};
