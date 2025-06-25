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
} from "@/pages";

// Custom hook for navigation
const useAppNavigation = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return { navigate: handleNavigate };
};

// Page wrapper components that provide navigation
const LandingPageWrapper = () => {
  const { navigate } = useAppNavigation();
  return <LandingPage onNavigate={navigate} />;
};

const LoginPageWrapper = () => {
  const { navigate } = useAppNavigation();
  return <LoginPage onNavigate={navigate} />;
};

const CorporateSignupPageWrapper = () => {
  const { navigate } = useAppNavigation();
  return <CorporateSignupPage onNavigate={navigate} />;
};

const DashboardPageWrapper = () => {
  const { navigate } = useAppNavigation();
  return <DashboardPage onNavigate={navigate} />;
};

const InboxPageWrapper = () => {
  const { navigate } = useAppNavigation();
  return <InboxPage onNavigate={navigate} />;
};

const DocumentationPageWrapper = () => {
  return <DocumentationPage />;
};

const RequestListPageWrapper = () => {
  const { navigate } = useAppNavigation();
  return <RequestListPage onNavigate={navigate} />;
};

// Public Layout Component
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { navigate } = useAppNavigation();

  return <MainLayout onNavigate={navigate}>{children}</MainLayout>;
};

// Protected Dashboard Layout Component
const ProtectedDashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { navigate } = useAppNavigation();

  return (
    <ProtectedRoute>
      <DashboardLayout onNavigate={navigate}>{children}</DashboardLayout>
    </ProtectedRoute>
  );
};

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

function App() {
  return (
    <AuthProvider>
      <Router>
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
              {/* Public Routes */}
              <Route path="/" element={<LandingPageWrapper />} />
              <Route path="/login" element={<LoginPageWrapper />} />
              <Route
                path="/signup/corporate"
                element={<CorporateSignupPageWrapper />}
              />

              {/* Public pages with layout */}
              <Route
                path="/docs"
                element={
                  <PublicLayout>
                    <DocumentationPageWrapper />
                  </PublicLayout>
                }
              />

              {/* Protected Dashboard Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedDashboardLayout>
                    <DashboardPageWrapper />
                  </ProtectedDashboardLayout>
                }
              />

              <Route
                path="/inbox"
                element={
                  <ProtectedDashboardLayout>
                    <InboxPageWrapper />
                  </ProtectedDashboardLayout>
                }
              />

              <Route
                path="/settings"
                element={
                  <ProtectedDashboardLayout>
                    <PlaceholderPage
                      title="설정"
                      description="사용자 설정 페이지입니다."
                    />
                  </ProtectedDashboardLayout>
                }
              />

              {/* Analytics Routes */}
              <Route
                path="/analytics"
                element={
                  <ProtectedDashboardLayout>
                    <PlaceholderPage
                      title="분석 리포트"
                      description="평판 요청 및 응답에 대한 분석 리포트입니다."
                    />
                  </ProtectedDashboardLayout>
                }
              />

              {/* Organization Management Routes */}
              <Route
                path="/organization"
                element={<Navigate to="/organization/members" replace />}
              />

              <Route
                path="/organization/members"
                element={
                  <ProtectedDashboardLayout>
                    <PlaceholderPage
                      title="조직 구성원"
                      description="조직의 구성원을 관리하는 페이지입니다."
                    />
                  </ProtectedDashboardLayout>
                }
              />

              <Route
                path="/organization/settings"
                element={
                  <ProtectedDashboardLayout>
                    <PlaceholderPage
                      title="조직 설정"
                      description="조직의 설정을 관리하는 페이지입니다."
                    />
                  </ProtectedDashboardLayout>
                }
              />

              {/* Request Management Routes */}

              {/* Request List Page */}
              <Route
                path="/requests"
                element={
                  <ProtectedDashboardLayout>
                    <RequestListPageWrapper />
                  </ProtectedDashboardLayout>
                }
              />

              <Route
                path="/request/new"
                element={
                  <ProtectedDashboardLayout>
                    <NewRequestWizard />
                  </ProtectedDashboardLayout>
                }
              />

              <Route
                path="/request/my"
                element={
                  <ProtectedDashboardLayout>
                    <PlaceholderPage
                      title="내 요청"
                      description="내가 생성한 평판 요청 목록을 확인하는 페이지입니다."
                    />
                  </ProtectedDashboardLayout>
                }
              />

              <Route
                path="/request/:id/result"
                element={
                  <ProtectedDashboardLayout>
                    <PlaceholderPage
                      title="평판 요청 결과"
                      description="평판 요청의 결과를 확인하는 페이지입니다."
                    />
                  </ProtectedDashboardLayout>
                }
              />

              <Route
                path="/request/:id/result/detail"
                element={
                  <ProtectedDashboardLayout>
                    <PlaceholderPage
                      title="상세 결과"
                      description="평판 요청의 상세 결과를 확인하는 페이지입니다."
                    />
                  </ProtectedDashboardLayout>
                }
              />

              {/* Response & Consent Routes (Public) */}
              <Route
                path="/consent/:token"
                element={
                  <PublicLayout>
                    <PlaceholderPage
                      title="동의 확인"
                      description="평판 요청에 대한 동의를 확인하는 페이지입니다."
                    />
                  </PublicLayout>
                }
              />

              <Route
                path="/respond/:token"
                element={
                  <PublicLayout>
                    <PlaceholderPage
                      title="평판 응답"
                      description="평판 요청에 응답하는 페이지입니다."
                    />
                  </PublicLayout>
                }
              />

              {/* Additional utility routes */}
              <Route
                path="/forgot-password"
                element={
                  <PlaceholderPage
                    title="비밀번호 재설정"
                    description="비밀번호 재설정 페이지입니다."
                  />
                }
              />

              <Route
                path="/help"
                element={
                  <PublicLayout>
                    <PlaceholderPage
                      title="도움말"
                      description="ASK2 사용법과 자주 묻는 질문입니다."
                    />
                  </PublicLayout>
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
      </Router>
    </AuthProvider>
  );
}

export default App;
