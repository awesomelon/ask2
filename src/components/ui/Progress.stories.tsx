import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "./progress";
import { useState, useEffect } from "react";
import { Button } from "./button";

const meta: Meta<typeof Progress> = {
  title: "UI/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 프로그레스
export const Default: Story = {
  args: {
    value: 60,
    className: "w-80",
  },
};

// 다양한 진행 상태
export const DifferentValues: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span>시작</span>
          <span>0%</span>
        </div>
        <Progress value={0} />
      </div>

      <div>
        <div className="flex justify-between text-sm mb-2">
          <span>낮음</span>
          <span>25%</span>
        </div>
        <Progress value={25} />
      </div>

      <div>
        <div className="flex justify-between text-sm mb-2">
          <span>중간</span>
          <span>50%</span>
        </div>
        <Progress value={50} />
      </div>

      <div>
        <div className="flex justify-between text-sm mb-2">
          <span>높음</span>
          <span>75%</span>
        </div>
        <Progress value={75} />
      </div>

      <div>
        <div className="flex justify-between text-sm mb-2">
          <span>완료</span>
          <span>100%</span>
        </div>
        <Progress value={100} />
      </div>
    </div>
  ),
};

// 애니메이션 진행 표시
export const Animated: Story = {
  render: () => {
    const [progress, setProgress] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
      if (!isRunning) return;

      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsRunning(false);
            return 100;
          }
          return prev + 1;
        });
      }, 100);

      return () => clearInterval(timer);
    }, [isRunning]);

    const handleStart = () => {
      setProgress(0);
      setIsRunning(true);
    };

    const handleReset = () => {
      setProgress(0);
      setIsRunning(false);
    };

    return (
      <div className="space-y-4 w-80">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>업로드 진행률</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} />
        </div>

        <div className="flex gap-2">
          <Button onClick={handleStart} disabled={isRunning} size="sm">
            {isRunning ? "진행중..." : "시작"}
          </Button>
          <Button onClick={handleReset} variant="outline" size="sm">
            리셋
          </Button>
        </div>
      </div>
    );
  },
};

// 다양한 용도별 프로그레스
export const UseCases: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      {/* 파일 업로드 */}
      <div>
        <h4 className="font-medium mb-2">파일 업로드</h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>document.pdf</span>
            <span>87%</span>
          </div>
          <Progress value={87} />
          <div className="text-xs text-gray-500">2.3MB / 2.6MB</div>
        </div>
      </div>

      {/* 응답 진행률 */}
      <div>
        <h4 className="font-medium mb-2">평판 요청 응답률</h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>김철수 (시니어 개발자)</span>
            <span>3/4 응답</span>
          </div>
          <Progress value={75} />
          <div className="text-xs text-gray-500">마감까지 5일 남음</div>
        </div>
      </div>

      {/* 프로필 완성도 */}
      <div>
        <h4 className="font-medium mb-2">프로필 완성도</h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>기본 정보, 경력 입력 완료</span>
            <span>60%</span>
          </div>
          <Progress value={60} />
          <div className="text-xs text-gray-500">
            기술 스택과 포트폴리오를 추가하세요
          </div>
        </div>
      </div>

      {/* 학습 진도 */}
      <div>
        <h4 className="font-medium mb-2">온보딩 진행률</h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>4/5 단계 완료</span>
            <span>80%</span>
          </div>
          <Progress value={80} />
          <div className="text-xs text-gray-500">
            마지막 단계: 첫 번째 요청 보내기
          </div>
        </div>
      </div>
    </div>
  ),
};

// 다양한 크기
export const Sizes: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div>
        <div className="text-sm mb-2">작은 크기</div>
        <Progress value={45} className="h-1" />
      </div>

      <div>
        <div className="text-sm mb-2">기본 크기</div>
        <Progress value={45} />
      </div>

      <div>
        <div className="text-sm mb-2">큰 크기</div>
        <Progress value={45} className="h-3" />
      </div>

      <div>
        <div className="text-sm mb-2">매우 큰 크기</div>
        <Progress value={45} className="h-4" />
      </div>
    </div>
  ),
};

// 색상 변형
export const ColorVariants: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div>
        <div className="text-sm mb-2">기본 (파란색)</div>
        <Progress value={70} />
      </div>

      <div>
        <div className="text-sm mb-2">성공 (초록색)</div>
        <Progress value={100} className="[&>div]:bg-green-500" />
      </div>

      <div>
        <div className="text-sm mb-2">경고 (노란색)</div>
        <Progress value={30} className="[&>div]:bg-yellow-500" />
      </div>

      <div>
        <div className="text-sm mb-2">위험 (빨간색)</div>
        <Progress value={15} className="[&>div]:bg-red-500" />
      </div>

      <div>
        <div className="text-sm mb-2">보조 (회색)</div>
        <Progress value={50} className="[&>div]:bg-gray-500" />
      </div>
    </div>
  ),
};

// 실시간 진행률 시뮬레이션
export const RealTimeProgress: Story = {
  render: () => {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [processingProgress, setProcessingProgress] = useState(0);

    const simulateUpload = () => {
      setUploadProgress(0);
      const timer = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            simulateDownload();
            return 100;
          }
          return prev + Math.random() * 10;
        });
      }, 200);
    };

    const simulateDownload = () => {
      setDownloadProgress(0);
      setTimeout(() => {
        const timer = setInterval(() => {
          setDownloadProgress((prev) => {
            if (prev >= 100) {
              clearInterval(timer);
              simulateProcessing();
              return 100;
            }
            return prev + Math.random() * 15;
          });
        }, 150);
      }, 500);
    };

    const simulateProcessing = () => {
      setProcessingProgress(0);
      setTimeout(() => {
        const timer = setInterval(() => {
          setProcessingProgress((prev) => {
            if (prev >= 100) {
              clearInterval(timer);
              return 100;
            }
            return prev + Math.random() * 5;
          });
        }, 300);
      }, 500);
    };

    return (
      <div className="space-y-6 w-80">
        <div className="text-center">
          <Button onClick={simulateUpload}>파일 처리 시뮬레이션 시작</Button>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>1. 파일 업로드</span>
            <span>{Math.round(uploadProgress)}%</span>
          </div>
          <Progress value={uploadProgress} />
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>2. 데이터 다운로드</span>
            <span>{Math.round(downloadProgress)}%</span>
          </div>
          <Progress value={downloadProgress} />
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>3. 분석 처리</span>
            <span>{Math.round(processingProgress)}%</span>
          </div>
          <Progress value={processingProgress} />
        </div>

        {processingProgress === 100 && (
          <div className="text-center text-green-600 font-medium">
            ✅ 모든 작업이 완료되었습니다!
          </div>
        )}
      </div>
    );
  },
};
