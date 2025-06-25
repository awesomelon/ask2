# Components

이 폴더는 재사용 가능한 React 컴포넌트들을 포함합니다.

## 구조

- **ui/**: shadcn/ui 기반의 기본 UI 컴포넌트들
  - Button, Input, Card, Modal, Toast 등
- **layout/**: 레이아웃 관련 컴포넌트들
  - Header, Sidebar, Footer, PageContainer 등
- **common/**: 공통으로 사용되는 컴포넌트들
  - Loading, ErrorBoundary, ProtectedRoute 등

## 사용법

```tsx
import { Button, Card } from "@/components/ui";
import { Header, PageContainer } from "@/components/layout";
import { Loading } from "@/components/common";
```
