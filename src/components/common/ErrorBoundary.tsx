import React, { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangleIcon, RefreshCwIcon, HomeIcon } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트 합니다.
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    this.setState({
      error,
      errorInfo,
    });

    // 에러 리포팅 서비스로 에러 전송
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // 개발 환경에서만 상세 에러 정보를 콘솔에 출력
    if (import.meta.env.DEV) {
      console.group("🚨 Error Boundary Details");
      console.error("Error:", error);
      console.error("Error Info:", errorInfo);
      console.error("Component Stack:", errorInfo.componentStack);
      console.groupEnd();
    }
  }

  private handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  private handleRefresh = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = "/";
  };

  public render() {
    if (this.state.hasError) {
      // 커스텀 폴백 UI가 제공된 경우 사용
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // 기본 에러 UI
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <AlertTriangleIcon className="h-16 w-16 text-red-600" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                문제가 발생했습니다
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
                </p>

                {/* 개발 환경에서만 에러 세부사항 표시 */}
                {import.meta.env.DEV && this.state.error && (
                  <details className="text-left bg-gray-100 p-4 rounded-lg mb-4">
                    <summary className="cursor-pointer font-medium text-gray-800 mb-2">
                      개발자 정보 (개발 환경에서만 표시)
                    </summary>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Error:</strong>
                        <pre className="whitespace-pre-wrap text-red-600 mt-1">
                          {this.state.error.toString()}
                        </pre>
                      </div>
                      {this.state.errorInfo && (
                        <div>
                          <strong>Component Stack:</strong>
                          <pre className="whitespace-pre-wrap text-gray-600 mt-1 text-xs">
                            {this.state.errorInfo.componentStack}
                          </pre>
                        </div>
                      )}
                    </div>
                  </details>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={this.handleReset}
                  className="flex items-center justify-center"
                >
                  <RefreshCwIcon className="h-4 w-4 mr-2" />
                  다시 시도
                </Button>

                <Button
                  variant="outline"
                  onClick={this.handleRefresh}
                  className="flex items-center justify-center"
                >
                  <RefreshCwIcon className="h-4 w-4 mr-2" />
                  페이지 새로고침
                </Button>

                <Button
                  variant="outline"
                  onClick={this.handleGoHome}
                  className="flex items-center justify-center"
                >
                  <HomeIcon className="h-4 w-4 mr-2" />
                  홈으로 이동
                </Button>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-500">
                  문제가 계속 발생한다면 고객센터로 문의해주세요.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

// 함수형 컴포넌트용 간단한 에러 바운더리 래퍼
interface ErrorBoundaryWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

export const withErrorBoundary = (
  Component: React.ComponentType<any>,
  errorBoundaryProps?: Omit<ErrorBoundaryWrapperProps, "children">
) => {
  const WrappedComponent = (props: any) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${
    Component.displayName || Component.name
  })`;

  return WrappedComponent;
};

// Hook 스타일의 에러 처리
export const useErrorHandler = () => {
  const handleError = (error: Error, errorInfo?: any) => {
    console.error("Manual error handling:", error, errorInfo);

    // 에러 리포팅 서비스로 전송할 수 있음
    if (import.meta.env.PROD) {
      // 프로덕션에서는 에러 리포팅 서비스로 전송
      // 예: Sentry, LogRocket 등
    }
  };

  return { handleError };
};
