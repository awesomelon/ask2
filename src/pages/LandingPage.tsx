import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FullWidthSection,
  CenteredContainer,
} from "@/components/layout/PageContainer";

interface LandingPageProps {
  onNavigate?: (path: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <FullWidthSection background="white" className="py-20">
        <CenteredContainer size="lg">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
              신뢰할 수 있는
              <span className="text-primary block">평판 검증 플랫폼</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              ASK2는 전직 동료들의 객관적인 평가를 통해 더 나은 채용 결정을
              도와드립니다. 투명하고 공정한 평판 검증으로 인재와 기업을
              연결합니다.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => onNavigate?.("/signup/corporate")}
                className="px-8 py-3"
              >
                기업회원 가입하기
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => onNavigate?.("/login")}
                className="px-8 py-3"
              >
                로그인
              </Button>
            </div>
          </div>
        </CenteredContainer>
      </FullWidthSection>

      {/* Features Section */}
      <FullWidthSection background="gray" className="py-20">
        <CenteredContainer size="lg">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              왜 ASK2를 선택해야 할까요?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              전문적이고 신뢰할 수 있는 평판 검증 서비스를 제공합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-primary font-bold">✓</span>
                  </div>
                  객관적 평가
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  전직 동료들의 실제 경험을 바탕으로 한 객관적이고 공정한 평가를
                  제공합니다.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-primary font-bold">🔒</span>
                  </div>
                  보안 강화
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  철저한 개인정보 보호와 익명성 보장으로 안전한 평가 환경을
                  제공합니다.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-primary font-bold">⚡</span>
                  </div>
                  빠른 처리
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  간편한 절차와 자동화된 시스템으로 빠르고 효율적인 평판 검증이
                  가능합니다.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </CenteredContainer>
      </FullWidthSection>

      {/* CTA Section */}
      <FullWidthSection background="white" className="py-20">
        <CenteredContainer size="md">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              지금 시작해보세요
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              더 나은 채용 결정을 위한 첫 걸음을 내딛어보세요
            </p>
            <Button
              size="lg"
              onClick={() => onNavigate?.("/signup/corporate")}
              className="px-8 py-3"
            >
              무료로 시작하기
            </Button>
          </div>
        </CenteredContainer>
      </FullWidthSection>
    </div>
  );
};

export default LandingPage;
