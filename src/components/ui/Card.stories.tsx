import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { Button } from "./button";
import { Badge } from "./badge";
import { Progress } from "./progress";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 카드
export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>기본 카드</CardTitle>
        <CardDescription>간단한 카드 예시입니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>카드 본문 내용이 들어갑니다.</p>
      </CardContent>
    </Card>
  ),
};

// 헤더, 본문, 푸터가 모두 있는 카드
export const Complete: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>완성된 카드</CardTitle>
        <CardDescription>모든 요소가 포함된 카드입니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">
          이 카드에는 헤더, 본문, 푸터가 모두 포함되어 있습니다.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">취소</Button>
        <Button>확인</Button>
      </CardFooter>
    </Card>
  ),
};

// 통계 카드
export const StatsCard: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">총 요청</CardTitle>
          <Badge variant="secondary">+12%</Badge>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">245</div>
          <p className="text-xs text-muted-foreground">지난달 대비 +20.1%</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">완료율</CardTitle>
          <Badge variant="default">+5%</Badge>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">89.2%</div>
          <p className="text-xs text-muted-foreground">목표: 90%</p>
          <Progress value={89.2} className="mt-2" />
        </CardContent>
      </Card>
    </div>
  ),
};

// 평판 요청 카드
export const ReferenceRequestCard: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">김철수</CardTitle>
          <Badge variant="outline">진행중</Badge>
        </div>
        <CardDescription>시니어 백엔드 개발자</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">요청일:</span>
          <span>2025-06-10</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">응답률:</span>
          <span className="font-medium">2/4 (50%)</span>
        </div>
        <Progress value={50} className="w-full" />
        <div className="flex flex-wrap gap-1">
          <Badge variant="default" className="text-xs">
            React
          </Badge>
          <Badge variant="default" className="text-xs">
            Node.js
          </Badge>
          <Badge variant="default" className="text-xs">
            팀 리더십
          </Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">상세 보기</Button>
      </CardFooter>
    </Card>
  ),
};

// 수신함 아이템 카드
export const InboxItemCard: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">정수진</CardTitle>
            <CardDescription>UX/UI 디자이너</CardDescription>
          </div>
          <Badge variant="secondary">대기중</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-sm text-gray-600">
          <span className="font-medium">요청 회사:</span> 테크스타트업
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-medium">마감일:</span> 2025-07-15
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-medium">우선순위:</span>
          <Badge variant="destructive" className="ml-2 text-xs">
            높음
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" className="flex-1">
          거절
        </Button>
        <Button className="flex-1">응답하기</Button>
      </CardFooter>
    </Card>
  ),
};

// 다양한 크기
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Card className="w-64">
        <CardHeader>
          <CardTitle className="text-sm">작은 카드</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs">작은 크기의 카드입니다.</p>
        </CardContent>
      </Card>

      <Card className="w-96">
        <CardHeader>
          <CardTitle>중간 카드</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">중간 크기의 카드입니다.</p>
        </CardContent>
      </Card>

      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle className="text-lg">큰 카드</CardTitle>
        </CardHeader>
        <CardContent>
          <p>큰 크기의 카드입니다. 더 많은 내용을 담을 수 있습니다.</p>
        </CardContent>
      </Card>
    </div>
  ),
};
