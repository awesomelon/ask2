// TypeScript Type Definitions
// Export type definitions here as they are created

// Example:
// export type { User, Organization } from './auth';
// export type { ReferenceRequest, RequestCompany } from './reference';
// export type { ApiResponse, ApiError } from './api';

// TypeScript Type Definitions for ASK2
// Core data models based on PRD specifications

/**
 * Organization interface representing a company or organization
 * Used for both corporate users and target companies in reference requests
 */
export interface Organization {
  /** Unique identifier for the organization */
  id: string;
  /** Organization name (e.g., "ABC회사") */
  name: string;
  /** Email domain used by the organization (e.g., "abc.com") */
  domain: string;
  /** Whether the organization has been verified */
  verified: boolean;
}

/**
 * User interface representing both corporate users and talent
 * Supports different user types with optional organization affiliation
 */
export interface User {
  /** Unique identifier for the user */
  id: string;
  /** User's email address */
  email: string;
  /** User's full name */
  name: string;
  /** User type - either corporate user or talent */
  type: "corporate" | "talent";
  /** Optional organization affiliation (required for corporate users) */
  organization?: Organization;
}

/**
 * Status types for reference requests
 */
export type ReferenceRequestStatus = "pending" | "in_progress" | "completed";

/**
 * Status types for individual company responses within a reference request
 */
export type RequestCompanyStatus = "pending" | "responded" | "rejected";

/**
 * RequestCompany interface representing a company's participation in a reference request
 * Tracks individual company responses and their assigned respondents
 */
export interface RequestCompany {
  /** The organization being asked to provide reference */
  organization: Organization;
  /** List of users from the organization assigned to respond */
  respondents: User[];
  /** Current status of this company's response */
  status: RequestCompanyStatus;
  /** Timestamp when the request was sent to this company */
  requestedAt?: Date;
  /** Timestamp when the company responded */
  respondedAt?: Date;
  /** Optional reason if the request was rejected */
  rejectionReason?: string;
}

/**
 * ReferenceRequest interface representing a complete reference check request
 * Contains all information about the talent and the companies being contacted
 */
export interface ReferenceRequest {
  /** Unique identifier for the reference request */
  id: string;
  /** Name of the talent being referenced */
  talentName: string;
  /** Email address of the talent */
  talentEmail: string;
  /** Position/role the talent is being considered for */
  position: string;
  /** Overall status of the reference request */
  status: ReferenceRequestStatus;
  /** List of companies being contacted for references */
  companies: RequestCompany[];
  /** Timestamp when the request was created */
  createdAt: Date;
  /** Timestamp when the request was last updated */
  updatedAt?: Date;
  /** User who created this reference request */
  createdBy?: User;
  /** Optional notes about the talent or position */
  notes?: string;
}

// ============================================================================
// API Types
// ============================================================================

/**
 * Standard API response wrapper
 * Provides consistent structure for all API responses
 */
export interface ApiResponse<T = any> {
  /** Indicates if the request was successful */
  success: boolean;
  /** Response data (type varies by endpoint) */
  data?: T;
  /** Error message if request failed */
  message?: string;
  /** Additional metadata about the response */
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    hasMore?: boolean;
  };
}

/**
 * Standard API error structure
 * Used for consistent error handling across the application
 */
export interface ApiError {
  /** HTTP status code */
  status: number;
  /** Error code for programmatic handling */
  code: string;
  /** Human-readable error message */
  message: string;
  /** Additional error details */
  details?: Record<string, any>;
  /** Timestamp when the error occurred */
  timestamp: string;
}

/**
 * Pagination parameters for list endpoints
 */
export interface PaginationParams {
  /** Page number (starts from 1) */
  page?: number;
  /** Number of items per page */
  limit?: number;
  /** Sort field */
  sortBy?: string;
  /** Sort order */
  sortOrder?: "asc" | "desc";
}

// ============================================================================
// Authentication API Types
// ============================================================================

/**
 * Login request payload
 */
export interface LoginRequest {
  /** User's email address */
  email: string;
  /** User's password */
  password: string;
  /** Optional remember me flag */
  rememberMe?: boolean;
}

/**
 * Login response data
 */
export interface LoginResponse {
  /** Authenticated user information */
  user: User;
  /** JWT access token */
  accessToken: string;
  /** JWT refresh token */
  refreshToken: string;
  /** Token expiration time */
  expiresIn: number;
}

/**
 * Magic link login request
 */
export interface MagicLinkRequest {
  /** User's email address */
  email: string;
  /** Redirect URL after successful login */
  redirectUrl?: string;
}

