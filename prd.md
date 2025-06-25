ASK2 프론트엔드 개발 계획을 검토한 내용을 바탕으로 목업 페이지 구성을 위한 개발 계획을 수립했습니다.

## 🎯 ASK2 프론트엔드 목업 개발 계획

### 1. 개발 환경 설정 (Day 1)

#### 프로젝트 초기 설정

```bash
# 프로젝트 생성
yarn create vite ask2-frontend --template react-ts
cd ask2-frontend

# 필수 패키지 설치
yarn add react-router-dom
yarn add @tanstack/react-query
yarn add axios
yarn add -D tailwindcss postcss autoprefixer
yarn add @radix-ui/react-* # shadcn/ui 컴포넌트에 필요한 패키지들
```

#### 프로젝트 구조

```
src/
├── components/        # 재사용 가능한 컴포넌트
│   ├── ui/           # shadcn/ui 컴포넌트
│   ├── layout/       # 레이아웃 컴포넌트
│   └── common/       # 공통 컴포넌트
├── pages/            # 페이지 컴포넌트
├── hooks/            # 커스텀 훅
├── utils/            # 유틸리티 함수
├── styles/           # 전역 스타일
├── types/            # TypeScript 타입 정의
└── mocks/            # 목업 데이터
```

### 2. 공통 컴포넌트 개발 (Day 2-3)

#### 필수 UI 컴포넌트

- **Layout Components**

  - Header (로고, 네비게이션, 사용자 메뉴)
  - Sidebar (대시보드용)
  - Footer
  - PageContainer

- **Common Components**
  - Button (primary, secondary, outline)
  - Input (text, email, password)
  - Select/Dropdown
  - Card
  - Modal/Dialog
  - Table
  - Tabs
  - Progress/Stepper
  - Badge
  - Alert/Toast

### 3. 페이지별 개발 계획

#### Phase 1: 인증 및 기본 페이지 (Day 4-5)

1. **랜딩 페이지** (`/`)

   - Hero 섹션
   - 기능 소개 섹션
   - CTA 버튼

2. **로그인 페이지** (`/login`)

   - 이메일/비밀번호 폼
   - Magic Link 로그인 옵션
   - 회원가입 링크

3. **기업회원 가입** (`/signup/corporate`)
   - 단계별 폼 (기업 인증 → 담당자 정보)
   - 이메일 인증 플로우
   - 약관 동의

#### Phase 2: 대시보드 및 메인 기능 (Day 6-8)

4. **메인 대시보드** (`/dashboard`)

   - 통계 카드 (진행중/완료/수신/응답률)
   - 최근 평판 요청 테이블
   - 최근 수신한 요청 테이블

5. **수신함** (`/inbox`)

   - 필터링 기능
   - 상태별 분류
   - 응답 통계

6. **사용자 설정** (`/settings`)
   - 프로필 정보 수정
   - 알림 설정
   - 보안 설정

#### Phase 3: 평판 요청 프로세스 (Day 9-12)

7. **평판 요청 생성** (`/request/new`)
   - **Step 1**: 인재 정보 입력 (`/request/new/talent`)
   - **Step 2**: 근무 이력 입력 (`/request/new/history`)
   - **Step 3**: 대상 기업 선택 (`/request/new/companies`)
   - **Step 4**: 질문 구성 (`/request/new/questions`)
   - **Step 5**: 동의 요청 확인 (`/request/new/confirm`)

#### Phase 4: 응답 및 결과 페이지 (Day 13-14)

8. **동의 확인 페이지** (`/consent/:token`)

   - 요청 정보 표시
   - 개인정보 수집 동의
   - 전자 서명

9. **평판 응답 페이지** (`/respond/:token`)

   - 인재 정보 표시
   - 질문별 응답 폼
   - 임시저장 기능

10. **평판 조회 결과** (`/request/:id/result`)

    - 응답 현황
    - 평가 요약
    - 주요 코멘트

11. **응답 상세 보기** (`/request/:id/result/detail`)
    - 응답자별 상세 내용
    - PDF 다운로드 기능

### 4. 목업 데이터 구조

```typescript
// types/index.ts
export interface User {
  id: string;
  email: string;
  name: string;
  type: "corporate" | "talent";
  organization?: Organization;
}

export interface Organization {
  id: string;
  name: string;
  domain: string;
  verified: boolean;
}

export interface ReferenceRequest {
  id: string;
  talentName: string;
  talentEmail: string;
  position: string;
  status: "pending" | "in_progress" | "completed";
  companies: RequestCompany[];
  createdAt: Date;
}

export interface RequestCompany {
  organization: Organization;
  respondents: User[];
  status: "pending" | "responded" | "rejected";
}
```

### 5. 라우팅 구조

```typescript
// App.tsx
const routes = [
  { path: "/", element: <LandingPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup/corporate", element: <CorporateSignupPage /> },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "inbox", element: <InboxPage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
  {
    path: "/request",
    element: (
      <ProtectedRoute>
        <RequestLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "new", element: <NewRequestWizard /> },
      { path: ":id/result", element: <ResultPage /> },
    ],
  },
  { path: "/consent/:token", element: <ConsentPage /> },
  { path: "/respond/:token", element: <RespondPage /> },
];
```

### 6. 개발 우선순위 및 일정

**Week 1 (Day 1-5)**

- 개발 환경 설정
- 공통 컴포넌트 개발
- 인증 관련 페이지 (로그인, 회원가입)

**Week 2 (Day 6-10)**

- 대시보드 및 메인 페이지
- 평판 요청 프로세스 (Step 1-3)

**Week 3 (Day 11-15)**

- 평판 요청 프로세스 완성 (Step 4-5)
- 응답 및 결과 페이지
- 전체 플로우 테스트

### 7. 목업 데이터 관리

```typescript
// mocks/data.ts
export const mockUsers = [
  {
    id: '1',
    email: 'hong@abc.com',
    name: '홍길동',
    type: 'corporate',
    organization: {
      id: 'org1',
      name: 'ABC회사',
      domain: 'abc.com',
      verified: true
    }
  }
];

export const mockRequests = [
  {
    id: 'req1',
    talentName: '김철수',
    talentEmail: 'kim@personal.com',
    position: '백엔드 개발자',
    status: 'in_progress',
    companies: [...],
    createdAt: new Date('2024-03-15')
  }
];
```

### 8. 스타일링 가이드라인

- **색상 팔레트**:

  - Primary: 파란색 계열
  - Secondary: 회색 계열
  - Success: 초록색
  - Warning: 노란색
  - Danger: 빨간색

- **Typography**:

  - 제목: font-bold text-2xl
  - 부제목: font-semibold text-lg
  - 본문: text-base
  - 캡션: text-sm text-gray-600

- **컴포넌트 스타일**:
  - Card: rounded-lg shadow-md p-6
  - Button: rounded-md px-4 py-2
  - Input: border rounded-md px-3 py-2

### 9. 주의사항

1. **반응형 디자인**: 모바일 우선 접근법 사용
2. **접근성**: ARIA 라벨, 키보드 네비게이션 지원
3. **로딩 상태**: 스켈레톤 UI 구현
4. **에러 처리**: 사용자 친화적인 에러 메시지
5. **폼 검증**: 클라이언트 사이드 검증 구현

이 계획에 따라 진행하면 3주 내에 완성도 높은 목업을 구축할 수 있습니다. 특정 페이지나 컴포넌트부터 시작하시겠습니까?
