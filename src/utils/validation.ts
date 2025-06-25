// Form Validation Utilities
// Reusable validation functions for common patterns

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * 이메일 주소 검증
 */
export const validateEmail = (email: string): ValidationResult => {
  if (!email.trim()) {
    return { isValid: false, error: "이메일을 입력해주세요" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: "올바른 이메일 형식을 입력해주세요" };
  }

  return { isValid: true };
};

/**
 * 한국 전화번호 검증
 */
export const validatePhone = (phone: string): ValidationResult => {
  if (!phone.trim()) {
    return { isValid: false, error: "전화번호를 입력해주세요" };
  }

  // 숫자만 추출
  const numericPhone = phone.replace(/\D/g, "");

  // 한국 휴대폰 번호 (010으로 시작하는 11자리)
  const mobileRegex = /^010\d{8}$/;
  // 한국 일반전화 (지역번호 + 7~8자리)
  const landlineRegex = /^0[2-6]\d{7,8}$/;

  if (!mobileRegex.test(numericPhone) && !landlineRegex.test(numericPhone)) {
    return {
      isValid: false,
      error: "올바른 전화번호 형식을 입력해주세요 (예: 010-1234-5678)",
    };
  }

  return { isValid: true };
};

/**
 * 필수 텍스트 필드 검증
 */
export const validateRequired = (
  value: string,
  fieldName: string
): ValidationResult => {
  if (!value.trim()) {
    return { isValid: false, error: `${fieldName}을(를) 입력해주세요` };
  }

  return { isValid: true };
};

/**
 * 최소 길이 검증
 */
export const validateMinLength = (
  value: string,
  minLength: number,
  fieldName: string
): ValidationResult => {
  if (value.length < minLength) {
    return {
      isValid: false,
      error: `${fieldName}은(는) 최소 ${minLength}자 이상이어야 합니다`,
    };
  }

  return { isValid: true };
};

/**
 * 최대 길이 검증
 */
export const validateMaxLength = (
  value: string,
  maxLength: number,
  fieldName: string
): ValidationResult => {
  if (value.length > maxLength) {
    return {
      isValid: false,
      error: `${fieldName}은(는) 최대 ${maxLength}자까지 입력 가능합니다`,
    };
  }

  return { isValid: true };
};

/**
 * 날짜 검증 (YYYY-MM-DD 형식)
 */
export const validateDate = (
  dateString: string,
  fieldName: string
): ValidationResult => {
  if (!dateString.trim()) {
    return { isValid: false, error: `${fieldName}을(를) 입력해주세요` };
  }

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return { isValid: false, error: "올바른 날짜 형식을 입력해주세요" };
  }

  return { isValid: true };
};

/**
 * 날짜 범위 검증 (시작일이 종료일보다 이전인지)
 */
export const validateDateRange = (
  startDate: string,
  endDate: string
): ValidationResult => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (start >= end) {
    return {
      isValid: false,
      error: "종료일은 시작일보다 늦어야 합니다",
    };
  }

  return { isValid: true };
};

/**
 * 도메인 형식 검증
 */
export const validateDomain = (domain: string): ValidationResult => {
  if (!domain.trim()) {
    return { isValid: false, error: "도메인을 입력해주세요" };
  }

  const domainRegex =
    /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/;
  if (!domainRegex.test(domain)) {
    return {
      isValid: false,
      error: "올바른 도메인 형식을 입력해주세요 (예: company.com)",
    };
  }

  return { isValid: true };
};

/**
 * 전화번호 자동 포매팅 (하이픈 추가)
 */
export const formatPhoneNumber = (phone: string): string => {
  const numericPhone = phone.replace(/\D/g, "");

  if (numericPhone.length === 11 && numericPhone.startsWith("010")) {
    return `${numericPhone.slice(0, 3)}-${numericPhone.slice(
      3,
      7
    )}-${numericPhone.slice(7)}`;
  }

  if (numericPhone.length === 10 && numericPhone.startsWith("0")) {
    return `${numericPhone.slice(0, 3)}-${numericPhone.slice(
      3,
      6
    )}-${numericPhone.slice(6)}`;
  }

  return phone; // 포매팅할 수 없는 경우 원본 반환
};

/**
 * 여러 검증 함수를 조합하여 실행
 */
export const combineValidations = (
  value: string,
  validations: Array<(value: string) => ValidationResult>
): ValidationResult => {
  for (const validation of validations) {
    const result = validation(value);
    if (!result.isValid) {
      return result;
    }
  }

  return { isValid: true };
};

/**
 * 객체의 모든 필드에 대해 검증 실행
 */
export const validateFields = <T extends Record<string, any>>(
  data: T,
  validationRules: Partial<Record<keyof T, (value: any) => ValidationResult>>
): { isValid: boolean; errors: Partial<Record<keyof T, string>> } => {
  const errors: Partial<Record<keyof T, string>> = {};
  let isValid = true;

  for (const [field, validator] of Object.entries(validationRules)) {
    if (validator && typeof validator === "function") {
      const result = validator(data[field as keyof T]);
      if (!result.isValid) {
        errors[field as keyof T] = result.error;
        isValid = false;
      }
    }
  }

  return { isValid, errors };
};

/**
 * 디바운스된 검증 (사용자 입력 중 너무 자주 검증되지 않도록)
 */
export const createDebouncedValidator = (
  validator: (value: string) => ValidationResult,
  delay: number = 300
) => {
  let timeoutId: number;

  return (value: string, callback: (result: ValidationResult) => void) => {
    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      const result = validator(value);
      callback(result);
    }, delay);
  };
};