/**
 * Corporate signup request payload
 */
export interface CorporateSignupRequest {
  /** User's email address */
  email: string;
  /** User's full name */
  name: string;
  /** User's password */
  password: string;
  /** Organization information */
  organization: {
    name: string;
    domain: string;
  };
  /** Agreement to terms and conditions */
  agreeToTerms: boolean;
}

/**
 * Token refresh request
 */
export interface RefreshTokenRequest {
  /** Refresh token */
  refreshToken: string;
}

// ============================================================================
// Reference Request API Types
// ============================================================================

/**
 * Create reference request payload
 */
export interface CreateReferenceRequestRequest {
  /** Name of the talent being referenced */
  talentName: string;
  /** Email address of the talent */
  talentEmail: string;
  /** Position/role the talent is being considered for */
  position: string;
  /** List of organization IDs to contact */
  organizationIds: string[];
  /** Optional notes about the talent or position */
  notes?: string;
}

/**
 * Update reference request payload
 */
export interface UpdateReferenceRequestRequest {
  /** Updated position/role (optional) */
  position?: string;
  /** Updated notes (optional) */
  notes?: string;
  /** Updated status (optional) */
  status?: ReferenceRequestStatus;
}

/**
 * Reference request list parameters
 */
export interface ReferenceRequestListParams extends PaginationParams {
  /** Filter by status */
  status?: ReferenceRequestStatus;
  /** Filter by talent name (partial match) */
  talentName?: string;
  /** Filter by date range */
  createdAfter?: string;
  createdBefore?: string;
}

/**
 * Reference response submission payload
 */
export interface SubmitReferenceResponseRequest {
  /** Token from the reference request invitation */
  token: string;
  /** List of responses to questions */
  responses: Array<{
    questionId: string;
    answer: string;
    rating?: number;
  }>;
  /** Optional additional comments */
  comments?: string;
}

// ============================================================================
// Organization API Types
// ============================================================================

/**
 * Organization search parameters
 */
export interface OrganizationSearchParams {
  /** Search query (organization name or domain) */
  query: string;
  /** Maximum number of results */
  limit?: number;
  /** Include only verified organizations */
  verifiedOnly?: boolean;
}

/**
 * Organization verification request
 */
export interface OrganizationVerificationRequest {
  /** Organization ID to verify */
  organizationId: string;
  /** Verification method */
  method: "email" | "dns" | "manual";
  /** Additional verification data */
  verificationData?: Record<string, any>;
}

// ============================================================================
// User API Types
// ============================================================================

/**
 * User profile update request
 */
export interface UpdateUserProfileRequest {
  /** Updated user name */
  name?: string;
  /** Updated email address */
  email?: string;
  /** Updated organization information */
  organization?: Partial<Organization>;
}

/**
 * Password change request
 */
export interface ChangePasswordRequest {
  /** Current password */
  currentPassword: string;
  /** New password */
  newPassword: string;
}

// ============================================================================
// Form State Types
// ============================================================================

/**
 * Base form state interface
 * Provides common form state management properties
 */
export interface BaseFormState {
  /** Whether the form is currently submitting */
  isSubmitting: boolean;
  /** Whether the form has been submitted (for validation display) */
  isSubmitted: boolean;
  /** Whether the form has been touched/modified */
  isDirty: boolean;
  /** Form-level error message */
  error?: string;
  /** Form-level success message */
  success?: string;
}

/**
 * Field validation error
 * Represents a validation error for a specific form field
 */
export interface FieldError {
  /** Error message */
  message: string;
  /** Error type/code for programmatic handling */
  type?: string;
}

/**
 * Form field errors
 * Maps field names to their validation errors
 */
export type FormErrors<T> = {
  [K in keyof T]?: FieldError;
};

/**
 * Login form state
 */
export interface LoginFormState extends BaseFormState {
  /** Form field values */
  values: {
    email: string;
    password: string;
    rememberMe: boolean;
  };
  /** Field validation errors */
  errors: FormErrors<LoginFormState["values"]>;
}

/**
 * Magic link form state
 */
export interface MagicLinkFormState extends BaseFormState {
  /** Form field values */
  values: {
    email: string;
  };
  /** Field validation errors */
  errors: FormErrors<MagicLinkFormState["values"]>;
  /** Whether magic link was sent successfully */
  linkSent: boolean;
}

/**
 * Corporate signup form state
 */
