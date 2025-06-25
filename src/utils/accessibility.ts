// Accessibility utility functions for ASK2 UI Components

/**
 * Check if an element has sufficient color contrast
 * @param element - The DOM element to check
 * @returns boolean indicating if contrast is sufficient
 */
export function hasGoodContrast(element: HTMLElement): boolean {
  const computedStyle = window.getComputedStyle(element);
  const backgroundColor = computedStyle.backgroundColor;
  const color = computedStyle.color;

  // This is a simplified check - in production, use a proper contrast ratio library
  // For now, we'll just check if both colors are defined
  return backgroundColor !== "rgba(0, 0, 0, 0)" && color !== "rgba(0, 0, 0, 0)";
}

/**
 * Check if an element is keyboard accessible
 * @param element - The DOM element to check
 * @returns boolean indicating if element is keyboard accessible
 */
export function isKeyboardAccessible(element: HTMLElement): boolean {
  const tabIndex = element.getAttribute("tabindex");
  const isInteractive = ["button", "input", "select", "textarea", "a"].includes(
    element.tagName.toLowerCase()
  );

  // Element is keyboard accessible if it's naturally focusable or has tabindex >= 0
  return isInteractive || (tabIndex !== null && parseInt(tabIndex) >= 0);
}

/**
 * Check if an element has proper ARIA labeling
 * @param element - The DOM element to check
 * @returns boolean indicating if element has proper labeling
 */
export function hasProperLabeling(element: HTMLElement): boolean {
  const hasAriaLabel = element.hasAttribute("aria-label");
  const hasAriaLabelledBy = element.hasAttribute("aria-labelledby");
  const hasTitle = element.hasAttribute("title");
  const hasAssociatedLabel = Boolean(
    element.id && document.querySelector(`label[for="${element.id}"]`)
  );

  return hasAriaLabel || hasAriaLabelledBy || hasTitle || hasAssociatedLabel;
}

/**
 * Get accessibility score for an element
 * @param element - The DOM element to evaluate
 * @returns number between 0-100 representing accessibility score
 */
export function getAccessibilityScore(element: HTMLElement): number {
  let score = 0;

  // Check contrast (25 points)
  if (hasGoodContrast(element)) {
    score += 25;
  }

  // Check keyboard accessibility (25 points)
  if (isKeyboardAccessible(element)) {
    score += 25;
  }

  // Check proper labeling (25 points)
  if (hasProperLabeling(element)) {
    score += 25;
  }

  // Check for semantic HTML (25 points)
  const semanticTags = [
    "button",
    "input",
    "select",
    "textarea",
    "nav",
    "main",
    "section",
    "article",
    "header",
    "footer",
  ];
  if (
    semanticTags.includes(element.tagName.toLowerCase()) ||
    element.getAttribute("role")
  ) {
    score += 25;
  }

  return score;
}

/**
 * Run accessibility audit on multiple elements
 * @param elements - Array of elements to audit
 * @returns Object with audit results
 */
export function auditAccessibility(elements: HTMLElement[]): {
  totalElements: number;
  averageScore: number;
  failingElements: { element: HTMLElement; score: number; issues: string[] }[];
  passingElements: number;
} {
  const results = elements.map((element) => {
    const score = getAccessibilityScore(element);
    const issues: string[] = [];

    if (!hasGoodContrast(element)) {
      issues.push("Insufficient color contrast");
    }

    if (!isKeyboardAccessible(element)) {
      issues.push("Not keyboard accessible");
    }

    if (!hasProperLabeling(element)) {
      issues.push("Missing proper labeling");
    }

    return { element, score, issues };
  });

  const failingElements = results.filter((result) => result.score < 75);
  const passingElements = results.filter((result) => result.score >= 75).length;
  const averageScore =
    results.reduce((sum, result) => sum + result.score, 0) / results.length;

  return {
    totalElements: elements.length,
    averageScore: Math.round(averageScore),
    failingElements,
    passingElements,
  };
}

/**
 * Focus trap utility for modals and dialogs
 */
export class FocusTrap {
  private container: HTMLElement;
  private focusableElements: NodeListOf<HTMLElement>;
  private firstFocusableElement: HTMLElement;
  private lastFocusableElement: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;
    this.focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    this.firstFocusableElement = this.focusableElements[0];
    this.lastFocusableElement =
      this.focusableElements[this.focusableElements.length - 1];
  }

  activate() {
    this.container.addEventListener("keydown", this.handleKeyDown);
    this.firstFocusableElement?.focus();
  }

  deactivate() {
    this.container.removeEventListener("keydown", this.handleKeyDown);
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Tab") {
      if (e.shiftKey) {
        if (document.activeElement === this.firstFocusableElement) {
          this.lastFocusableElement?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === this.lastFocusableElement) {
          this.firstFocusableElement?.focus();
          e.preventDefault();
        }
      }
    }

    if (e.key === "Escape") {
      // Let parent handle escape
      return;
    }
  };
}

/**
 * Announce message to screen readers
 * @param message - Message to announce
 * @param priority - Priority level (polite | assertive)
 */
export function announceToScreenReader(
  message: string,
  priority: "polite" | "assertive" = "polite"
) {
  const announcer = document.createElement("div");
  announcer.setAttribute("aria-live", priority);
  announcer.setAttribute("aria-atomic", "true");
  announcer.className = "sr-only";
  announcer.textContent = message;

  document.body.appendChild(announcer);

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcer);
  }, 1000);
}

/**
 * Check if user prefers reduced motion
 * @returns boolean indicating if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Get high contrast mode status
 * @returns boolean indicating if high contrast mode is active
 */
export function isHighContrastMode(): boolean {
  return window.matchMedia("(prefers-contrast: high)").matches;
}
