import React from "react";
import { MainLayout } from "../MainLayout";
import { PageContainer } from "../PageContainer";
import type { User } from "@/contexts/AuthContext";

interface DocsLayoutProps {
  children: React.ReactNode;
  user?: User | null;
  onLogout?: () => void;
  title?: string;
  subtitle?: string;
}

export const DocsLayout: React.FC<DocsLayoutProps> = ({
  children,
  user,
  onLogout,
  title,
  subtitle,
}) => {
  return (
    <MainLayout user={user} onLogout={onLogout}>
      <PageContainer maxWidth="4xl" padding="lg">
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
        <div className="prose prose-lg max-w-none">{children}</div>
      </PageContainer>
    </MainLayout>
  );
};