export interface CorporateSignupFormState extends BaseFormState {
  /** Current step in the multi-step form */
  currentStep: number;
  /** Total number of steps */
  totalSteps: number;
  /** Form field values */
  values: {
    // Step 1: User information
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
    // Step 2: Organization information
    organizationName: string;
    organizationDomain: string;
    // Step 3: Agreement
    agreeToTerms: boolean;
    agreeToPrivacy: boolean;
  };
  /** Field validation errors */
  errors: FormErrors<CorporateSignupFormState["values"]>;
  /** Whether email verification was sent */
  emailVerificationSent: boolean;
}

/**
 * Reference request wizard state
 * Multi-step form for creating reference requests
 */
export interface ReferenceRequestWizardState extends BaseFormState {
  /** Current step in the wizard */
  currentStep: number;
  /** Total number of steps */
  totalSteps: number;
  /** Form field values */
  values: {
    // Step 1: Talent information
    talentName: string;
    talentEmail: string;
    position: string;
    // Step 2: Work history
    workHistory: Array<{
      id: string;
      company: string;
      position: string;
      startDate: string;
      endDate: string;
      description: string;
    }>;
    // Step 3: Target companies
    selectedCompanies: Array<{
      organizationId: string;
      organizationName: string;
      respondentEmails: string[];
    }>;
    // Step 4: Questions
    questions: Array<{
      id: string;
      text: string;
      type: "text" | "rating" | "multiple_choice";
      required: boolean;
      options?: string[];
    }>;
    // Step 5: Notes and review
    notes: string;
  };
  /** Field validation errors */
  errors: FormErrors<ReferenceRequestWizardState["values"]>;
  /** Step completion status */
  stepCompleted: boolean[];
}

/**
 * Reference response form state
 * For responding to reference requests
 */
export interface ReferenceResponseFormState extends BaseFormState {
  /** Reference request token */
  token: string;
  /** Whether consent has been given */
  consentGiven: boolean;
  /** Form field values */
  values: {
    responses: Array<{
      questionId: string;
      answer: string;
      rating?: number;
    }>;
    additionalComments: string;
  };
  /** Field validation errors */
  errors: FormErrors<ReferenceResponseFormState["values"]>;
  /** Auto-save status */
  autoSaveStatus: "idle" | "saving" | "saved" | "error";
  /** Last auto-save timestamp */
  lastSaved?: Date;
}

/**
 * User profile form state
 */
export interface UserProfileFormState extends BaseFormState {
  /** Form field values */
  values: {
    name: string;
    email: string;
    organizationName?: string;
    organizationDomain?: string;
  };
  /** Field validation errors */
  errors: FormErrors<UserProfileFormState["values"]>;
  /** Whether changes have been saved */
  changesSaved: boolean;
}

/**
 * Password change form state
 */
export interface PasswordChangeFormState extends BaseFormState {
  /** Form field values */
  values: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
  /** Field validation errors */
  errors: FormErrors<PasswordChangeFormState["values"]>;
  /** Password strength indicator */
  passwordStrength: {
    score: number; // 0-4
    feedback: string[];
  };
}

/**
 * Search and filter form state
 * For reference request list filtering
 */
export interface SearchFilterFormState extends BaseFormState {
  /** Form field values */
  values: {
    searchQuery: string;
    status: ReferenceRequestStatus | "all";
    dateFrom: string;
    dateTo: string;
    sortBy: string;
    sortOrder: "asc" | "desc";
  };
  /** Field validation errors */
  errors: FormErrors<SearchFilterFormState["values"]>;
  /** Whether filters are applied */
  hasActiveFilters: boolean;
}

/**
 * Organization search form state
 */
export interface OrganizationSearchFormState extends BaseFormState {
  /** Form field values */
  values: {
    query: string;
    verifiedOnly: boolean;
  };
  /** Field validation errors */
  errors: FormErrors<OrganizationSearchFormState["values"]>;
  /** Search results */
  results: Organization[];
  /** Whether search is in progress */
  isSearching: boolean;
  /** Selected organizations */
  selectedOrganizations: Organization[];
}

// ============================================================================
// Utility Types
// ============================================================================

/**
 * Makes all properties of a type optional recursively
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Makes all properties of a type required recursively
 */
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

/**
 * Extracts the keys of an object that have values of a specific type
 */
export type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

/**
 * Creates a union type from the values of an object
 */
export type ValueOf<T> = T[keyof T];

/**
 * Removes null and undefined from a type
 */
export type NonNullable<T> = T extends null | undefined ? never : T;

/**
 * Creates a pick type that only includes string fields
 */
