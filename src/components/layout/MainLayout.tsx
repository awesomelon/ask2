import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { PageContainer } from "./PageContainer";
import { cn } from "@/lib/utils";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  organization?: string;
}

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
  user?: User;
  onNavigate?: (path: string) => void;
  onLogout?: () => void;
  showHeader?: boolean;
  showFooter?: boolean;
  headerClassName?: string;
  footerClassName?: string;
  contentClassName?: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  className,
  user,
  onNavigate,
  onLogout,
  showHeader = true,
  showFooter = true,
  headerClassName,
  footerClassName,
  contentClassName,
}) => {
  const handleNavigation = (path: string) => {
    onNavigate?.(path);
  };

  const handleLogout = () => {
    onLogout?.();
  };

  return (
    <div className={cn("min-h-screen flex flex-col bg-white", className)}>
      {/* Header */}
      {showHeader && (
        <Header
          user={user}
          onNavigate={handleNavigation}
          onLogout={handleLogout}
          className={headerClassName}
        />
      )}

      {/* Main Content Area */}
      <main
        className={cn(
          "flex-1 flex flex-col",
          showHeader && "pt-0", // No extra padding if header is shown (header handles its own height)
          contentClassName
        )}
      >
        {children}
      </main>

      {/* Footer */}
      {showFooter && (
        <Footer onNavigate={handleNavigation} className={footerClassName} />
      )}
    </div>
  );
};

// Pre-configured layout variants for common use cases

// Landing page layout with full-width hero sections
export const LandingLayout: React.FC<{
  children: React.ReactNode;
  user?: User;
  onNavigate?: (path: string) => void;
  onLogout?: () => void;
}> = ({ children, user, onNavigate, onLogout }) => {
  return (
    <MainLayout
      user={user}
      onNavigate={onNavigate}
      onLogout={onLogout}
      className="bg-gray-50"
      contentClassName="bg-white"
    >
      {children}
    </MainLayout>
  );
};

// Auth pages layout (login, signup) with centered content
export const AuthLayout: React.FC<{
  children: React.ReactNode;
  onNavigate?: (path: string) => void;
}> = ({ children, onNavigate }) => {
  return (
    <MainLayout
      onNavigate={onNavigate}
      showFooter={false}
      className="bg-gray-50"
    >
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">{children}</div>
      </div>
    </MainLayout>
  );
};

// Documentation/Help pages layout with constrained width
export const DocsLayout: React.FC<{
  children: React.ReactNode;
  user?: User;
  onNavigate?: (path: string) => void;
  onLogout?: () => void;
  title?: string;
  subtitle?: string;
}> = ({ children, user, onNavigate, onLogout, title, subtitle }) => {
  return (
    <MainLayout user={user} onNavigate={onNavigate} onLogout={onLogout}>
      <PageContainer maxWidth="4xl" padding="lg">
        {/* Page Header */}
        {(title || subtitle) && (
          <div className="mb-12 text-center">
            {title && (
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none">{children}</div>
      </PageContainer>
    </MainLayout>
  );
};

// Error pages layout (404, 500) with centered content
export const ErrorLayout: React.FC<{
  children: React.ReactNode;
  onNavigate?: (path: string) => void;
}> = ({ children, onNavigate }) => {
  return (
    <MainLayout onNavigate={onNavigate} showFooter={false}>
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg w-full text-center">{children}</div>
      </div>
    </MainLayout>
  );
};

// Public pages layout (about, contact, etc.) with standard padding
export const PublicPageLayout: React.FC<{
  children: React.ReactNode;
  user?: User;
  onNavigate?: (path: string) => void;
  onLogout?: () => void;
  title?: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href: string }[];
  maxWidth?: React.ComponentProps<typeof PageContainer>["maxWidth"];
}> = ({
  children,
  user,
  onNavigate,
  onLogout,
  title,
  subtitle,
  breadcrumbs,
  maxWidth = "6xl",
}) => {
  return (
    <MainLayout user={user} onNavigate={onNavigate} onLogout={onLogout}>
      <PageContainer maxWidth={maxWidth} padding="lg">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.href} className="flex items-center">
                  {index > 0 && <span className="mr-2 text-gray-400">/</span>}
                  <button
                    onClick={() => onNavigate?.(crumb.href)}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {crumb.label}
                  </button>
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Page Header */}
        {(title || subtitle) && (
          <div className="mb-12">
            {title && (
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="mt-4 text-lg text-gray-600">{subtitle}</p>
            )}
          </div>
        )}

        {/* Content */}
        {children}
      </PageContainer>
    </MainLayout>
  );
};
