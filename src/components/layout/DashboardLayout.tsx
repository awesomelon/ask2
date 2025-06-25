import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { PageContainer } from "./PageContainer";
import { cn } from "@/lib/utils";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  organization?: string;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
  user?: User;
  currentPath?: string;
  onNavigate?: (path: string) => void;
  onLogout?: () => void;
  sidebarCollapsed?: boolean;
  onSidebarToggle?: (collapsed: boolean) => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  className,
  user,
  currentPath: propCurrentPath,
  onNavigate,
  onLogout,
  sidebarCollapsed: controlledCollapsed,
  onSidebarToggle,
}) => {
  // Get current location from React Router
  const location = useLocation();
  const currentPath = propCurrentPath || location.pathname;

  // Internal state for sidebar if not controlled
  const [internalCollapsed, setInternalCollapsed] = useState(false);

  // Use controlled state if provided, otherwise use internal state
  const isCollapsed =
    controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;

  const handleSidebarToggle = () => {
    if (onSidebarToggle) {
      onSidebarToggle(!isCollapsed);
    } else {
      setInternalCollapsed(!isCollapsed);
    }
  };

  const handleNavigation = (path: string) => {
    onNavigate?.(path);
  };

  const handleLogout = () => {
    onLogout?.();
  };

  return (
    <div className={cn("min-h-screen bg-gray-50", className)}>
      {/* Header */}
      <Header
        user={user}
        currentPath={currentPath}
        onNavigate={handleNavigation}
        onLogout={handleLogout}
        className="fixed top-0 left-0 right-0 z-40"
      />

      {/* Main Layout Container */}
      <div className="flex pt-16">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed left-0 top-16 bottom-0 z-30 transition-all duration-300 ease-in-out",
            "border-r border-gray-200 bg-white",
            // Desktop behavior
            "hidden md:flex",
            isCollapsed ? "w-16" : "w-64"
          )}
        >
          <Sidebar
            isCollapsed={isCollapsed}
            currentPath={currentPath}
            onNavigate={handleNavigation}
            onToggle={handleSidebarToggle}
            className="h-full"
          />
        </aside>

        {/* Mobile Sidebar Overlay */}
        {!isCollapsed && (
          <div
            className="fixed inset-0 top-16 z-20 bg-black bg-opacity-50 md:hidden"
            onClick={handleSidebarToggle}
          />
        )}

        {/* Mobile Sidebar */}
        <aside
          className={cn(
            "fixed left-0 top-16 bottom-0 z-30 w-64 transition-transform duration-300 ease-in-out md:hidden",
            "border-r border-gray-200 bg-white",
            isCollapsed ? "-translate-x-full" : "translate-x-0"
          )}
        >
          <Sidebar
            isCollapsed={false}
            currentPath={currentPath}
            onNavigate={handleNavigation}
            onToggle={handleSidebarToggle}
            className="h-full"
          />
        </aside>

        {/* Main Content Area */}
        <main
          className={cn(
            "flex-1 transition-all duration-300 ease-in-out",
            // Desktop margin adjustments based on sidebar state
            "md:ml-0",
            !isCollapsed && "md:ml-64",
            isCollapsed && "md:ml-16"
          )}
        >
          {/* Content Container with proper padding */}
          <div className="min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

// Wrapper component that provides common dashboard page structure
export const DashboardPage: React.FC<{
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
  maxWidth?: React.ComponentProps<typeof PageContainer>["maxWidth"];
}> = ({ children, title, subtitle, action, className, maxWidth = "7xl" }) => {
  return (
    <PageContainer maxWidth={maxWidth} padding="lg" className={className}>
      {/* Page Header */}
      {(title || subtitle || action) && (
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              {title && (
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  {title}
                </h1>
              )}
              {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
            </div>
            {action && (
              <div className="flex items-center space-x-4">{action}</div>
            )}
          </div>
        </div>
      )}

      {/* Page Content */}
      {children}
    </PageContainer>
  );
};

// Utility hook for managing dashboard layout state
export const useDashboardLayout = (initialCollapsed = false) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(initialCollapsed);
  const [currentPath, setCurrentPath] = useState("/dashboard");

  const handleNavigation = (path: string) => {
    setCurrentPath(path);
    // Here you would typically use your router's navigation method
    // For example: router.push(path) or navigate(path)
  };

  const handleSidebarToggle = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  };

  return {
    sidebarCollapsed,
    currentPath,
    handleNavigation,
    handleSidebarToggle,
    setSidebarCollapsed,
    setCurrentPath,
  };
};
