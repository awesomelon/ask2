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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <FullWidthSection
        background="transparent"
        className="py-24 relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>

        <CenteredContainer size="lg" className="relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 mb-8">
              <span className="text-sm font-medium text-blue-700">
                🚀 혁신적인 평판 검증 플랫폼
              </span>
            </div>

            <h1 className="text-5xl font-bold text-gray-900 sm:text-6xl lg:text-7xl leading-tight">
              <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                신뢰할 수 있는
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                평판 검증 플랫폼
              </span>
            </h1>

            <p className="mt-8 text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              ASK2는 전직 동료들의 객관적인 평가를 통해 더 나은 채용 결정을
              도와드립니다.
              <br />
              <span className="font-semibold text-gray-800">
                투명하고 공정한 평판 검증으로 인재와 기업을 연결합니다.
              </span>
            </p>

            <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                onClick={() => onNavigate?.("/signup/corporate")}
                className="px-10 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:-translate-y-1"
              >
                기업회원 가입하기
                <span className="ml-2">→</span>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => onNavigate?.("/login")}
                className="px-10 py-4 text-lg border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 backdrop-blur-sm"
              >
                로그인
              </Button>
            </div>

            {/* Social proof */}
            <div className="mt-16 flex flex-col items-center">
              <p className="text-sm text-gray-500 mb-4">
                이미 많은 기업들이 신뢰하고 있습니다
              </p>
              <div className="flex items-center space-x-8 opacity-60">
                <div className="px-4 py-2 bg-white rounded-lg shadow-sm border">
                  <span className="text-sm font-medium text-gray-700">
                    500+ 기업
                  </span>
                </div>
                <div className="px-4 py-2 bg-white rounded-lg shadow-sm border">
                  <span className="text-sm font-medium text-gray-700">
                    10,000+ 검증
                  </span>
                </div>
                <div className="px-4 py-2 bg-white rounded-lg shadow-sm border">
                  <span className="text-sm font-medium text-gray-700">
                    99.8% 만족도
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CenteredContainer>
      </FullWidthSection>

      {/* Features Section */}
      <FullWidthSection
        background="transparent"
        className="py-20 relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-purple-50/20"></div>

        <CenteredContainer size="2xl" className="relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 mb-6">
              <span className="text-sm font-medium text-blue-700">
                ✨ 3가지 핵심 강점
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              왜 ASK2를 선택해야 할까요?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              전문적이고 신뢰할 수 있는 평판 검증 서비스를 제공합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group border-0 shadow-lg bg-gradient-to-br from-white to-blue-50/30 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white text-xl font-bold">✓</span>
                  </div>
                  <CardTitle className="text-lg text-gray-900">
                    객관적 평가
                  </CardTitle>
                </div>
                <div className="text-sm text-green-600 font-medium">
                  AI 분석 기반
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed mb-4">
                  전직 동료들의 실제 경험을 바탕으로 한 객관적이고 공정한 평가를
                  제공합니다.
                </CardDescription>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    <span>검증된 평가 시스템</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    <span>편향 방지 알고리즘</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    <span>98% 정확도</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group border-0 shadow-lg bg-gradient-to-br from-white to-purple-50/30 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white text-xl">🔒</span>
                  </div>
                  <CardTitle className="text-lg text-gray-900">
                    보안 강화
                  </CardTitle>
                </div>
                <div className="text-sm text-purple-600 font-medium">
                  엔터프라이즈급
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed mb-4">
                  철저한 개인정보 보호와 익명성 보장으로 안전한 평가 환경을
                  제공합니다.
                </CardDescription>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    <span>GDPR 완전 준수</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    <span>종단간 암호화</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    <span>ISO 27001 인증</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group border-0 shadow-lg bg-gradient-to-br from-white to-orange-50/30 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white text-xl">⚡</span>
                  </div>
                  <CardTitle className="text-lg text-gray-900">
                    빠른 처리
                  </CardTitle>
                </div>
                <div className="text-sm text-orange-600 font-medium">
                  자동화 시스템
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed mb-4">
                  간편한 절차와 자동화된 시스템으로 빠르고 효율적인 평판 검증이
                  가능합니다.
                </CardDescription>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    <span>평균 24시간 완료</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    <span>실시간 알림</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                    <span>API 연동 지원</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CenteredContainer>
      </FullWidthSection>

      {/* CTA Section */}
      <FullWidthSection
        background="transparent"
        className="py-24 relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5"></div>

        <CenteredContainer size="lg" className="relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center bg-white rounded-2xl p-12 shadow-xl border border-gray-100 relative overflow-hidden">
              {/* Inner background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 rounded-2xl"></div>

              <div className="relative z-10">
                <div className="inline-flex items-center px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg mb-8">
                  <span className="text-sm font-semibold">
                    🎯 지금 가입하면 30일 무료!
                  </span>
                </div>

                <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                  성공적인 채용의 새로운 기준을 시작하세요
                </h2>

                <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
                  5분이면 설정 완료! 더 나은 채용 결정을 위한 첫 걸음을
                  내딛어보세요.
                  <br />
                  <span className="text-blue-600 font-semibold">
                    30일 무료 체험
                  </span>
                  과 함께
                  <span className="text-purple-600 font-semibold">
                    {" "}
                    전담 컨설턴트 지원
                  </span>
                  을 받으실 수 있습니다.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                  <Button
                    size="lg"
                    onClick={() => onNavigate?.("/signup/corporate")}
                    className="px-12 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    무료로 시작하기
                    <span className="ml-2">🚀</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => onNavigate?.("/login")}
                    className="px-10 py-4 text-lg border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 transition-all duration-300"
                  >
                    데모 보기
                    <span className="ml-2">▶️</span>
                  </Button>
                </div>

                {/* Trust indicators */}
                <div className="flex flex-col items-center gap-6">
                  <div className="flex flex-col sm:flex-row items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>신용카드 필요 없음</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>언제든 취소 가능</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      <span>24/7 고객지원</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6 w-full max-w-md">
                    <p className="text-sm text-gray-500 mb-3">
                      문의사항이 있으시다면 언제든 연락주세요
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center text-sm">
                      <a
                        href="mailto:help@ask2.co.kr"
                        className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                      >
                        📧 help@ask2.co.kr
                      </a>
                      <span className="hidden sm:block text-gray-300">|</span>
                      <a
                        href="tel:1588-1234"
                        className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                      >
                        📞 1588-1234
                      </a>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      평일 9:00-18:00
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CenteredContainer>
      </FullWidthSection>
    </div>
  );
};

export default LandingPage;
