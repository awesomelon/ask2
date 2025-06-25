import React, { useState, useRef, useEffect } from "react";
import {
  Menu,
  X,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Bell,
} from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  organization?: string;
}

interface HeaderProps {
  className?: string;
  user?: User;
  currentPath?: string;
  onLogout?: () => void;
  onNavigate?: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  className,
  user,
  currentPath = "/dashboard",
  onLogout,
  onNavigate,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 상단 네비게이션 링크 제거 - 사이드바에서 모든 네비게이션 처리

  const handleNavigation = (path: string) => {
    onNavigate?.(path);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border bg-white shadow-sm",
        className
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleNavigation("/dashboard")}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-white font-bold text-sm">
              A2
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">
              ASK2
            </span>
          </div>
        </div>

        {/* 상단 네비게이션 링크 제거됨 - 사이드바에서 모든 네비게이션 처리 */}

        {/* Right Section - User Menu & Mobile Menu Toggle */}
        <div className="flex items-center space-x-4">
          {/* Notifications - Desktop only */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:flex relative"
            onClick={() => handleNavigation("/notifications")}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
          </Button>

          {/* User Menu - Desktop */}
          {user && (
            <div className="relative hidden sm:block" ref={userMenuRef}>
              <button
                onClick={toggleUserMenu}
                className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 transition-colors"
              >
                <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-4 w-4 text-gray-600" />
                  )}
                </div>
                <div className="hidden lg:block text-left">
                  <div className="font-medium text-gray-900">{user.name}</div>
                  <div className="text-xs text-gray-500">
                    {user.organization}
                  </div>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-gray-500">{user.email}</div>
                  </div>
                  <button
                    onClick={() => handleNavigation("/settings")}
                    className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Settings className="mr-3 h-4 w-4" />
                    설정
                  </button>
                  <button
                    onClick={onLogout}
                    className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    로그아웃
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMobileMenu}
            aria-label="메뉴 열기"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu - 사용자 메뉴만 표시 */}
      {isMobileMenuOpen && user && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 pb-3 pt-2">
            <div className="flex items-center px-3 py-2">
              <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <User className="h-5 w-5 text-gray-600" />
                )}
              </div>
              <div className="ml-3">
                <div className="font-medium text-gray-900">{user.name}</div>
                <div className="text-sm text-gray-500">{user.email}</div>
              </div>
            </div>
            <button
              onClick={() => handleNavigation("/notifications")}
              className="flex w-full items-center px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            >
              <Bell className="mr-3 h-5 w-5" />
              알림
            </button>
            <button
              onClick={() => handleNavigation("/settings")}
              className="flex w-full items-center px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            >
              <Settings className="mr-3 h-5 w-5" />
              설정
            </button>
            <button
              onClick={onLogout}
              className="flex w-full items-center px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            >
              <LogOut className="mr-3 h-5 w-5" />
              로그아웃
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
