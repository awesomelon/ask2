import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Spinner } from "@/components/ui/spinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "member" | "viewer";
  fallbackPath?: string;
  showLoader?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  fallbackPath = "/login",
  showLoader = true,
}) => {
  const { isAuthenticated, isLoading, hasRole, user } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (isLoading) {
    if (!showLoader) return null;

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-sm text-gray-600">
            인증 상태를 확인하는 중...
          </p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    // Save the attempted location for redirect after login
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  // Check role-based access if required role is specified
  if (requiredRole && !hasRole(requiredRole)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            접근 권한이 없습니다
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            이 페이지에 접근하려면{" "}
            <span className="font-medium">{requiredRole}</span> 권한이
            필요합니다.
            {user && (
              <span className="block mt-1">
                현재 권한:{" "}
                <span className="font-medium">{user.role || "viewer"}</span>
              </span>
            )}
          </p>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            이전 페이지로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  // Render children if authenticated and has required role
  return <>{children}</>;
};

// Higher-order component version for easier usage
export const withProtectedRoute = <P extends object>(
  Component: React.ComponentType<P>,
  options?: Omit<ProtectedRouteProps, "children">
) => {
  const WrappedComponent = (props: P) => (
    <ProtectedRoute {...options}>
      <Component {...props} />
    </ProtectedRoute>
  );

  WrappedComponent.displayName = `withProtectedRoute(${
    Component.displayName || Component.name
  })`;

  return WrappedComponent;
};

// Role-specific protected route components for convenience
export const AdminRoute: React.FC<Omit<ProtectedRouteProps, "requiredRole">> = (
  props
) => <ProtectedRoute {...props} requiredRole="admin" />;

export const MemberRoute: React.FC<
  Omit<ProtectedRouteProps, "requiredRole">
> = (props) => <ProtectedRoute {...props} requiredRole="member" />;

export const ViewerRoute: React.FC<
  Omit<ProtectedRouteProps, "requiredRole">
> = (props) => <ProtectedRoute {...props} requiredRole="viewer" />;

export default ProtectedRoute;
