import { useState } from "react";
import { useWizard } from "@/contexts/WizardContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  PlusIcon,
  TrashIcon,
  BuildingIcon,
  UserIcon,
  MailIcon,
} from "lucide-react";

export const TargetCompaniesStep: React.FC = () => {
  const { formData, addTargetCompany, removeTargetCompany } = useWizard();
  const [newCompany, setNewCompany] = useState({
    name: "",
    domain: "",
    contactPerson: "",
    contactEmail: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!newCompany.name.trim()) {
      newErrors.name = "회사명을 입력해주세요";
    }

    if (!newCompany.domain.trim()) {
      newErrors.domain = "도메인을 입력해주세요";
    } else if (
      !/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/.test(
        newCompany.domain
      )
    ) {
      newErrors.domain = "올바른 도메인 형식을 입력해주세요 (예: company.com)";
    }

    if (!newCompany.contactPerson.trim()) {
      newErrors.contactPerson = "담당자명을 입력해주세요";
    }

    if (!newCompany.contactEmail.trim()) {
      newErrors.contactEmail = "담당자 이메일을 입력해주세요";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newCompany.contactEmail)) {
      newErrors.contactEmail = "올바른 이메일 형식을 입력해주세요";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddCompany = () => {
    if (validateForm()) {
      // 중복 체크
      const isDuplicate = formData.targetCompanies.some(
        (company) =>
          company.name.toLowerCase() === newCompany.name.toLowerCase() ||
          company.domain.toLowerCase() === newCompany.domain.toLowerCase()
      );

      if (isDuplicate) {
        setErrors({ name: "이미 추가된 회사입니다" });
        return;
      }

      addTargetCompany(newCompany);
      setNewCompany({
        name: "",
        domain: "",
        contactPerson: "",
        contactEmail: "",
      });
      setErrors({});
    }
  };

  const handleInputChange = (field: keyof typeof newCompany, value: string) => {
    setNewCompany((prev) => ({ ...prev, [field]: value }));
    // 에러가 있다면 입력시 제거
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddCompany();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          대상 기업 선택
        </h3>
        <p className="text-gray-600">
          평판을 확인할 기업과 담당자를 선택해주세요.
        </p>
      </div>

      {/* 기업 추가 폼 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <PlusIcon className="h-5 w-5" />
            <span>새 기업 추가</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="companyName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                회사명 *
              </label>
              <Input
                id="companyName"
                type="text"
                placeholder="예: ABC 회사"
                value={newCompany.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                onKeyDown={handleKeyDown}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="domain"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                회사 도메인 *
              </label>
              <Input
                id="domain"
                type="text"
                placeholder="예: abc.com"
                value={newCompany.domain}
                onChange={(e) => handleInputChange("domain", e.target.value)}
                onKeyDown={handleKeyDown}
                className={errors.domain ? "border-red-500" : ""}
              />
              {errors.domain && (
                <p className="text-red-500 text-sm mt-1">{errors.domain}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="contactPerson"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                담당자명 *
              </label>
              <Input
                id="contactPerson"
                type="text"
                placeholder="예: 김담당"
                value={newCompany.contactPerson}
                onChange={(e) =>
                  handleInputChange("contactPerson", e.target.value)
                }
                onKeyDown={handleKeyDown}
                className={errors.contactPerson ? "border-red-500" : ""}
              />
              {errors.contactPerson && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.contactPerson}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contactEmail"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                담당자 이메일 *
              </label>
              <Input
                id="contactEmail"
                type="email"
                placeholder="예: kim@abc.com"
                value={newCompany.contactEmail}
                onChange={(e) =>
                  handleInputChange("contactEmail", e.target.value)
                }
                onKeyDown={handleKeyDown}
                className={errors.contactEmail ? "border-red-500" : ""}
              />
              {errors.contactEmail && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.contactEmail}
                </p>
              )}
            </div>
          </div>

          <Button onClick={handleAddCompany} className="w-full">
            <PlusIcon className="h-4 w-4 mr-2" />
            기업 추가
          </Button>
        </CardContent>
      </Card>

      {/* 선택된 기업 목록 */}
      {formData.targetCompanies.length > 0 && (
        <div>
          <h4 className="text-lg font-medium text-gray-900 mb-3">
            선택된 기업 ({formData.targetCompanies.length}개)
          </h4>
          <div className="space-y-3">
            {formData.targetCompanies.map((company) => (
              <Card key={company.id} className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-2">
                        <BuildingIcon className="h-4 w-4 text-gray-500" />
                        <span className="font-medium text-gray-900">
                          {company.name}
                        </span>
                        <Badge variant="outline">{company.domain}</Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <UserIcon className="h-3 w-3" />
                          <span>{company.contactPerson}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MailIcon className="h-3 w-3" />
                          <span>{company.contactEmail}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeTargetCompany(company.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* 안내 메시지 */}
      {formData.targetCompanies.length === 0 && (
        <Card className="bg-gray-50">
          <CardContent className="p-6 text-center">
            <BuildingIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">
              평판 확인을 요청할 기업을 추가해주세요
            </h4>
            <p className="text-gray-600">
              최소 1개 이상의 기업을 추가해야 다음 단계로 진행할 수 있습니다.
            </p>
          </CardContent>
        </Card>
      )}

      {/* 개발용 검증 버튼 */}
      {import.meta.env.DEV && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800 text-sm mb-2">
            <strong>개발용:</strong> 현재 상태 검증
          </p>
          <div className="text-xs text-yellow-700">
            <p>선택된 기업 수: {formData.targetCompanies.length}</p>
            <p>
              Step 3 유효성: {formData.targetCompanies.length > 0 ? "✅" : "❌"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
