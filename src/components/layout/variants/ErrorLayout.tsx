import React from "react";
import { MainLayout } from "../MainLayout";

interface ErrorLayoutProps {
  children: React.ReactNode;
}

export const ErrorLayout: React.FC<ErrorLayoutProps> = ({ children }) => {
  return (
    <MainLayout showFooter={false}>
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg w-full text-center">{children}</div>
      </div>
    </MainLayout>
  );
};
