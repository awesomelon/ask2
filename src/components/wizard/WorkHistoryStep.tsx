import { useState } from "react";
import { useWizard } from "@/contexts/WizardContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const WorkHistoryStep: React.FC = () => {
  const { formData, addWorkHistory, removeWorkHistory } = useWizard();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isAdding, setIsAdding] = useState(false);
  const [newEntry, setNewEntry] = useState({
    position: "",
    company: "",
    startDate: "",
    endDate: "",
    responsibilities: "",
  });

  const validateNewEntry = () => {
    const newErrors: Record<string, string> = {};

    if (!newEntry.position.trim()) {
      newErrors.position = "직책을 입력해주세요.";
    }

    if (!newEntry.company.trim()) {
      newErrors.company = "회사명을 입력해주세요.";
    }

    if (!newEntry.startDate) {
      newErrors.startDate = "시작 날짜를 입력해주세요.";
    }

    if (!newEntry.endDate) {
      newErrors.endDate = "종료 날짜를 입력해주세요.";
    } else if (newEntry.startDate && newEntry.endDate <= newEntry.startDate) {
      newErrors.endDate = "종료 날짜는 시작 날짜보다 늦어야 합니다.";
    }

    if (!newEntry.responsibilities.trim()) {
      newErrors.responsibilities = "주요 업무를 입력해주세요.";
    } else if (newEntry.responsibilities.trim().length < 10) {
      newErrors.responsibilities = "주요 업무는 10자 이상 입력해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof typeof newEntry, value: string) => {
    setNewEntry((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleAddEntry = () => {
    if (validateNewEntry()) {
      addWorkHistory(newEntry);
      setNewEntry({
        position: "",
        company: "",
        startDate: "",
        endDate: "",
        responsibilities: "",
      });
      setIsAdding(false);
      setErrors({});
    }
  };

  const handleRemoveEntry = (id: string) => {
    removeWorkHistory(id);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
    });
  };

  const calculateDuration = (start: string, end: string) => {
    if (!start || !end) return "";

    const startDate = new Date(start);
    const endDate = new Date(end);
    const months =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      (endDate.getMonth() - startDate.getMonth());

    if (months < 1) return "1개월 미만";
    if (months < 12) return `${months}개월`;

    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (remainingMonths === 0) return `${years}년`;
    return `${years}년 ${remainingMonths}개월`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">근무 이력</h2>
        <p className="text-gray-600">
          인재의 근무 이력을 추가해주세요. 최소 1개 이상의 이력이 필요합니다.
        </p>
      </div>

      {/* 기존 근무 이력 목록 */}
      {formData.workHistory.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">등록된 근무 이력</h3>
          {formData.workHistory.map((history) => (
            <Card key={history.id} className="relative">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">
                      {history.position}
                    </CardTitle>
                    <p className="text-gray-600">{history.company}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">
                      {formatDate(history.startDate)} -{" "}
                      {formatDate(history.endDate)}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveEntry(history.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      삭제
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>근무기간:</span>
                    <span>
                      {calculateDuration(history.startDate, history.endDate)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      주요 업무:
                    </p>
                    <p className="text-sm text-gray-600">
                      {history.responsibilities}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* 새 근무 이력 추가 */}
      {!isAdding ? (
        <div className="text-center">
          <Button onClick={() => setIsAdding(true)} className="w-full">
            + 근무 이력 추가
          </Button>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>새 근무 이력 추가</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* 직책 */}
            <div>
              <label
                htmlFor="position"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                직책 *
              </label>
              <Input
                id="position"
                type="text"
                value={newEntry.position}
                onChange={(e) => handleInputChange("position", e.target.value)}
                placeholder="예: 백엔드 개발자"
                className={errors.position ? "border-red-500" : ""}
              />
              {errors.position && (
                <p className="text-xs text-red-500 mt-1">{errors.position}</p>
              )}
            </div>

            {/* 회사명 */}
            <div>
              <label
                htmlFor="company"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                회사명 *
              </label>
              <Input
                id="company"
                type="text"
                value={newEntry.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                placeholder="예: ABC 테크놀로지"
                className={errors.company ? "border-red-500" : ""}
              />
              {errors.company && (
                <p className="text-xs text-red-500 mt-1">{errors.company}</p>
              )}
            </div>

            {/* 근무 기간 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  시작 날짜 *
                </label>
                <Input
                  id="startDate"
                  type="month"
                  value={newEntry.startDate}
                  onChange={(e) =>
                    handleInputChange("startDate", e.target.value)
                  }
                  className={errors.startDate ? "border-red-500" : ""}
                />
                {errors.startDate && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.startDate}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="endDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  종료 날짜 *
                </label>
                <Input
                  id="endDate"
                  type="month"
                  value={newEntry.endDate}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                  className={errors.endDate ? "border-red-500" : ""}
                />
                {errors.endDate && (
                  <p className="text-xs text-red-500 mt-1">{errors.endDate}</p>
                )}
              </div>
            </div>

            {/* 주요 업무 */}
            <div>
              <label
                htmlFor="responsibilities"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                주요 업무 *
              </label>
              <textarea
                id="responsibilities"
                value={newEntry.responsibilities}
                onChange={(e) =>
                  handleInputChange("responsibilities", e.target.value)
                }
                placeholder="예: React 기반 웹 애플리케이션 개발, REST API 설계 및 구현, 데이터베이스 최적화 등"
                rows={4}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
                  errors.responsibilities ? "border-red-500" : ""
                }`}
              />
              {errors.responsibilities && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.responsibilities}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                구체적인 업무 내용을 입력하면 더 정확한 평판 확인이 가능합니다.
              </p>
            </div>

            {/* 버튼 */}
            <div className="flex space-x-2">
              <Button onClick={handleAddEntry} className="flex-1">
                추가
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsAdding(false);
                  setNewEntry({
                    position: "",
                    company: "",
                    startDate: "",
                    endDate: "",
                    responsibilities: "",
                  });
                  setErrors({});
                }}
                className="flex-1"
              >
                취소
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 안내 메시지 */}
      {formData.workHistory.length === 0 && !isAdding && (
        <Alert>
          <AlertDescription>
            평판 요청을 위해 최소 1개 이상의 근무 이력을 추가해주세요. 정확한
            근무 이력을 입력하면 더 신뢰할 수 있는 평판 확인이 가능합니다.
          </AlertDescription>
        </Alert>
      )}

      {formData.workHistory.length > 0 && (
        <Alert>
          <AlertDescription>
            <strong>
              총 {formData.workHistory.length}개의 근무 이력이 등록되었습니다.
            </strong>
            추가로 등록하거나 다음 단계로 진행할 수 있습니다.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
