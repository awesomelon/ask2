import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";
import {
  auditAccessibility,
  announceToScreenReader,
} from "../../utils/accessibility";
import { CheckCircle, AlertTriangle, AlertCircle, Search } from "lucide-react";

interface AccessibilityAuditResult {
  totalElements: number;
  averageScore: number;
  failingElements: { element: HTMLElement; score: number; issues: string[] }[];
  passingElements: number;
}

export function AccessibilityAuditor() {
  const [auditResult, setAuditResult] =
    useState<AccessibilityAuditResult | null>(null);
  const [isAuditing, setIsAuditing] = useState(false);

  const runAudit = async () => {
    setIsAuditing(true);
    announceToScreenReader("접근성 감사를 시작합니다.");

    try {
      // Get all interactive elements for audit
      const interactiveElements = Array.from(
        document.querySelectorAll<HTMLElement>(
          'button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])'
        )
      );

      // Run accessibility audit
      const result = auditAccessibility(interactiveElements);
      setAuditResult(result);

      announceToScreenReader(
        `접근성 감사가 완료되었습니다. 평균 점수: ${result.averageScore}점`
      );
    } catch (error) {
      console.error("Accessibility audit failed:", error);
      announceToScreenReader("접근성 감사 중 오류가 발생했습니다.");
    } finally {
      setIsAuditing(false);
    }
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 90) return "default";
    if (score >= 75) return "secondary";
    if (score >= 50) return "outline";
    return "destructive";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 75) return <CheckCircle className="h-4 w-4 text-green-600" />;
    if (score >= 50)
      return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
    return <AlertCircle className="h-4 w-4 text-red-600" />;
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          접근성 감사기
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            페이지의 모든 상호작용 요소에 대해 접근성 감사를 실행합니다.
          </p>
          <Button
            onClick={runAudit}
            disabled={isAuditing}
            aria-describedby="audit-description"
          >
            {isAuditing ? "감사 중..." : "감사 실행"}
          </Button>
        </div>

        <div id="audit-description" className="sr-only">
          이 버튼을 클릭하면 현재 페이지의 모든 상호작용 요소에 대해 접근성
          감사를 실행합니다.
        </div>

        {auditResult && (
          <div className="space-y-4">
            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold">
                    {auditResult.totalElements}
                  </div>
                  <div className="text-sm text-muted-foreground">총 요소</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {auditResult.passingElements}
                  </div>
                  <div className="text-sm text-muted-foreground">통과 요소</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Badge
                      variant={getScoreBadgeVariant(auditResult.averageScore)}
                    >
                      {auditResult.averageScore}점
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">평균 점수</div>
                </CardContent>
              </Card>
            </div>

            {/* Progress bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>전체 접근성 점수</span>
                <span>{auditResult.averageScore}%</span>
              </div>
              <Progress value={auditResult.averageScore} className="w-full" />
            </div>

            {/* Issues */}
            {auditResult.failingElements.length > 0 && (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>개선이 필요한 요소들</AlertTitle>
                <AlertDescription>
                  다음 요소들이 접근성 기준을 만족하지 않습니다:
                </AlertDescription>
                <div className="mt-4 space-y-2">
                  {auditResult.failingElements
                    .slice(0, 5)
                    .map((failing, index) => (
                      <div
                        key={index}
                        className="p-3 border rounded-md bg-muted/50"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {getScoreIcon(failing.score)}
                            <span className="font-medium">
                              {failing.element.tagName.toLowerCase()}
                            </span>
                            <Badge
                              variant={getScoreBadgeVariant(failing.score)}
                            >
                              {failing.score}점
                            </Badge>
                          </div>
                        </div>
                        <ul className="text-sm text-muted-foreground list-disc list-inside">
                          {failing.issues.map((issue, issueIndex) => (
                            <li key={issueIndex}>{issue}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  {auditResult.failingElements.length > 5 && (
                    <p className="text-sm text-muted-foreground">
                      그리고 {auditResult.failingElements.length - 5}개 더...
                    </p>
                  )}
                </div>
              </Alert>
            )}

            {auditResult.failingElements.length === 0 && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertTitle>훌륭합니다!</AlertTitle>
                <AlertDescription>
                  모든 요소가 접근성 기준을 만족합니다.
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {!auditResult && !isAuditing && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>접근성 감사 준비</AlertTitle>
            <AlertDescription>
              '감사 실행' 버튼을 클릭하여 현재 페이지의 접근성을 확인하세요.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
