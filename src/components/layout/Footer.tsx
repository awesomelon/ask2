import React from "react";
import { cn } from "@/lib/utils";

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterProps {
  className?: string;
  onNavigate?: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ className, onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const legalLinks: FooterLink[] = [
    { label: "이용약관", href: "/terms" },
    { label: "개인정보 처리방침", href: "/privacy" },
    { label: "쿠키 정책", href: "/cookies" },
    { label: "문의하기", href: "/contact" },
  ];

  const companyLinks: FooterLink[] = [
    { label: "회사 소개", href: "/about" },
    { label: "채용 정보", href: "/careers" },
    { label: "블로그", href: "/blog" },
    { label: "도움말", href: "/help" },
  ];

  const socialLinks: FooterLink[] = [
    { label: "LinkedIn", href: "https://linkedin.com", external: true },
    { label: "Twitter", href: "https://twitter.com", external: true },
    { label: "GitHub", href: "https://github.com", external: true },
  ];

  const handleLinkClick = (link: FooterLink) => {
    if (link.external) {
      window.open(link.href, "_blank", "noopener,noreferrer");
    } else {
      onNavigate?.(link.href);
    }
  };

  return (
    <footer className={cn("border-t border-gray-200 bg-white", className)}>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-white font-bold text-sm">
                A2
              </div>
              <span className="text-xl font-bold text-gray-900">ASK2</span>
            </div>
            <p className="text-sm text-gray-600 max-w-xs">
              신뢰할 수 있는 평판 검증 플랫폼으로 더 나은 채용 결정을
              도와드립니다.
            </p>
          </div>

          {/* Company Links */}
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">회사</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleLinkClick(link)}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              법적 고지
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleLinkClick(link)}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">소셜</h3>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleLinkClick(link)}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-gray-600">
              © {currentYear} ASK2. All rights reserved.
            </div>

            {/* Additional Info */}
            <div className="flex flex-col items-center space-y-2 text-xs text-gray-500 md:flex-row md:space-y-0 md:space-x-4">
              <span>사업자등록번호: 123-45-67890</span>
              <span className="hidden md:inline">|</span>
              <span>대표: 홍길동</span>
              <span className="hidden md:inline">|</span>
              <span>서울특별시 강남구 테헤란로 123</span>
            </div>
          </div>
        </div>

        {/* Mobile Divider */}
        <div className="mt-6 border-t border-gray-200 pt-4 md:hidden">
          <div className="text-center text-xs text-gray-500">
            <p>고객센터: 1588-1234 (평일 09:00-18:00)</p>
            <p className="mt-1">이메일: support@ask2.co.kr</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
