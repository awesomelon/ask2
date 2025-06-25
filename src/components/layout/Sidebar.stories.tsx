import type { Meta, StoryObj } from "@storybook/react";
import { Sidebar } from "./Sidebar";
import { useState } from "react";

const meta: Meta<typeof Sidebar> = {
  title: "Layout/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="h-screen bg-gray-50">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 사이드바
export const Default: Story = {
  args: {
    currentPath: "/dashboard",
    isCollapsed: false,
  },
};

// 접힌 사이드바
export const Collapsed: Story = {
  args: {
    currentPath: "/dashboard",
    isCollapsed: true,
  },
};

// 다양한 페이지에서의 활성화 상태
export const DashboardActive: Story = {
  args: {
    currentPath: "/dashboard",
    isCollapsed: false,
  },
};

export const InboxActive: Story = {
  args: {
    currentPath: "/inbox",
    isCollapsed: false,
  },
};

export const RequestsActive: Story = {
  args: {
    currentPath: "/requests",
    isCollapsed: false,
  },
};

export const NewRequestActive: Story = {
  args: {
    currentPath: "/request/new",
    isCollapsed: false,
  },
};

export const OrganizationActive: Story = {
  args: {
    currentPath: "/organization/members",
    isCollapsed: false,
  },
};

// 인터랙티브 사이드바 (토글 기능)
export const Interactive: Story = {
  render: () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [currentPath, setCurrentPath] = useState("/dashboard");

    return (
      <div className="flex">
        <Sidebar
          currentPath={currentPath}
          isCollapsed={isCollapsed}
          onToggle={() => setIsCollapsed(!isCollapsed)}
          onNavigate={(path) => setCurrentPath(path)}
        />
        <div className="flex-1 p-6 bg-white">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">인터랙티브 사이드바</h2>
            <p className="text-gray-600">
              사이드바의 메뉴를 클릭하거나 하단의 접기/펼치기 버튼을
              사용해보세요.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p>
                <strong>현재 경로:</strong> {currentPath}
              </p>
              <p>
                <strong>접힘 상태:</strong>{" "}
                {isCollapsed ? "접혀있음" : "펼쳐있음"}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">빠른 테스트:</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setCurrentPath("/dashboard")}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm"
                >
                  대시보드
                </button>
                <button
                  onClick={() => setCurrentPath("/inbox")}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm"
                >
                  수신함
                </button>
                <button
                  onClick={() => setCurrentPath("/requests")}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm"
                >
                  평판 요청
                </button>
                <button
                  onClick={() => setCurrentPath("/request/new")}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm"
                >
                  새 요청
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    layout: "fullscreen",
  },
};

// 수신함 배지 없음 (목업 데이터 없는 상태)
export const WithoutInboxBadge: Story = {
  render: () => (
    <div style={{ height: "600px" }}>
      <Sidebar currentPath="/dashboard" isCollapsed={false} />
      <div className="ml-64 p-4 bg-yellow-50 text-yellow-800 text-sm">
        ⚠️ 이 스토리에서는 수신함 배지가 표시되지 않을 수 있습니다. 실제
        앱에서는 useInbox 훅의 데이터에 따라 동적으로 표시됩니다.
      </div>
    </div>
  ),
};

// 모바일 뷰 (좁은 화면)
export const Mobile: Story = {
  args: {
    currentPath: "/dashboard",
    isCollapsed: false,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  decorators: [
    (Story) => (
      <div className="h-screen bg-gray-50 relative">
        <Story />
        <div className="absolute top-4 left-4 bg-blue-100 text-blue-800 p-2 rounded text-xs max-w-xs">
          📱 모바일에서는 사이드바가 오버레이로 표시되어야 합니다.
        </div>
      </div>
    ),
  ],
};
