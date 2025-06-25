import React from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { cn } from "@/lib/utils";
import type { User } from "@/contexts/AuthContext"; // Assuming User type is defined here

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
  user?: User | null; // Allow null for user
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
  onLogout,
  showHeader = true,
  showFooter = true,
  headerClassName,
  footerClassName,
  contentClassName,
}) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
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
