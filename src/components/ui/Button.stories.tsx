import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import { Mail, Download, Plus } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
    },
    size: {
      control: { type: "select" },
      options: ["default", "sm", "lg", "icon"],
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 버튼
export const Default: Story = {
  args: {
    children: "기본 버튼",
  },
};

// 다양한 variants
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

// 다양한 sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  ),
};

// 아이콘과 함께
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Button>
        <Mail className="mr-2 h-4 w-4" />
        이메일 보내기
      </Button>
      <Button variant="outline">
        <Download className="mr-2 h-4 w-4" />
        다운로드
      </Button>
      <Button variant="secondary" size="sm">
        <Plus className="mr-2 h-4 w-4" />
        추가
      </Button>
    </div>
  ),
};

// 비활성화 상태
export const Disabled: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button disabled>기본 (비활성화)</Button>
      <Button variant="outline" disabled>
        아웃라인 (비활성화)
      </Button>
      <Button variant="secondary" disabled>
        세컨더리 (비활성화)
      </Button>
    </div>
  ),
};

// 로딩 상태
export const Loading: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button disabled>
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        로딩 중...
      </Button>
      <Button variant="outline" disabled>
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-600 border-t-transparent" />
        처리 중...
      </Button>
    </div>
  ),
};
