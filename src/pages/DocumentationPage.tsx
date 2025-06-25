import React, { useState } from "react";
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
  CardFooter,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Badge,
  Progress,
  Alert,
  AlertTitle,
  AlertDescription,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  Spinner,
} from "../components/ui";
import { useToast } from "../hooks/use-toast";
import {
  Info,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  Copy,
  Check,
} from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = "tsx" }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code: ", err);
    }
  };

  return (
    <div className="relative bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto">
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 p-2 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors"
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-400" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </button>
      <pre className="text-sm overflow-x-auto">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
};

interface ComponentSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
  code: string;
  accessibilityFeatures?: string[];
}

const ComponentSection: React.FC<ComponentSectionProps> = ({
  title,
  description,
  children,
  code,
  accessibilityFeatures = [],
}) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>{title}</span>
          <Badge variant="secondary" className="text-xs">
            Component
          </Badge>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="text-sm font-semibold mb-3 text-gray-700">Preview</h4>
          <div className="p-6 border rounded-lg bg-gray-50">{children}</div>
        </div>

        {accessibilityFeatures.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold mb-3 text-green-700 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Accessibility Features
            </h4>
            <ul className="space-y-2">
              {accessibilityFeatures.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-gray-600"
                >
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <h4 className="text-sm font-semibold mb-3 text-gray-700">
            Code Example
          </h4>
          <CodeBlock code={code} />
        </div>
      </CardContent>
    </Card>
  );
};

export function DocumentationPage() {
  const [progress, setProgress] = useState(33);
  const { toast } = useToast();

  const handleProgressUpdate = () => {
    const newProgress =
      progress >= 100 ? 0 : progress + 20 > 100 ? 100 : progress + 20;
    setProgress(newProgress);
  };

  const showToast = (
    type: "default" | "success" | "warning" | "destructive"
  ) => {
    const toastConfig = {
      default: { title: "알림", description: "기본 알림 메시지입니다." },
      success: {
        title: "성공",
        description: "작업이 성공적으로 완료되었습니다.",
      },
      warning: { title: "경고", description: "주의가 필요한 상황입니다." },
      destructive: { title: "오류", description: "문제가 발생했습니다." },
    };

    toast({
      variant: type === "default" ? "default" : type,
      ...toastConfig[type],
    });
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
