import React from "react";
import { MainLayout } from "../MainLayout";
import type { User } from "@/contexts/AuthContext";

interface LandingLayoutProps {
  children: React.ReactNode;
  user?: User | null;
  onLogout?: () => void;
}

export const LandingLayout: React.FC<LandingLayoutProps> = ({
  children,
  user,
  onLogout,
}) => {
  return (
    <MainLayout
      user={user}
      onLogout={onLogout}
      className="bg-gray-50"
      contentClassName="bg-white"
    >
      {children}
    </MainLayout>
  );
};
