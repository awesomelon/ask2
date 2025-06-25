import React, { useState } from "react";
import { useWizard } from "@/contexts/WizardContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const TalentInfoStep: React.FC = () => {
  const { formData, updateTalentInfo } = useWizard();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateFields = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.talentInfo.name.trim()) {
      newErrors.name = "이름을 입력해주세요.";
    } else if (formData.talentInfo.name.trim().length < 2) {
      newErrors.name = "이름은 2자 이상 입력해주세요.";
    }

    if (!formData.talentInfo.email.trim()) {
      newErrors.email = "이메일을 입력해주세요.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.talentInfo.email)) {
      newErrors.email = "올바른 이메일 형식을 입력해주세요.";
    }

    if (!formData.talentInfo.phone.trim()) {
      newErrors.phone = "연락처를 입력해주세요.";
    } else if (
      !/^[0-9-+\s()]{10,}$/.test(formData.talentInfo.phone.replace(/\s/g, ""))
    ) {
      newErrors.phone = "올바른 연락처 형식을 입력해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    field: keyof typeof formData.talentInfo,
    value: string
  ) => {
    updateTalentInfo({ [field]: value });

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-numeric characters
    const numbers = value.replace(/[^\d]/g, "");

    // Format as Korean phone number
    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 7) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    } else if (numbers.length <= 11) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(
        7
      )}`;
    } else {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(
        7,
        11
      )}`;
    }
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    handleInputChange("phone", formatted);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          인재 정보 입력
        </h2>
        <p className="text-gray-600">
          평판을 확인할 인재의 기본 정보를 입력해주세요
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>기본 정보</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 이름 입력 */}
          <div>
            <label
              htmlFor="talent-name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              이름 *
            </label>
            <Input
              id="talent-name"
              type="text"
              value={formData.talentInfo.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="예: 김철수"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name}</p>
            )}
          </div>

          {/* 이메일 입력 */}
          <div>
            <label
              htmlFor="talent-email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              이메일 *
            </label>
            <Input
              id="talent-email"
              type="email"
              value={formData.talentInfo.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="예: kim.cheolsu@email.com"
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              평판 요청 결과를 받을 이메일 주소입니다.
            </p>
          </div>

          {/* 연락처 입력 */}
          <div>
            <label
              htmlFor="talent-phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              연락처 *
            </label>
            <Input
              id="talent-phone"
              type="tel"
              value={formData.talentInfo.phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              placeholder="예: 010-1234-5678"
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && (
              <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              필요시 연락을 위한 전화번호입니다.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 유의사항 안내 */}
      <Alert>
        <AlertDescription>
          <strong>개인정보 처리 안내:</strong> 입력하신 개인정보는 평판 요청
          처리 목적으로만 사용되며, 관련 법령에 따라 안전하게 관리됩니다. 평판
          요청이 완료된 후 일정 기간이 지나면 자동으로 삭제됩니다.
        </AlertDescription>
      </Alert>

      {/* 검증 버튼 (개발용) */}
      {import.meta.env.DEV && (
        <div className="mt-6">
          <Button variant="outline" onClick={validateFields} className="w-full">
            폼 검증 테스트
          </Button>
        </div>
      )}
    </div>
  );
};
