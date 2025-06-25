# Components

이 폴더는 재사용 가능한 React 컴포넌트들을 포함합니다.

## 구조

- **ui/**: shadcn/ui 기반의 기본 UI 컴포넌트들 (예: Button, Input, Card)
- **layout/**: 애플리케이션의 주요 레이아웃 구조를 담당하는 컴포넌트들.
  - `Header`, `Footer`, `Sidebar`: 공통 레이아웃 요소.
  - `MainLayout`: 기본적인 페이지 구조를 제공하는 핵심 레이아웃.
  - `DashboardLayout`: 인증된 사용자를 위한 대시보드 레이아웃.
  - `PageContainer`: 페이지 내부 컨텐츠의 폭과 패딩을 조절하는 컨테이너.
  - **variants/**: `MainLayout`을 기반으로 특정 페이지 유형에 맞게 사전 구성된 레이아웃 변형들.
    - `LandingLayout`, `AuthLayout`, `DocsLayout`, `ErrorLayout`, `PublicPageLayout` 등.
- **common/**: 여러 곳에서 공통으로 사용될 수 있는 유틸리티성 컴포넌트들 (예: `ErrorBoundary`, `ProtectedRoute`, `LoadingIndicator`).
- **routing/**: 라우팅과 관련된 컴포넌트 (예: `ProtectedRoute`).
- **accessibility/**: 접근성 관련 컴포넌트 (예: `AccessibilityAuditor`).
- **wizard/**: 다단계 폼 (마법사) UI를 구성하는 컴포넌트들.


## 사용법

```tsx
// 기본 UI 컴포넌트
import { Button, Card } from "@/components/ui";

// 핵심 레이아웃 및 요소
import { MainLayout, Header, Footer, PageContainer } from "@/components/layout";

// 특정 페이지 유형을 위한 레이아웃 변형
import { LandingLayout, AuthLayout } from "@/components/layout"; // index.ts를 통해 variants 내부 컴포넌트 접근 가능

// 공통 컴포넌트
import { ErrorBoundary, LoadingIndicator } from "@/components/common";

// 예시: 특정 페이지에서 AuthLayout 사용
// import { AuthLayout } from "@/components/layout";
//
// const LoginPage = () => {
//   return (
//     <AuthLayout>
//       {/* 로그인 폼 내용 */}
//     </AuthLayout>
//   );
// };
```
