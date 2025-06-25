import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "./Header";
import { BrowserRouter } from "react-router-dom";

const meta: Meta<typeof Header> = {
  title: "Layout/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 헤더
export const Default: Story = {
  args: {
    currentPath: "/dashboard",
  },
};

// 다양한 페이지에서의 헤더
export const DashboardPage: Story = {
  args: {
    currentPath: "/dashboard",
  },
};

export const InboxPage: Story = {
  args: {
    currentPath: "/inbox",
  },
};

export const RequestsPage: Story = {
  args: {
    currentPath: "/requests",
  },
};

// 알림이 있는 상태
export const WithNotifications: Story = {
  args: {
    currentPath: "/dashboard",
  },
  render: (args) => (
    <div>
      <Header {...args} />
      <div className="bg-yellow-50 p-4 text-sm text-yellow-800">
        💡 이 스토리에서는 헤더의 알림 아이콘에 빨간 점이 표시됩니다. 실제
        구현에서는 알림 개수나 상태에 따라 동적으로 표시됩니다.
      </div>
    </div>
  ),
};

// 모바일 뷰
export const Mobile: Story = {
  args: {
    currentPath: "/dashboard",
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  render: (args) => (
    <div>
      <Header {...args} />
      <div className="bg-blue-50 p-4 text-sm text-blue-800 md:hidden">
        📱 모바일 뷰에서는 햄버거 메뉴가 표시됩니다.
      </div>
    </div>
  ),
};

// 다크 배경에서
export const OnDarkBackground: Story = {
  args: {
    currentPath: "/dashboard",
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div className="bg-gray-900 min-h-screen">
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
};
