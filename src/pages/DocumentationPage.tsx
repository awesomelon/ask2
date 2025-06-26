import { useState } from "react";
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Badge,
  Progress,
  Alert,
  AlertTitle,
  AlertDescription,
  TooltipProvider,
  Spinner,
} from "../components/ui";

export function DocumentationPage() {
  const [progress, setProgress] = useState(33);

  const handleProgressUpdate = () => {
    const newProgress =
      progress >= 100 ? 0 : progress + 20 > 100 ? 100 : progress + 20;
    setProgress(newProgress);
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              ASK2 UI Component Library
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              완전한 접근성 지원과 TypeScript를 갖춘 현대적인 React 컴포넌트
              라이브러리
            </p>
            <Badge className="mt-4">shadcn/ui 기반</Badge>
          </div>

          {/* Accessibility Notice */}
          <Alert className="mb-8">
            <AlertTitle className="text-green-700">
              ✅ 접근성 완전 지원
            </AlertTitle>
            <AlertDescription>
              모든 컴포넌트는 WAI-ARIA 표준을 준수하며, 키보드 네비게이션,
              스크린 리더 지원, 그리고 WCAG 2.1 AA 레벨 준수를 목표로
              설계되었습니다.
            </AlertDescription>
          </Alert>

          {/* Component Sections */}
          <div className="space-y-8">
            {/* Buttons */}
            <Card>
              <CardHeader>
                <CardTitle>Button 컴포넌트</CardTitle>
                <CardDescription>
                  다양한 스타일과 크기를 지원하는 버튼
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  <Button>기본</Button>
                  <Button variant="secondary">보조</Button>
                  <Button variant="outline">외곽선</Button>
                  <Button variant="destructive">위험</Button>
                  <Button disabled>비활성화</Button>
                </div>
                <div className="text-sm text-gray-600">
                  <p>
                    <strong>접근성 기능:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>키보드 네비게이션 지원 (Tab, Enter, Space)</li>
                    <li>포커스 표시기 (focus-visible ring)</li>
                    <li>스크린 리더를 위한 의미론적 button 요소</li>
                    <li>disabled 상태에서 포커스 및 상호작용 방지</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Input */}
            <Card>
              <CardHeader>
                <CardTitle>Input 컴포넌트</CardTitle>
                <CardDescription>
                  모든 HTML input 타입을 지원하는 입력 필드
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 max-w-md">
                  <Input placeholder="기본 입력" />
                  <Input type="email" placeholder="이메일 입력" />
                  <Input type="password" placeholder="비밀번호 입력" />
                  <Input disabled placeholder="비활성화된 입력" />
                </div>
                <div className="text-sm text-gray-600">
                  <p>
                    <strong>접근성 기능:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>키보드 네비게이션 및 텍스트 입력 지원</li>
                    <li>포커스 표시기</li>
                    <li>Label과의 연결 지원</li>
                    <li>ARIA 속성 완전 지원</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Select */}
            <Card>
              <CardHeader>
                <CardTitle>Select 컴포넌트</CardTitle>
                <CardDescription>
                  키보드 네비게이션과 접근성을 완전 지원하는 선택 컴포넌트
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="max-w-xs">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="옵션을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="react">React</SelectItem>
                      <SelectItem value="vue">Vue</SelectItem>
                      <SelectItem value="angular">Angular</SelectItem>
                      <SelectItem value="svelte">Svelte</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="text-sm text-gray-600">
                  <p>
                    <strong>접근성 기능:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>키보드 네비게이션 (Arrow keys, Enter, Escape)</li>
                    <li>타이핑으로 옵션 검색</li>
                    <li>포커스 트래핑 및 관리</li>
                    <li>스크린 리더 지원 (ARIA 역할 및 속성)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Progress 컴포넌트</CardTitle>
                <CardDescription>
                  진행 상태를 시각적으로 나타내는 프로그로스 바
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4 w-full max-w-md">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>진행률</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="w-full" />
                    <Button
                      onClick={handleProgressUpdate}
                      className="mt-2"
                      size="sm"
                    >
                      진행률 업데이트
                    </Button>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <p>
                    <strong>접근성 기능:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>ARIA progressbar 역할</li>
                    <li>aria-valuenow로 현재 값 제공</li>
                    <li>aria-valuemin, aria-valuemax로 범위 제공</li>
                    <li>스크린 리더 지원</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Spinner */}
            <Card>
              <CardHeader>
                <CardTitle>Spinner 컴포넌트</CardTitle>
                <CardDescription>로딩 상태를 나타내는 스피너</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Spinner size="sm" />
                    <span className="text-sm">Small</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Spinner />
                    <span className="text-sm">Default</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Spinner size="lg" />
                    <span className="text-sm">Large</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Spinner size="xl" />
                    <span className="text-sm">Extra Large</span>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <p>
                    <strong>접근성 기능:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>ARIA label로 로딩 상태 안내</li>
                    <li>스크린 리더 지원</li>
                    <li>의미론적 역할 부여</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Badge */}
            <Card>
              <CardHeader>
                <CardTitle>Badge 컴포넌트</CardTitle>
                <CardDescription>
                  상태나 카테고리를 표시하는 배지
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge>기본</Badge>
                  <Badge variant="secondary">보조</Badge>
                  <Badge variant="outline">외곽선</Badge>
                  <Badge variant="destructive">위험</Badge>
                </div>
                <div className="text-sm text-gray-600">
                  <p>
                    <strong>접근성 기능:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>의미론적 span 요소 사용</li>
                    <li>색상에 의존하지 않는 정보 전달</li>
                    <li>적절한 색상 대비</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t text-center">
            <p className="text-gray-600">
              ASK2 UI 컴포넌트 라이브러리 - 접근성과 사용성을 고려한 현대적인
              React 컴포넌트
            </p>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
