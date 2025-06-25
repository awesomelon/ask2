# Pages

이 폴더는 애플리케이션의 페이지 컴포넌트들을 포함합니다.

## 페이지 구조

### 인증 관련

- **LandingPage**: 메인 랜딩 페이지 (`/`)
- **LoginPage**: 로그인 페이지 (`/login`)
- **CorporateSignupPage**: 기업회원 가입 페이지 (`/signup/corporate`)

### 대시보드

- **DashboardPage**: 메인 대시보드 (`/dashboard`)
- **InboxPage**: 수신함 (`/inbox`)
- **SettingsPage**: 사용자 설정 (`/settings`)

### 평판 요청 프로세스

- **NewRequestWizard**: 새 요청 마법사 (`/request/new`)
- **ConsentPage**: 동의 확인 (`/consent/:token`)
- **RespondPage**: 평판 응답 (`/respond/:token`)
- **ResultPage**: 결과 페이지 (`/request/:id/result`)

## 사용법

```tsx
import { LandingPage, LoginPage } from "@/pages";
```
