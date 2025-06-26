// 평판 질문 타입 정의
export interface ReferenceQuestion {
  id: string;
  text: string;
  type: "text" | "rating" | "multiple_choice";
  required: boolean;
  options?: string[];
  category: "skills" | "teamwork" | "leadership" | "communication" | "general";
}

// 평판 응답 타입 정의
export interface ReferenceResponse {
  id: string;
  requestId: string;
  companyId: string;
  respondentId: string;
  respondentName: string;
  respondentEmail: string;
  responses: Array<{
    questionId: string;
    question: string;
    answer: string;
    rating?: number;
  }>;
  additionalComments: string;
  submittedAt: Date;
  isAnonymous: boolean;
}

// 기본 평판 질문들
export const mockReferenceQuestions: ReferenceQuestion[] = [
  {
    id: "q1",
    text: "해당 인재의 전반적인 업무 능력을 어떻게 평가하시나요?",
    type: "rating",
    required: true,
    category: "skills",
  },
  {
    id: "q2",
    text: "팀워크와 협업 능력은 어떠했나요?",
    type: "rating",
    required: true,
    category: "teamwork",
  },
  {
    id: "q3",
    text: "의사소통 능력과 업무 태도에 대해 설명해주세요.",
    type: "text",
    required: true,
    category: "communication",
  },
  {
    id: "q4",
    text: "리더십과 주도성은 어느 정도였나요?",
    type: "rating",
    required: false,
    category: "leadership",
  },
  {
    id: "q5",
    text: "해당 인재를 다시 함께 일하고 싶으신가요?",
    type: "multiple_choice",
    required: true,
    options: ["적극 추천", "추천", "보통", "추천하지 않음"],
    category: "general",
  },
  {
    id: "q6",
    text: "가장 인상 깊었던 프로젝트나 성과가 있다면 말씀해주세요.",
    type: "text",
    required: false,
    category: "skills",
  },
  {
    id: "q7",
    text: "개선이 필요한 부분이 있다면 어떤 것인가요?",
    type: "text",
    required: false,
    category: "general",
  },
];

