import React from "react";
import {
  Home,
  Inbox,
  UserPlus,
  BarChart3,
  Settings,
  HelpCircle,
  ChevronRight,
  Building2,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useInbox } from "@/hooks/useInbox";

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  badge?: number;
  children?: SidebarItem[];
}

interface SidebarProps {
  className?: string;
  isCollapsed?: boolean;
  currentPath?: string;
  onNavigate?: (path: string) => void;
  onToggle?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  className,
  isCollapsed = false,
  currentPath = "/dashboard",
  onNavigate,
  onToggle,
}) => {
  // 수신함 데이터 가져오기
  const { stats } = useInbox();

  // 부모 메뉴인지 확인하는 함수
  const isParentMenu = (item: Omit<SidebarItem, "active">) => {
    return item.children && item.children.length > 0;
  };

  // 현재 경로에 따라 활성화 상태 계산 함수
  const isItemActive = (item: Omit<SidebarItem, "active">) => {
    // 정확한 경로 매칭
    if (currentPath === item.path) {
      return true;
    }

    // 부모 메뉴의 경우: 하위 메뉴 중 하나가 활성화되면 부모도 활성화
    if (isParentMenu(item)) {
      return item.children!.some((child) => currentPath === child.path);
    }

    return false;
  };

  const sidebarItems: SidebarItem[] = [
    {
      id: "dashboard",
      label: "대시보드",
      icon: <Home className="h-5 w-5" />,
      path: "/dashboard",
    },
    {
      id: "inbox",
      label: "수신함",
      icon: <Inbox className="h-5 w-5" />,
      path: "/inbox",
      badge: stats.pending > 0 ? stats.pending : undefined,
    },
    {
      id: "requests",
      label: "평판 요청",
      icon: <UserPlus className="h-5 w-5" />,
      path: "/requests",
    },
    {
      id: "analytics",
      label: "분석 리포트",
      icon: <BarChart3 className="h-5 w-5" />,
      path: "/analytics",
    },
    {
      id: "organization",
      label: "조직 관리",
      icon: <Building2 className="h-5 w-5" />,
      path: "/organization",
      children: [
        {
          id: "members",
          label: "구성원",
          icon: <Users className="h-4 w-4" />,
          path: "/organization/members",
        },
        {
          id: "settings-org",
          label: "조직 설정",
          icon: <Settings className="h-4 w-4" />,
          path: "/organization/settings",
        },
      ],
    },
  ];

  const bottomItems: SidebarItem[] = [
    {
      id: "help",
      label: "도움말",
      icon: <HelpCircle className="h-5 w-5" />,
      path: "/help",
    },
    {
      id: "settings",
      label: "설정",
      icon: <Settings className="h-5 w-5" />,
      path: "/settings",
    },
  ];

  const handleItemClick = (item: SidebarItem) => {
    onNavigate?.(item.path);
  };

  // 부모 메뉴가 확장되어야 하는지 확인하는 함수
  const shouldExpandParent = (item: SidebarItem) => {
    if (!item.children || item.children.length === 0) return false;

    // 부모 자체가 활성화되었거나, 하위 메뉴 중 하나가 활성화된 경우 확장
    return (
      isItemActive(item) || item.children.some((child) => isItemActive(child))
    );
  };

  const renderSidebarItem = (item: SidebarItem, isChild = false) => {
    const isActive = isItemActive(item);
    const hasChildren = item.children && item.children.length > 0;
    const shouldExpand = shouldExpandParent(item);

    return (
      <div key={item.id}>
        <button
          onClick={() => handleItemClick(item)}
          className={cn(
            "group flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            isChild && "ml-2 mr-4 px-2",
            isActive
              ? "bg-primary text-white"
              : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
            isCollapsed && !isChild && "justify-center px-4"
          )}
        >
          {item.icon && (
            <span className={cn("flex-shrink-0", isChild && "ml-1")}>
              {item.icon}
            </span>
          )}

          {!isCollapsed && (
            <>
              <span
                className={cn(
                  "flex-1 text-left",
                  item.icon ? "ml-3" : isChild ? "ml-2" : "ml-3"
                )}
              >
                {item.label}
              </span>
              {item.badge && (
                <span
                  className={cn(
                    "ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium",
                    isActive
                      ? "bg-white text-primary"
                      : "bg-gray-200 text-gray-700 group-hover:bg-gray-300"
                  )}
                >
                  {item.badge}
                </span>
              )}
              {hasChildren && !isChild && (
                <ChevronRight
                  className={cn(
                    "ml-2 h-4 w-4 transition-transform",
                    shouldExpand && "rotate-90"
                  )}
                />
              )}
            </>
          )}
        </button>

        {/* Render children if expanded and has children */}
        {!isCollapsed && hasChildren && shouldExpand && (
          <div className="mt-1 space-y-1">
            {item.children?.map((child) => renderSidebarItem(child, true))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={cn(
        "flex h-full flex-col border-r border-gray-200 bg-white overflow-hidden",
        isCollapsed ? "w-16" : "w-64",
        className
      )}
    >
      {/* Main Navigation */}
      <div className="flex-1 space-y-1 px-2 py-4">
        <nav className="space-y-1">
          {sidebarItems.map((item) => renderSidebarItem(item))}
        </nav>
      </div>

      {/* Bottom Navigation */}
      <div className="border-t border-gray-200 p-2">
        <nav className="space-y-1">
          {bottomItems.map((item) => renderSidebarItem(item))}
        </nav>
      </div>

      {/* Collapse/Expand Toggle (Desktop only) */}
      <div className="border-t border-gray-200 p-2">
        <button
          onClick={onToggle}
          className={cn(
            "group flex w-full items-center rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors",
            isCollapsed ? "justify-center px-4 py-2" : "px-3 py-2"
          )}
          title={isCollapsed ? "사이드바 펼치기" : "사이드바 접기"}
        >
          <ChevronRight
            className={cn(
              "h-5 w-5 transition-transform",
              isCollapsed ? "" : "rotate-180"
            )}
          />
          {!isCollapsed && (
            <span className="ml-3 flex-1 text-left">사이드바 접기</span>
          )}
        </button>
      </div>
    </div>
  );
};
