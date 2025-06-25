import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./badge";

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "secondary", "destructive", "outline"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 배지
export const Default: Story = {
  args: {
    children: "기본 배지",
  },
};

// 다양한 variants
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};

// 상태 배지들
export const StatusBadges: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="mb-2 text-sm font-medium">평판 요청 상태:</h4>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">대기중</Badge>
          <Badge variant="default">진행중</Badge>
          <Badge variant="outline">완료</Badge>
          <Badge variant="destructive">취소</Badge>
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-medium">응답 상태:</h4>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">미응답</Badge>
          <Badge variant="default">응답완료</Badge>
          <Badge variant="destructive">거절</Badge>
          <Badge variant="outline">만료</Badge>
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-medium">우선순위:</h4>
        <div className="flex flex-wrap gap-2">
          <Badge variant="destructive">높음</Badge>
          <Badge variant="default">보통</Badge>
          <Badge variant="secondary">낮음</Badge>
        </div>
      </div>
    </div>
  ),
};

// 기술 스택 배지
export const TechStackBadges: Story = {
  render: () => (
    <div className="space-y-3">
      <div>
        <h4 className="mb-2 text-sm font-medium">프론트엔드:</h4>
        <div className="flex flex-wrap gap-1">
          <Badge variant="outline" className="text-xs">
            React
          </Badge>
          <Badge variant="outline" className="text-xs">
            TypeScript
          </Badge>
          <Badge variant="outline" className="text-xs">
            Tailwind CSS
          </Badge>
          <Badge variant="outline" className="text-xs">
            Vite
          </Badge>
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-medium">백엔드:</h4>
        <div className="flex flex-wrap gap-1">
          <Badge variant="outline" className="text-xs">
            Node.js
          </Badge>
          <Badge variant="outline" className="text-xs">
            Express
          </Badge>
          <Badge variant="outline" className="text-xs">
            PostgreSQL
          </Badge>
          <Badge variant="outline" className="text-xs">
            Redis
          </Badge>
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-medium">DevOps:</h4>
        <div className="flex flex-wrap gap-1">
          <Badge variant="outline" className="text-xs">
            AWS
          </Badge>
          <Badge variant="outline" className="text-xs">
            Docker
          </Badge>
          <Badge variant="outline" className="text-xs">
            CI/CD
          </Badge>
          <Badge variant="outline" className="text-xs">
            Kubernetes
          </Badge>
        </div>
      </div>
    </div>
  ),
};

// 카운트가 있는 배지
export const WithCounts: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">새 메시지 3</Badge>
      <Badge variant="destructive">오류 12</Badge>
      <Badge variant="secondary">대기중 5</Badge>
      <Badge variant="outline">완료 28</Badge>
    </div>
  ),
};

// 다양한 크기
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge className="text-xs px-2 py-0.5">작은 배지</Badge>
      <Badge>기본 배지</Badge>
      <Badge className="text-base px-3 py-1">큰 배지</Badge>
    </div>
  ),
};

// 인터랙티브 배지 (클릭 가능)
export const Interactive: Story = {
  render: () => (
    <div className="space-y-3">
      <div>
        <h4 className="mb-2 text-sm font-medium">클릭 가능한 필터 배지:</h4>
        <div className="flex flex-wrap gap-2">
          <Badge
            variant="outline"
            className="cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={() => alert("전체 필터 클릭!")}
          >
            전체
          </Badge>
          <Badge
            variant="default"
            className="cursor-pointer hover:bg-blue-600 transition-colors"
            onClick={() => alert("진행중 필터 클릭!")}
          >
            진행중
          </Badge>
          <Badge
            variant="secondary"
            className="cursor-pointer hover:bg-gray-300 transition-colors"
            onClick={() => alert("대기중 필터 클릭!")}
          >
            대기중
          </Badge>
        </div>
      </div>

      <div className="text-xs text-gray-500">💡 배지를 클릭해보세요!</div>
    </div>
  ),
};
