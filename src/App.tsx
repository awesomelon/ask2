import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/routing/ProtectedRoute";
import { ErrorBoundary } from "@/components/common/ErrorBoundary"; // Import ErrorBoundary
import { DashboardLayout, MainLayout } from "@/components/layout";
import { Toaster } from "@/components/ui/toaster";

// Import pages
import {
  LandingPage,
  LoginPage,
  CorporateSignupPage,
  DashboardPage,
  InboxPage,
  DocumentationPage,
  NewRequestWizard,
  RequestListPage,
  RequestDetailPage,
  ResponsePage,
  ConsentPage,
  RejectPage,
} from "@/pages";

import { Outlet } from "react-router-dom";

// Placeholder components for routes not yet implemented
const PlaceholderPage: React.FC<{ title: string; description?: string }> = ({
  title,
  description = "이 페이지는 아직 구현되지 않았습니다.",
}) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">{title}</h1>
      <p className="text-gray-600 mb-8">{description}</p>
      <button
        onClick={() => window.history.back()}
        className="text-primary hover:text-primary/90"
      >
        이전 페이지로 돌아가기
      </button>
    </div>
  </div>
);

// Layout component for public pages
const PublicLayout = () => {
  const navigate = useNavigate();
  return (
    <MainLayout onNavigate={navigate}>
      <Outlet />
    </MainLayout>
  );
};

// Layout component for protected dashboard pages
const ProtectedDashboardLayout = () => {
  const navigate = useNavigate();
  return (
    <ProtectedRoute>
      <DashboardLayout onNavigate={navigate}>
        <Outlet />
      </DashboardLayout>
    </ProtectedRoute>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <ErrorBoundary>
          <div className="App">
            {/* Skip Link for Accessibility */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded-md z-50"
            >
              메인 콘텐츠로 건너뛰기
            </a>

            <main id="main-content">
              <Routes>
                {/* Public Routes without specific layout (e.g., Landing, Login) */}
                <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/signup/corporate"
                element={<CorporateSignupPage />}
              />

              {/* Public pages with MainLayout */}
              <Route element={<PublicLayout />}>
                <Route path="/docs" element={<DocumentationPage />} />
                <Route
                  path="/help"
                  element={
                    <PlaceholderPage
                      title="도움말"
                      description="ASK2 사용법과 자주 묻는 질문입니다."
                    />
                  }
                />
              </Route>

              {/* Protected Dashboard Routes */}
              <Route element={<ProtectedDashboardLayout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/inbox" element={<InboxPage />} />
                <Route
                  path="/settings"
                  element={
                    <PlaceholderPage
                      title="설정"
                      description="사용자 설정 페이지입니다."
                    />
                  }
                />
                <Route
                  path="/analytics"
                  element={
                    <PlaceholderPage
                      title="분석 리포트"
                      description="평판 요청 및 응답에 대한 분석 리포트입니다."
                    />
                  }
                />
                <Route
                  path="/organization"
                  element={<Navigate to="/organization/members" replace />}
                />
                <Route
                  path="/organization/members"
                  element={
                    <PlaceholderPage
                      title="조직 구성원"
                      description="조직의 구성원을 관리하는 페이지입니다."
                    />
                  }
                />
                <Route
                  path="/organization/settings"
                  element={
                    <PlaceholderPage
                      title="조직 설정"
                      description="조직의 설정을 관리하는 페이지입니다."
                    />
                  }
                />
                <Route path="/requests" element={<RequestListPage />} />
                <Route path="/request/new" element={<NewRequestWizard />} />
                <Route
                  path="/request/my"
                  element={
                    <PlaceholderPage
                      title="내 요청"
                      description="내가 생성한 평판 요청 목록을 확인하는 페이지입니다."
                    />
                  }
                />
                <Route
                  path="/request/:id/result"
                  element={<RequestDetailPage />}
                />
                <Route
                  path="/request/:id/result/detail"
                  element={
                    <PlaceholderPage
                      title="상세 결과"
                      description="평판 요청의 상세 결과를 확인하는 페이지입니다."
                    />
                  }
                />
              </Route>

              {/* Routes accessible publicly but might not need full MainLayout */}
              <Route path="/respond/:token" element={<ResponsePage />} />
              <Route path="/consent/:token" element={<ConsentPage />} />
              <Route path="/reject/:token" element={<RejectPage />} />

              {/* Additional utility routes (can be grouped under PublicLayout or have their own) */}
              <Route
                path="/forgot-password"
                element={
                  <PlaceholderPage
                    title="비밀번호 재설정"
                    description="비밀번호 재설정 페이지입니다."
                  />
                }
              />

              {/* Catch-all route for 404 */}
              <Route
                path="*"
                element={
                  <PlaceholderPage
                    title="페이지를 찾을 수 없습니다"
                    description="요청하신 페이지가 존재하지 않습니다."
                  />
                }
              />
            </Routes>
          </main>

          {/* Global Toast Notifications */}
          <Toaster />
        </div>
        </ErrorBoundary>
      </Router>
    </AuthProvider>
  );
}

export default App;
