import React from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "../MainLayout";
import { PageContainer } from "../PageContainer";
import type { User } from "@/contexts/AuthContext";

interface PublicPageLayoutProps {
  children: React.ReactNode;
  user?: User | null;
  onLogout?: () => void;
  title?: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href: string }[];
  maxWidth?: React.ComponentProps<typeof PageContainer>["maxWidth"];
}

export const PublicPageLayout: React.FC<PublicPageLayoutProps> = ({
  children,
  user,
  onLogout,
  title,
  subtitle,
  breadcrumbs,
  maxWidth = "6xl",
}) => {
  const navigate = useNavigate();

  return (
    <MainLayout user={user} onLogout={onLogout}>
      <PageContainer maxWidth={maxWidth} padding="lg">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.href} className="flex items-center">
                  {index > 0 && <span className="mr-2 text-gray-400">/</span>}
                  <button
                    onClick={() => navigate(crumb.href)}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {crumb.label}
                  </button>
                </li>
              ))}
            </ol>
          </nav>
        )}
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
        {children}
      </PageContainer>
    </MainLayout>
  );
};
