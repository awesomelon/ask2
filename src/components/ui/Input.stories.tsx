import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";
import { Button } from "./button";
import { Mail, Search, Eye, EyeOff, User, Phone } from "lucide-react";
import { useState } from "react";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["text", "email", "password", "number", "tel", "url"],
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 입력 필드
export const Default: Story = {
  args: {
    placeholder: "텍스트를 입력하세요",
  },
};

// 다양한 타입들
export const Types: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <label className="block text-sm font-medium mb-1">이메일</label>
        <Input type="email" placeholder="이메일을 입력하세요" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">비밀번호</label>
        <Input type="password" placeholder="비밀번호를 입력하세요" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">전화번호</label>
        <Input type="tel" placeholder="010-1234-5678" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">숫자</label>
        <Input type="number" placeholder="숫자를 입력하세요" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">웹사이트</label>
        <Input type="url" placeholder="https://example.com" />
      </div>
    </div>
  ),
};

// 상태별 입력 필드
export const States: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <label className="block text-sm font-medium mb-1">기본 상태</label>
        <Input placeholder="기본 입력 필드" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">값이 있는 상태</label>
        <Input defaultValue="입력된 값" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">비활성화 상태</label>
        <Input placeholder="비활성화된 필드" disabled />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          값이 있고 비활성화
        </label>
        <Input defaultValue="읽기 전용 값" disabled />
      </div>
    </div>
  ),
};

// 아이콘과 함께
export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <label className="block text-sm font-medium mb-1">검색</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="검색어를 입력하세요" className="pl-10" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">이메일</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input type="email" placeholder="이메일 주소" className="pl-10" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">사용자명</label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="사용자명" className="pl-10" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">전화번호</label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input type="tel" placeholder="010-1234-5678" className="pl-10" />
        </div>
      </div>
    </div>
  ),
};

// 비밀번호 보기/숨기기
export const PasswordToggle: Story = {
  render: () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="w-80">
        <label className="block text-sm font-medium mb-1">비밀번호</label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호를 입력하세요"
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        <p className="mt-1 text-xs text-gray-500">
          👁️ 눈 아이콘을 클릭하여 비밀번호를 표시/숨김할 수 있습니다.
        </p>
      </div>
    );
  },
};

// 버튼과 함께
export const WithButton: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <label className="block text-sm font-medium mb-1">검색</label>
        <div className="flex gap-2">
          <Input placeholder="검색어 입력" />
          <Button type="button">검색</Button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">이메일 구독</label>
        <div className="flex gap-2">
          <Input type="email" placeholder="이메일 주소" />
          <Button type="button">구독</Button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">쿠폰 코드</label>
        <div className="flex gap-2">
          <Input placeholder="쿠폰 코드 입력" />
          <Button variant="outline" type="button">
            적용
          </Button>
        </div>
      </div>
    </div>
  ),
};

// 유효성 검사 상태
export const Validation: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <label className="block text-sm font-medium mb-1">올바른 입력</label>
        <Input
          defaultValue="valid@example.com"
          className="border-green-300 focus:border-green-500 focus:ring-green-200"
        />
        <p className="mt-1 text-xs text-green-600">
          ✓ 올바른 이메일 형식입니다.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">오류 입력</label>
        <Input
          defaultValue="invalid-email"
          className="border-red-300 focus:border-red-500 focus:ring-red-200"
        />
        <p className="mt-1 text-xs text-red-600">
          ✗ 올바른 이메일 형식이 아닙니다.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">경고 입력</label>
        <Input
          defaultValue="test@example.com"
          className="border-yellow-300 focus:border-yellow-500 focus:ring-yellow-200"
        />
        <p className="mt-1 text-xs text-yellow-600">
          ⚠ 이 도메인은 테스트용입니다.
        </p>
      </div>
    </div>
  ),
};

// 실제 사용 예시 (폼)
export const FormExample: Story = {
  render: () => (
    <div className="w-80 p-6 border rounded-lg bg-white">
      <h3 className="text-lg font-semibold mb-4">회원 정보 입력</h3>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">이름 *</label>
          <Input placeholder="홍길동" required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">이메일 *</label>
          <Input type="email" placeholder="hong@example.com" required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">전화번호</label>
          <Input type="tel" placeholder="010-1234-5678" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">비밀번호 *</label>
          <Input type="password" placeholder="8자 이상 입력" required />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            회사 웹사이트
          </label>
          <Input type="url" placeholder="https://company.com" />
        </div>

        <div className="flex gap-2 pt-2">
          <Button type="submit" className="flex-1">
            가입하기
          </Button>
          <Button type="button" variant="outline" className="flex-1">
            취소
          </Button>
        </div>
      </form>
    </div>
  ),
};

// 다양한 크기
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <label className="block text-sm font-medium mb-1">작은 크기</label>
        <Input placeholder="작은 입력 필드" className="h-8 text-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">기본 크기</label>
        <Input placeholder="기본 입력 필드" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">큰 크기</label>
        <Input placeholder="큰 입력 필드" className="h-12 text-lg" />
      </div>
    </div>
  ),
};
