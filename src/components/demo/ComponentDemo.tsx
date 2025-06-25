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
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Badge,
  Progress,
  Alert,
  AlertDescription,
  AlertTitle,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  Spinner,
} from "@/components/ui";
import { AccessibilityAuditor } from "@/components/accessibility";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import { useToast } from "../../hooks/use-toast";

export function ComponentDemo() {
  const [progress, setProgress] = useState(33);
  const { toast } = useToast();

  const handleProgressUpdate = () => {
    const newProgress =
      progress >= 100 ? 0 : progress + 20 > 100 ? 100 : progress + 20;
    setProgress(newProgress);
  };

  const showToast = (
    variant?: "default" | "destructive" | "success" | "warning"
  ) => {
    toast({
      title: "알림",
      description: `${variant || "기본"} 토스트 메시지입니다.`,
      variant,
    });
  };

  return (
    <TooltipProvider>
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            UI 컴포넌트 데모
          </h1>
          <p className="text-gray-600">
            shadcn/ui 기반 컴포넌트 라이브러리 데모 페이지
          </p>
        </div>

        {/* Toast Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Toast 알림</CardTitle>
            <CardDescription>
              다양한 상태의 토스트 알림을 테스트해보세요.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => showToast()}>기본 토스트</Button>
              <Button
                onClick={() => showToast("success")}
                className="bg-green-600 hover:bg-green-700"
              >
                성공 토스트
              </Button>
              <Button
                onClick={() => showToast("warning")}
                className="bg-yellow-600 hover:bg-yellow-700"
              >
                경고 토스트
              </Button>
              <Button
                onClick={() => showToast("destructive")}
                variant="destructive"
              >
                오류 토스트
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tooltip Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Tooltip</CardTitle>
            <CardDescription>요소에 마우스를 올려보세요.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">위에 툴팁</Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>위쪽에 표시되는 툴팁입니다</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">오른쪽 툴팁</Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>오른쪽에 표시되는 툴팁입니다</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">아래 툴팁</Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>아래쪽에 표시되는 툴팁입니다</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </CardContent>
        </Card>

        {/* Spinner Demo */}
        <Card>
          <CardHeader>
            <CardTitle>로딩 스피너</CardTitle>
            <CardDescription>
              다양한 크기와 상태의 로딩 스피너입니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <Spinner size="sm" />
                <p className="text-sm mt-2">Small</p>
              </div>
              <div className="text-center">
                <Spinner />
                <p className="text-sm mt-2">Default</p>
              </div>
              <div className="text-center">
                <Spinner size="lg" />
                <p className="text-sm mt-2">Large</p>
              </div>
              <div className="text-center">
                <Spinner size="xl" />
                <p className="text-sm mt-2">Extra Large</p>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <div className="text-center">
                <Spinner variant="secondary" />
                <p className="text-sm mt-2">Secondary</p>
              </div>
              <div className="text-center">
                <Spinner variant="muted" />
                <p className="text-sm mt-2">Muted</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-4 bg-gray-100 rounded-md">
              <Spinner size="sm" />
              <span>로딩 중...</span>
            </div>
          </CardContent>
        </Card>

        {/* Button Demo */}
        <Card>
          <CardHeader>
            <CardTitle>버튼</CardTitle>
            <CardDescription>
              다양한 버튼 변형과 크기를 보여줍니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <Button size="sm">Small</Button>
              <Button>Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">🎯</Button>
            </div>
          </CardContent>
        </Card>

        {/* Input Demo */}
        <Card>
          <CardHeader>
            <CardTitle>입력 필드</CardTitle>
            <CardDescription>다양한 타입의 입력 필드입니다.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="기본 입력 필드" />
            <Input type="email" placeholder="이메일 주소" />
            <Input type="password" placeholder="비밀번호" />
            <Input disabled placeholder="비활성화된 필드" />
          </CardContent>
        </Card>

        {/* Select Demo */}
        <Card>
          <CardHeader>
            <CardTitle>선택 메뉴</CardTitle>
            <CardDescription>드롭다운 선택 메뉴입니다.</CardDescription>
          </CardHeader>
          <CardContent>
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="옵션을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">옵션 1</SelectItem>
                <SelectItem value="option2">옵션 2</SelectItem>
                <SelectItem value="option3">옵션 3</SelectItem>
                <SelectItem value="option4">옵션 4</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Dialog Demo */}
        <Card>
          <CardHeader>
            <CardTitle>대화상자</CardTitle>
            <CardDescription>모달 대화상자 예시입니다.</CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog>
              <DialogTrigger asChild>
                <Button>대화상자 열기</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>대화상자 제목</DialogTitle>
                  <DialogDescription>
                    이것은 대화상자의 설명입니다. 여기에 추가 정보를 표시할 수
                    있습니다.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <Input placeholder="여기에 입력하세요" />
                </div>
                <DialogFooter>
                  <Button variant="outline">취소</Button>
                  <Button>확인</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Tabs Demo */}
        <Card>
          <CardHeader>
            <CardTitle>탭</CardTitle>
            <CardDescription>탭을 이용한 콘텐츠 전환입니다.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="tab1">
              <TabsList>
                <TabsTrigger value="tab1">첫 번째 탭</TabsTrigger>
                <TabsTrigger value="tab2">두 번째 탭</TabsTrigger>
                <TabsTrigger value="tab3">세 번째 탭</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" className="mt-4">
                <p>첫 번째 탭의 내용입니다.</p>
              </TabsContent>
              <TabsContent value="tab2" className="mt-4">
                <p>두 번째 탭의 내용입니다.</p>
              </TabsContent>
              <TabsContent value="tab3" className="mt-4">
                <p>세 번째 탭의 내용입니다.</p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Badge Demo */}
        <Card>
          <CardHeader>
            <CardTitle>배지</CardTitle>
            <CardDescription>
              상태를 나타내는 배지 컴포넌트입니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge>기본</Badge>
              <Badge variant="secondary">보조</Badge>
              <Badge variant="outline">윤곽선</Badge>
              <Badge variant="destructive">위험</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Progress Demo */}
        <Card>
          <CardHeader>
            <CardTitle>진행률</CardTitle>
            <CardDescription>
              진행 상태를 보여주는 프로그레스 바입니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span>진행률</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="mb-4" />
              <Button onClick={handleProgressUpdate}>진행률 업데이트</Button>
            </div>
          </CardContent>
        </Card>

        {/* Alert Demo */}
        <Card>
          <CardHeader>
            <CardTitle>알림</CardTitle>
            <CardDescription>
              중요한 정보를 표시하는 알림 컴포넌트입니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertTitle>정보</AlertTitle>
              <AlertDescription>
                이것은 기본 알림 메시지입니다.
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <AlertTitle>오류</AlertTitle>
              <AlertDescription>
                이것은 오류 알림 메시지입니다.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Accessibility Auditor */}
        <AccessibilityAuditor />
      </div>
    </TooltipProvider>
  );
}
