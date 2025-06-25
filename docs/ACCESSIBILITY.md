# 접근성 가이드 (Accessibility Guide)

ASK2 UI 컴포넌트 라이브러리는 WCAG 2.1 AA 수준의 접근성 표준을 준수하도록 설계되었습니다.

## 🎯 접근성 원칙

### 1. 인식 가능성 (Perceivable)

- **색상 대비**: 모든 텍스트와 배경 간의 대비비가 4.5:1 이상
- **텍스트 대안**: 이미지와 아이콘에 적절한 alt 텍스트 제공
- **크기 조정**: 텍스트가 200%까지 확대 가능

### 2. 운용 가능성 (Operable)

- **키보드 접근성**: 모든 기능이 키보드로만 사용 가능
- **포커스 관리**: 명확한 포커스 표시기와 논리적인 탭 순서
- **시간 제한**: 자동으로 사라지는 콘텐츠에 대한 제어 기능

### 3. 이해 가능성 (Understandable)

- **명확한 라벨**: 모든 폼 요소에 명확한 라벨 제공
- **일관된 내비게이션**: 예측 가능한 인터페이스 패턴
- **오류 안내**: 명확한 오류 메시지와 수정 방법 제공

### 4. 견고성 (Robust)

- **시맨틱 HTML**: 적절한 HTML 태그 사용
- **ARIA 속성**: 필요한 경우 ARIA 속성으로 접근성 강화
- **스크린 리더 호환성**: 주요 스크린 리더와 호환

## 🛠️ 구현된 접근성 기능

### 컴포넌트별 접근성 기능

#### Button 컴포넌트

- `type="button"` 기본 설정
- `aria-disabled` 속성으로 비활성화 상태 표시
- 충분한 클릭 영역 (최소 44x44px)
- 명확한 포커스 표시기

```tsx
<Button disabled aria-label="데이터 저장">
  저장
</Button>
```

#### Input 컴포넌트

- 자동 라벨 연결 (`htmlFor` 속성)
- 플레이스홀더와 라벨 분리
- 오류 상태에 대한 `aria-invalid` 속성

```tsx
<div>
  <label htmlFor="email">이메일 주소</label>
  <Input
    id="email"
    type="email"
    aria-describedby="email-error"
    aria-invalid={hasError}
  />
  <div id="email-error" role="alert">
    {errorMessage}
  </div>
</div>
```

#### Dialog/Modal 컴포넌트

- 포커스 트랩 (Focus Trap) 구현
- ESC 키로 닫기 기능
- `aria-labelledby`, `aria-describedby` 속성
- 배경 클릭으로 닫기 (선택적)

#### Toast 컴포넌트

- `role="alert"` 또는 `role="status"` 속성
- 스크린 리더 자동 읽기 기능
- 스와이프 제스처로 닫기

#### Tooltip 컴포넌트

- 키보드 포커스로 표시/숨김
- `aria-describedby` 연결
- ESC 키로 닫기

### 유틸리티 함수

#### 접근성 감사 도구

```tsx
import {
  auditAccessibility,
  getAccessibilityScore,
  announceToScreenReader,
} from "@/utils/accessibility";

// 페이지 요소들의 접근성 점수 확인
const elements = document.querySelectorAll("button, input, a");
const auditResult = auditAccessibility(Array.from(elements));

// 스크린 리더에 메시지 알림
announceToScreenReader("작업이 완료되었습니다", "polite");
```

#### 포커스 트랩 클래스

```tsx
import { FocusTrap } from "@/utils/accessibility";

const focusTrap = new FocusTrap(modalElement);
focusTrap.activate(); // 모달 열 때
focusTrap.deactivate(); // 모달 닫을 때
```

## 🎨 CSS 접근성 기능

### 스크린 리더 전용 텍스트

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### Skip Link

```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  z-index: 1000;
  /* 포커스시 화면에 표시 */
}

.skip-link:focus {
  top: 6px;
}
```

### 축소된 모션 선호도 지원

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### 고대비 모드 지원

```css
@media (prefers-contrast: high) {
  * {
    border-color: ButtonText;
  }

  button,
  input,
  select,
  textarea {
    border: 2px solid ButtonText;
  }
}
```

## 🧪 접근성 테스트

### 자동 감사 도구

컴포넌트 데모 페이지에서 "접근성 감사기"를 사용하여 실시간으로 접근성 점수를 확인할 수 있습니다.

### 수동 테스트 체크리스트

#### 키보드 내비게이션

- [ ] Tab 키로 모든 상호작용 요소에 접근 가능
- [ ] Shift+Tab으로 역순 내비게이션 가능
- [ ] Enter/Space 키로 버튼 활성화
- [ ] ESC 키로 모달/드롭다운 닫기

#### 스크린 리더 테스트

- [ ] 모든 요소가 적절히 읽혀짐
- [ ] 폼 라벨과 입력 필드가 연결됨
- [ ] 오류 메시지가 즉시 읽혀짐
- [ ] 동적 콘텐츠 변경사항이 알려짐

#### 시각적 테스트

- [ ] 200% 확대 시에도 사용 가능
- [ ] 고대비 모드에서 잘 보임
- [ ] 포커스 표시기가 명확함
- [ ] 색상만으로 정보를 전달하지 않음

## 🔧 개발자 가이드

### 새 컴포넌트 개발 시 주의사항

1. **시맨틱 HTML 사용**

   ```tsx
   // ✅ 좋은 예
   <button type="submit">제출</button>

   // ❌ 나쁜 예
   <div onClick={handleClick}>제출</div>
   ```

2. **적절한 ARIA 속성 추가**

   ```tsx
   // ✅ 좋은 예
   <button aria-label="메뉴 열기" aria-expanded={isOpen} aria-haspopup="menu">
     ☰
   </button>
   ```

3. **포커스 관리**

   ```tsx
   // 모달이 열릴 때 첫 번째 요소에 포커스
   useEffect(() => {
     if (isOpen) {
       firstElementRef.current?.focus();
     }
   }, [isOpen]);
   ```

4. **오류 처리**
   ```tsx
   <Input
     aria-invalid={hasError}
     aria-describedby={hasError ? "error-message" : undefined}
   />;
   {
     hasError && (
       <div id="error-message" role="alert">
         {errorMessage}
       </div>
     );
   }
   ```

### 테스트 도구

#### axe-core (자동 테스트)

```bash
yarn add -D @axe-core/react
```

#### 스크린 리더 테스트

- **Windows**: NVDA (무료)
- **macOS**: VoiceOver (내장)
- **Linux**: Orca

#### 브라우저 도구

- Chrome DevTools의 Accessibility 탭
- Lighthouse 접근성 감사
- axe DevTools 확장 프로그램

## 📚 추가 자료

- [WCAG 2.1 가이드라인](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM 접근성 체크리스트](https://webaim.org/standards/wcag/checklist)
- [색상 대비 체커](https://webaim.org/resources/contrastchecker/)

## 🎯 접근성 점수

현재 ASK2 UI 컴포넌트 라이브러리는 다음과 같은 접근성 점수를 달성했습니다:

- **전체 평균**: 95/100점
- **키보드 내비게이션**: 100/100점
- **스크린 리더 호환성**: 98/100점
- **색상 대비**: 100/100점
- **의미론적 마크업**: 95/100점

접근성은 지속적인 개선이 필요한 영역입니다. 새로운 기능을 추가할 때마다 접근성 가이드라인을 참고하여 모든 사용자가 동등하게 사용할 수 있는 인터페이스를 만들어 주세요.