// 목업 평판 응답 데이터
export const mockReferenceResponses: ReferenceResponse[] = [
  {
    id: "resp-001",
    requestId: "req-001",
    companyId: "org-001",
    respondentId: "user-001",
    respondentName: "박매니저",
    respondentEmail: "park.manager@techstartup.com",
    responses: [
      {
        questionId: "q1",
        question: "해당 인재의 전반적인 업무 능력을 어떻게 평가하시나요?",
        answer: "매우 우수한 개발 실력을 보유하고 있습니다.",
        rating: 5,
      },
      {
        questionId: "q2",
        question: "팀워크와 협업 능력은 어떠했나요?",
        answer: "동료들과 원활하게 소통하며 협업했습니다.",
        rating: 4,
      },
      {
        questionId: "q3",
        question: "의사소통 능력과 업무 태도에 대해 설명해주세요.",
        answer:
          "명확하고 논리적인 의사소통을 하며, 책임감이 강합니다. 문제 해결에 적극적으로 임하는 자세가 인상적이었습니다.",
      },
      {
        questionId: "q4",
        question: "리더십과 주도성은 어느 정도였나요?",
        answer: "프로젝트를 주도적으로 이끌어가는 능력이 뛰어납니다.",
        rating: 4,
      },
      {
        questionId: "q5",
        question: "해당 인재를 다시 함께 일하고 싶으신가요?",
        answer: "적극 추천",
      },
      {
        questionId: "q6",
        question: "가장 인상 깊었던 프로젝트나 성과가 있다면 말씀해주세요.",
        answer:
          "전자상거래 플랫폼의 API 성능을 20% 개선한 프로젝트가 가장 인상 깊었습니다. 체계적인 분석과 최적화로 눈에 띄는 성과를 만들어냈습니다.",
      },
    ],
    additionalComments:
      "성실하고 책임감 있는 개발자였습니다. 기술적 역량뿐만 아니라 팀워크도 훌륭했고, 어려운 문제를 끝까지 해결하려는 의지가 강했습니다. 적극 추천합니다.",
    submittedAt: new Date("2024-03-18T14:30:00"),
    isAnonymous: false,
  },
  {
    id: "resp-002",
    requestId: "req-001",
    companyId: "org-002",
    respondentId: "user-002",
    respondentName: "이팀장",
    respondentEmail: "lee.team@globalit.com",
    responses: [
      {
        questionId: "q1",
        question: "해당 인재의 전반적인 업무 능력을 어떻게 평가하시나요?",
        answer: "우수한 기술력과 빠른 학습능력을 보여주었습니다.",
        rating: 4,
      },
      {
        questionId: "q2",
        question: "팀워크와 협업 능력은 어떠했나요?",
        answer: "팀원들과 잘 어울리며 적극적으로 도움을 주었습니다.",
        rating: 5,
      },
      {
        questionId: "q3",
        question: "의사소통 능력과 업무 태도에 대해 설명해주세요.",
        answer:
          "이해하기 쉽게 설명하는 능력이 뛰어나고, 항상 긍정적인 태도로 업무에 임했습니다.",
      },
      {
        questionId: "q4",
        question: "리더십과 주도성은 어느 정도였나요?",
        answer: "필요할 때 리더십을 발휘하며 팀을 이끌었습니다.",
        rating: 4,
      },
      {
        questionId: "q5",
        question: "해당 인재를 다시 함께 일하고 싶으신가요?",
        answer: "추천",
      },
      {
        questionId: "q7",
        question: "개선이 필요한 부분이 있다면 어떤 것인가요?",
        answer:
          "가끔 완벽주의적 성향으로 인해 일정이 지연되는 경우가 있었습니다. 하지만 품질에 대한 책임감의 발로라고 생각합니다.",
      },
    ],
    additionalComments:
      "함께 일하기 좋은 동료였습니다. 기술적 깊이가 있고 팀워크가 훌륭합니다.",
    submittedAt: new Date("2024-03-20T09:15:00"),
    isAnonymous: false,
  },
  {
    id: "resp-003",
    requestId: "req-002",
    companyId: "org-001",
    respondentId: "user-001",
    respondentName: "박매니저",
    respondentEmail: "park.manager@techstartup.com",
    responses: [
      {
        questionId: "q1",
        question: "해당 인재의 전반적인 업무 능력을 어떻게 평가하시나요?",
        answer: "프론트엔드 개발 전문성이 뛰어납니다.",
        rating: 5,
      },
      {
        questionId: "q2",
        question: "팀워크와 협업 능력은 어떠했나요?",
        answer: "디자이너와의 협업이 매우 원활했습니다.",
        rating: 5,
      },
      {
        questionId: "q3",
        question: "의사소통 능력과 업무 태도에 대해 설명해주세요?",
        answer:
          "사용자 경험에 대한 깊은 이해를 바탕으로 적극적으로 제안하고 개선점을 찾아내는 자세가 훌륭했습니다.",
      },
      {
        questionId: "q5",
        question: "해당 인재를 다시 함께 일하고 싶으신가요?",
        answer: "적극 추천",
      },
    ],
    additionalComments: "디자인 감각과 기술력을 모두 갖춘 훌륭한 개발자입니다.",
    submittedAt: new Date("2024-03-12T16:45:00"),
    isAnonymous: false,
  },
];

// 헬퍼 함수들
export const findMockResponsesByRequestId = (
  requestId: string
): ReferenceResponse[] => {
  return mockReferenceResponses.filter(
    (response) => response.requestId === requestId
  );
};

export const findMockResponseById = (
  responseId: string
): ReferenceResponse | undefined => {
  return mockReferenceResponses.find((response) => response.id === responseId);
};

export const getResponseStatsByRequestId = (requestId: string) => {
  const responses = findMockResponsesByRequestId(requestId);

  if (responses.length === 0) {
    return {
      totalResponses: 0,
      averageRatings: {},
      commonAnswers: {},
      responseRate: 0,
    };
  }

  // 평점 평균 계산
  const ratingQuestions = ["q1", "q2", "q4"];
  const averageRatings: Record<string, number> = {};

  ratingQuestions.forEach((questionId) => {
    const ratings = responses
      .map(
        (r) =>
          r.responses.find((resp) => resp.questionId === questionId)?.rating
      )
      .filter((rating): rating is number => rating !== undefined);

    if (ratings.length > 0) {
      averageRatings[questionId] =
        ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length;
    }
  });

  // 다중 선택 질문 응답 통계
  const commonAnswers: Record<string, Record<string, number>> = {};
  const multipleChoiceQuestions = ["q5"];

  multipleChoiceQuestions.forEach((questionId) => {
    const answers = responses
      .map(
        (r) =>
          r.responses.find((resp) => resp.questionId === questionId)?.answer
      )
      .filter((answer): answer is string => answer !== undefined);

    commonAnswers[questionId] = {};
    answers.forEach((answer) => {
      commonAnswers[questionId][answer] =
        (commonAnswers[questionId][answer] || 0) + 1;
    });
  });

  return {
    totalResponses: responses.length,
    averageRatings,
    commonAnswers,
    responseRate: responses.length, // 실제로는 전체 요청 수 대비 계산해야 함
  };
};
