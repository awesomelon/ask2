import React, { useState } from "react";
import { useWizard } from "@/contexts/WizardContext";
import type { Question } from "@/contexts/WizardContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  PlusIcon,
  TrashIcon,
  MessageSquareIcon,
  ToggleLeftIcon,
  ToggleRightIcon,
  GripVerticalIcon,
  CheckIcon,
} from "lucide-react";

export const QuestionsStep: React.FC = () => {
  const { formData, updateQuestion, addCustomQuestion, reorderQuestions } =
    useWizard();

  const [newQuestionText, setNewQuestionText] = useState("");
  const [showNewQuestion, setShowNewQuestion] = useState(false);
  const [error, setError] = useState("");

  const handleToggleQuestion = (questionId: string, isEnabled: boolean) => {
    updateQuestion(questionId, { isEnabled });
  };

  const handleAddCustomQuestion = () => {
    if (!newQuestionText.trim()) {
      setError("질문 내용을 입력해주세요");
      return;
    }

    if (newQuestionText.length > 200) {
      setError("질문은 200자 이내로 입력해주세요");
      return;
    }

    addCustomQuestion(newQuestionText.trim());
    setNewQuestionText("");
    setShowNewQuestion(false);
    setError("");
  };

  const handleDeleteCustomQuestion = (questionId: string) => {
    const updatedQuestions = formData.questions.filter(
      (q) => q.id !== questionId
    );
    reorderQuestions(updatedQuestions);
  };

  const handleMoveQuestion = (questionId: string, direction: "up" | "down") => {
    const questions = [...formData.questions];
    const currentIndex = questions.findIndex((q) => q.id === questionId);

    if (currentIndex === -1) return;

    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (newIndex < 0 || newIndex >= questions.length) return;

    // 요소들 위치 교체
    [questions[currentIndex], questions[newIndex]] = [
      questions[newIndex],
      questions[currentIndex],
    ];

    // order 업데이트
    questions.forEach((question, index) => {
      question.order = index + 1;
    });

    reorderQuestions(questions);
  };

  const enabledQuestions = formData.questions.filter((q) => q.isEnabled);
  const defaultQuestions = formData.questions.filter((q) => q.isDefault);
  const customQuestions = formData.questions.filter((q) => !q.isDefault);

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">질문 구성</h3>
        <p className="text-gray-600">
          평판 확인 시 사용할 질문을 선택하고 필요에 따라 커스텀 질문을
          추가하세요.
        </p>
      </div>

      {/* 기본 질문 섹션 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageSquareIcon className="h-5 w-5" />
              <span>기본 질문</span>
            </div>
            <Badge variant="outline">
              {defaultQuestions.filter((q) => q.isEnabled).length}/
              {defaultQuestions.length} 선택됨
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {defaultQuestions.map((question, index) => (
            <div
              key={question.id}
              className={`p-4 border rounded-lg transition-colors ${
                question.isEnabled
                  ? "border-blue-200 bg-blue-50"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <div className="flex items-start justify-between space-x-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-medium text-gray-500">
                      질문 {index + 1}
                    </span>
                    {question.isEnabled && (
                      <CheckIcon className="h-4 w-4 text-green-600" />
                    )}
                  </div>
                  <p className="text-gray-900">{question.text}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      handleToggleQuestion(question.id, !question.isEnabled)
                    }
                    className={`${
                      question.isEnabled
                        ? "text-blue-600 hover:text-blue-700"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    {question.isEnabled ? (
                      <ToggleRightIcon className="h-5 w-5" />
                    ) : (
                      <ToggleLeftIcon className="h-5 w-5" />
                    )}
                  </Button>
                  {question.isEnabled && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleMoveQuestion(question.id, "up")}
                        disabled={index === 0}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ↑
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleMoveQuestion(question.id, "down")}
                        disabled={index === defaultQuestions.length - 1}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ↓
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 커스텀 질문 섹션 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <PlusIcon className="h-5 w-5" />
              <span>커스텀 질문</span>
            </div>
            <Badge variant="outline">{customQuestions.length}개</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 커스텀 질문 목록 */}
          {customQuestions.length > 0 && (
            <div className="space-y-3">
              {customQuestions.map((question, index) => (
                <div
                  key={question.id}
                  className="p-4 border border-purple-200 bg-purple-50 rounded-lg"
                >
                  <div className="flex items-start justify-between space-x-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-medium text-purple-600">
                          커스텀 질문 {index + 1}
                        </span>
                        <CheckIcon className="h-4 w-4 text-green-600" />
                      </div>
                      <p className="text-gray-900">{question.text}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleMoveQuestion(question.id, "up")}
                        disabled={index === 0}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ↑
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleMoveQuestion(question.id, "down")}
                        disabled={index === customQuestions.length - 1}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ↓
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteCustomQuestion(question.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 새 질문 추가 */}
          {!showNewQuestion ? (
            <Button
              variant="outline"
              onClick={() => setShowNewQuestion(true)}
              className="w-full"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              커스텀 질문 추가
            </Button>
          ) : (
            <div className="space-y-3 p-4 border border-dashed border-gray-300 rounded-lg">
              <div>
                <label
                  htmlFor="newQuestion"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  새로운 질문
                </label>
                <Input
                  id="newQuestion"
                  type="text"
                  placeholder="예: 해당 인재의 창의성과 문제해결 능력은 어떠했나요?"
                  value={newQuestionText}
                  onChange={(e) => {
                    setNewQuestionText(e.target.value);
                    if (error) setError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddCustomQuestion();
                    }
                  }}
                  className={error ? "border-red-500" : ""}
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                <p className="text-gray-500 text-sm mt-1">
                  {newQuestionText.length}/200자
                </p>
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleAddCustomQuestion} size="sm">
                  추가
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowNewQuestion(false);
                    setNewQuestionText("");
                    setError("");
                  }}
                >
                  취소
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 선택된 질문 요약 */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <h4 className="font-medium text-blue-900 mb-2">
            📋 선택된 질문 요약
          </h4>
          <div className="text-blue-800 text-sm space-y-1">
            <p>총 {enabledQuestions.length}개의 질문이 선택되었습니다.</p>
            <p>
              • 기본 질문: {defaultQuestions.filter((q) => q.isEnabled).length}
              개
            </p>
            <p>• 커스텀 질문: {customQuestions.length}개</p>
          </div>
          {enabledQuestions.length === 0 && (
            <p className="text-red-600 text-sm mt-2">
              ⚠️ 최소 1개 이상의 질문을 선택해야 다음 단계로 진행할 수 있습니다.
            </p>
          )}
        </CardContent>
      </Card>

      {/* 개발용 검증 정보 */}
      {import.meta.env.DEV && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800 text-sm mb-2">
            <strong>개발용:</strong> 현재 상태 검증
          </p>
          <div className="text-xs text-yellow-700">
            <p>활성화된 질문 수: {enabledQuestions.length}</p>
            <p>Step 4 유효성: {enabledQuestions.length > 0 ? "✅" : "❌"}</p>
            <p>질문 순서: {enabledQuestions.map((q) => q.order).join(", ")}</p>
          </div>
        </div>
      )}
    </div>
  );
};