export type PickStringFields<T> = Pick<T, KeysOfType<T, string>>;

/**
 * Creates a pick type that only includes optional fields
 */
export type PickOptionalFields<T> = Pick<
  T,
  {
    [K in keyof T]: T extends Record<K, T[K]> ? never : K;
  }[keyof T]
>;

/**
 * Entity ID type for ensuring type safety with IDs
 */
export type EntityId<T extends string> = string & { __entity: T };

/**
 * Strongly typed entity IDs
 */
export type UserId = EntityId<"User">;
export type OrganizationId = EntityId<"Organization">;
export type ReferenceRequestId = EntityId<"ReferenceRequest">;

/**
 * Loading state type for async operations
 */
export type LoadingState = "idle" | "loading" | "success" | "error";

/**
 * Result type for operations that can succeed or fail
 */
export type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

/**
 * Async state for handling async operations with data
 */
export type AsyncState<T, E = Error> = {
  state: LoadingState;
  data?: T;
  error?: E;
};

/**
 * Form field type for generic form handling
 */
export type FormField<T = any> = {
  value: T;
  error?: string;
  touched: boolean;
  dirty: boolean;
};

/**
 * Event handler types for common UI interactions
 */
export type ClickHandler = (event: React.MouseEvent<HTMLElement>) => void;
export type ChangeHandler<T = string> = (value: T) => void;
export type SubmitHandler<T = any> = (data: T) => void | Promise<void>;

// ============================================================================
// Type Guards
// ============================================================================

/**
 * Type guard to check if a user is a corporate user
 */
export function isCorporateUser(
  user: User
): user is User & { type: "corporate" } {
  return user.type === "corporate";
}

/**
 * Type guard to check if a user is a talent user
 */
export function isTalentUser(user: User): user is User & { type: "talent" } {
  return user.type === "talent";
}

/**
 * Type guard to check if an organization is verified
 */
export function isVerifiedOrganization(
  org: Organization
): org is Organization & { verified: true } {
  return org.verified === true;
}

/**
 * Type guard to check if a reference request is completed
 */
export function isCompletedRequest(request: ReferenceRequest): boolean {
  return request.status === "completed";
}

/**
 * Type guard to check if a reference request is in progress
 */
export function isInProgressRequest(request: ReferenceRequest): boolean {
  return request.status === "in_progress";
}

/**
 * Type guard to check if a company request has responded
 */
export function hasCompanyResponded(
  company: RequestCompany
): company is RequestCompany & { status: "responded"; respondedAt: Date } {
  return company.status === "responded" && company.respondedAt != null;
}

/**
 * Type guard to check if a company request was rejected
 */
export function wasCompanyRequestRejected(
  company: RequestCompany
): company is RequestCompany & { status: "rejected"; rejectionReason: string } {
  return company.status === "rejected" && company.rejectionReason != null;
}

/**
 * Type guard to check if an API response is successful
 */
export function isApiSuccess<T>(
  response: ApiResponse<T>
): response is ApiResponse<T> & { success: true; data: T } {
  return response.success === true && response.data != null;
}

/**
 * Type guard to check if an API response is an error
 */
export function isApiError<T>(
  response: ApiResponse<T>
): response is ApiResponse<T> & { success: false; message: string } {
  return response.success === false && response.message != null;
}

/**
 * Type guard to check if a form has errors
 */
export function hasFormErrors<T>(errors: FormErrors<T>): boolean {
  return Object.keys(errors).length > 0;
}

/**
 * Type guard to check if a value is not null or undefined
 */
export function isNotNullish<T>(value: T | null | undefined): value is T {
  return value != null;
}

/**
 * Type guard to check if a string is a valid email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Type guard to check if a value is a valid entity ID
 */
export function isValidEntityId(id: string): id is EntityId<any> {
  return typeof id === "string" && id.length > 0;
}

/**
 * Type guard to check if an async state is loading
 */
export function isLoading<T>(state: AsyncState<T>): boolean {
  return state.state === "loading";
}

/**
 * Type guard to check if an async state is successful
 */
export function isAsyncSuccess<T>(
  state: AsyncState<T>
): state is AsyncState<T> & { state: "success"; data: T } {
  return state.state === "success" && state.data != null;
}

/**
 * Type guard to check if an async state has an error
 */
export function isAsyncError<T>(
  state: AsyncState<T>
): state is AsyncState<T> & { state: "error"; error: Error } {
  return state.state === "error" && state.error != null;
}

// Placeholder export to prevent build errors during development
export {};
