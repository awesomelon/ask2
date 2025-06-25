// Test samples to verify type definitions
import type {
  User,
  Organization,
  ReferenceRequest,
  RequestCompany,
  RequestCompanyStatus,
  // API Types
  ApiResponse,
  ApiError,
  LoginRequest,
  LoginResponse,
  CorporateSignupRequest,
  CreateReferenceRequestRequest,
  ReferenceRequestListParams,
  SubmitReferenceResponseRequest,
  OrganizationSearchParams,
  UpdateUserProfileRequest,
  ChangePasswordRequest,
  // Form State Types
  LoginFormState,
  MagicLinkFormState,
  CorporateSignupFormState,
  ReferenceRequestWizardState,
  ReferenceResponseFormState,
  UserProfileFormState,
  PasswordChangeFormState,
  SearchFilterFormState,
  OrganizationSearchFormState,
  FieldError,
  FormErrors,
  // Utility Types
  DeepPartial,
  UserId,
  OrganizationId,
  ReferenceRequestId,
  Result,
  AsyncState,
  FormField,
  ClickHandler,
  ChangeHandler,
  SubmitHandler,
} from "./index";

// Import type guards
import {
  isCorporateUser,
  isTalentUser,
  isVerifiedOrganization,
  isCompletedRequest,
  isInProgressRequest,
  hasCompanyResponded,
  wasCompanyRequestRejected,
  isApiSuccess,
  isApiError,
  hasFormErrors,
  isNotNullish,
  isValidEmail,
  isValidEntityId,
  isLoading,
  isAsyncSuccess,
  isAsyncError,
} from "./index";

// Sample organization data
export const sampleOrganization: Organization = {
  id: "org_001",
  name: "ABC회사",
  domain: "abc.com",
  verified: true,
};

export const sampleUnverifiedOrganization: Organization = {
  id: "org_002",
  name: "XYZ스타트업",
  domain: "xyz.co.kr",
  verified: false,
};

export const sampleTargetOrganization: Organization = {
  id: "org_003",
  name: "DEF기업",
  domain: "def.com",
  verified: true,
};

// Sample user data - corporate user
export const sampleCorporateUser: User = {
  id: "user_001",
  email: "hong@abc.com",
  name: "홍길동",
  type: "corporate",
  organization: sampleOrganization,
};

// Sample user data - talent (no organization)
export const sampleTalentUser: User = {
  id: "user_002",
  email: "kim@personal.com",
  name: "김철수",
  type: "talent",
  // organization is optional for talent users
};

// Sample corporate user without organization (should still be valid)
export const sampleCorporateUserWithoutOrg: User = {
  id: "user_003",
  email: "lee@company.com",
  name: "이영희",
  type: "corporate",
  // organization is optional in the interface
};

// Sample respondent users from target organization
export const sampleRespondent1: User = {
  id: "user_004",
  email: "manager@def.com",
  name: "박매니저",
  type: "corporate",
  organization: sampleTargetOrganization,
};

export const sampleRespondent2: User = {
  id: "user_005",
  email: "hr@def.com",
  name: "최인사",
  type: "corporate",
  organization: sampleTargetOrganization,
};

// Sample RequestCompany data
export const sampleRequestCompany: RequestCompany = {
  organization: sampleTargetOrganization,
  respondents: [sampleRespondent1, sampleRespondent2],
  status: "pending",
  requestedAt: new Date("2024-03-15T10:00:00Z"),
};

export const sampleRespondedRequestCompany: RequestCompany = {
  organization: sampleOrganization,
  respondents: [sampleCorporateUser],
  status: "responded",
  requestedAt: new Date("2024-03-14T09:00:00Z"),
  respondedAt: new Date("2024-03-16T14:30:00Z"),
};

export const sampleRejectedRequestCompany: RequestCompany = {
  organization: sampleUnverifiedOrganization,
  respondents: [],
  status: "rejected",
  requestedAt: new Date("2024-03-13T08:00:00Z"),
  rejectionReason: "해당 직원에 대한 정보가 없습니다.",
};

// Sample ReferenceRequest data
export const sampleReferenceRequest: ReferenceRequest = {
  id: "req_001",
  talentName: "김철수",
  talentEmail: "kim@personal.com",
  position: "백엔드 개발자",
  status: "in_progress",
  companies: [
    sampleRequestCompany,
    sampleRespondedRequestCompany,
    sampleRejectedRequestCompany,
  ],
  createdAt: new Date("2024-03-15T09:00:00Z"),
  updatedAt: new Date("2024-03-16T14:30:00Z"),
  createdBy: sampleCorporateUser,
  notes: "3년 경력의 백엔드 개발자, Node.js 및 Python 경험",
};

export const sampleCompletedReferenceRequest: ReferenceRequest = {
  id: "req_002",
  talentName: "이영수",
  talentEmail: "lee@example.com",
  position: "프론트엔드 개발자",
  status: "completed",
  companies: [sampleRespondedRequestCompany],
  createdAt: new Date("2024-03-10T10:00:00Z"),
  updatedAt: new Date("2024-03-12T16:00:00Z"),
  createdBy: sampleCorporateUser,
};

// ============================================================================
// API Sample Data
// ============================================================================

// Sample API Response
export const sampleApiResponse: ApiResponse<User> = {
  success: true,
  data: sampleCorporateUser,
  message: "User retrieved successfully",
};

export const sampleApiListResponse: ApiResponse<ReferenceRequest[]> = {
  success: true,
  data: [sampleReferenceRequest, sampleCompletedReferenceRequest],
  meta: {
    total: 2,
    page: 1,
    limit: 10,
    hasMore: false,
  },
};

// Sample API Error
export const sampleApiError: ApiError = {
  status: 404,
  code: "USER_NOT_FOUND",
  message: "사용자를 찾을 수 없습니다.",
  details: {
    userId: "user_999",
    searchedAt: "2024-03-15T10:00:00Z",
  },
  timestamp: "2024-03-15T10:00:00Z",
};

// Sample Authentication API Data
export const sampleLoginRequest: LoginRequest = {
  email: "hong@abc.com",
  password: "securePassword123",
  rememberMe: true,
};

export const sampleLoginResponse: LoginResponse = {
  user: sampleCorporateUser,
  accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  expiresIn: 3600,
};

export const sampleCorporateSignupRequest: CorporateSignupRequest = {
  email: "newuser@company.com",
  name: "신규사용자",
  password: "securePassword123",
  organization: {
    name: "신규회사",
    domain: "company.com",
  },
  agreeToTerms: true,
};

// Sample Reference Request API Data
export const sampleCreateReferenceRequest: CreateReferenceRequestRequest = {
  talentName: "김철수",
  talentEmail: "kim@personal.com",
  position: "백엔드 개발자",
  organizationIds: ["org_003", "org_001"],
  notes: "3년 경력의 백엔드 개발자",
};

export const sampleReferenceRequestListParams: ReferenceRequestListParams = {
  page: 1,
  limit: 10,
  sortBy: "createdAt",
  sortOrder: "desc",
  status: "in_progress",
  talentName: "김",
  createdAfter: "2024-03-01",
  createdBefore: "2024-03-31",
};

export const sampleSubmitReferenceResponse: SubmitReferenceResponseRequest = {
  token: "invitation_token_abc123",
  responses: [
    {
      questionId: "q1",
      answer: "매우 우수한 개발자였습니다.",
      rating: 5,
    },
    {
      questionId: "q2",
      answer: "팀워크가 뛰어나고 커뮤니케이션 능력이 좋습니다.",
      rating: 4,
    },
  ],
  comments: "추가적으로, 새로운 기술 습득에 적극적이었습니다.",
};

// Sample Organization API Data
export const sampleOrganizationSearchParams: OrganizationSearchParams = {
  query: "ABC",
  limit: 10,
  verifiedOnly: true,
};

// Sample User API Data
export const sampleUpdateUserProfile: UpdateUserProfileRequest = {
  name: "홍길동 업데이트",
  email: "hong.updated@abc.com",
  organization: {
    name: "ABC회사 업데이트",
  },
};

export const sampleChangePassword: ChangePasswordRequest = {
  currentPassword: "oldPassword123",
  newPassword: "newSecurePassword456",
};

// ============================================================================
// Form State Sample Data
// ============================================================================

// Sample field errors
export const sampleFieldError: FieldError = {
  message: "이메일 형식이 올바르지 않습니다.",
  type: "validation",
};

export const sampleFormErrors: FormErrors<{ email: string; password: string }> =
  {
    email: sampleFieldError,
    password: {
      message: "비밀번호는 8자 이상이어야 합니다.",
      type: "validation",
    },
  };

// Sample login form state
export const sampleLoginFormState: LoginFormState = {
  isSubmitting: false,
  isSubmitted: false,
  isDirty: true,
  values: {
    email: "hong@abc.com",
    password: "password123",
    rememberMe: true,
  },
  errors: {},
};

export const sampleLoginFormStateWithErrors: LoginFormState = {
  isSubmitting: false,
  isSubmitted: true,
  isDirty: true,
  error: "로그인에 실패했습니다.",
  values: {
    email: "invalid-email",
    password: "123",
    rememberMe: false,
  },
  errors: {
    email: {
      message: "올바른 이메일 주소를 입력하세요.",
      type: "validation",
    },
    password: {
      message: "비밀번호는 8자 이상이어야 합니다.",
      type: "validation",
    },
  },
};

// Sample magic link form state
export const sampleMagicLinkFormState: MagicLinkFormState = {
  isSubmitting: false,
  isSubmitted: false,
  isDirty: false,
  linkSent: false,
  values: {
    email: "",
  },
  errors: {},
};

export const sampleMagicLinkFormStateSuccess: MagicLinkFormState = {
  isSubmitting: false,
  isSubmitted: true,
  isDirty: true,
  linkSent: true,
  success: "로그인 링크가 이메일로 발송되었습니다.",
  values: {
    email: "user@company.com",
  },
  errors: {},
};

// Sample corporate signup form state
export const sampleCorporateSignupFormState: CorporateSignupFormState = {
  isSubmitting: false,
  isSubmitted: false,
  isDirty: false,
  currentStep: 1,
  totalSteps: 3,
  emailVerificationSent: false,
  values: {
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    organizationName: "",
    organizationDomain: "",
    agreeToTerms: false,
    agreeToPrivacy: false,
  },
  errors: {},
};

export const sampleCorporateSignupFormStateStep2: CorporateSignupFormState = {
  isSubmitting: false,
  isSubmitted: false,
  isDirty: true,
  currentStep: 2,
  totalSteps: 3,
  emailVerificationSent: false,
  values: {
    email: "newuser@company.com",
    name: "신규사용자",
    password: "securePassword123",
    confirmPassword: "securePassword123",
    organizationName: "신규회사",
    organizationDomain: "company.com",
    agreeToTerms: false,
    agreeToPrivacy: false,
  },
  errors: {},
};

// Sample reference request wizard state
export const sampleReferenceRequestWizardState: ReferenceRequestWizardState = {
  isSubmitting: false,
  isSubmitted: false,
  isDirty: false,
  currentStep: 1,
  totalSteps: 5,
  stepCompleted: [false, false, false, false, false],
  values: {
    talentName: "",
    talentEmail: "",
    position: "",
    workHistory: [],
    selectedCompanies: [],
    questions: [],
    notes: "",
  },
  errors: {},
};

export const sampleReferenceRequestWizardStateStep3: ReferenceRequestWizardState =
  {
    isSubmitting: false,
    isSubmitted: false,
    isDirty: true,
    currentStep: 3,
    totalSteps: 5,
    stepCompleted: [true, true, false, false, false],
    values: {
      talentName: "김철수",
      talentEmail: "kim@personal.com",
      position: "백엔드 개발자",
      workHistory: [
        {
          id: "wh_001",
          company: "ABC회사",
          position: "주니어 개발자",
          startDate: "2021-01-01",
          endDate: "2023-12-31",
          description: "Node.js 백엔드 개발",
        },
      ],
      selectedCompanies: [
        {
          organizationId: "org_001",
          organizationName: "ABC회사",
          respondentEmails: ["manager@abc.com", "hr@abc.com"],
        },
      ],
      questions: [
        {
          id: "q1",
          text: "해당 직원의 업무 성과는 어떠했나요?",
          type: "rating",
          required: true,
        },
        {
          id: "q2",
          text: "추가 의견이 있다면 작성해주세요.",
          type: "text",
          required: false,
        },
      ],
      notes: "3년 경력의 백엔드 개발자",
    },
    errors: {},
  };

// Sample reference response form state
export const sampleReferenceResponseFormState: ReferenceResponseFormState = {
  isSubmitting: false,
  isSubmitted: false,
  isDirty: false,
  token: "invitation_token_abc123",
  consentGiven: false,
  autoSaveStatus: "idle",
  values: {
    responses: [],
    additionalComments: "",
  },
  errors: {},
};

export const sampleReferenceResponseFormStateInProgress: ReferenceResponseFormState =
  {
    isSubmitting: false,
    isSubmitted: false,
    isDirty: true,
    token: "invitation_token_abc123",
    consentGiven: true,
    autoSaveStatus: "saved",
    lastSaved: new Date("2024-03-15T14:30:00Z"),
    values: {
      responses: [
        {
          questionId: "q1",
          answer: "매우 우수한 개발자였습니다.",
          rating: 5,
        },
        {
          questionId: "q2",
          answer: "팀워크가 뛰어나고 커뮤니케이션 능력이 좋습니다.",
        },
      ],
      additionalComments: "추가적으로, 새로운 기술 습득에 적극적이었습니다.",
    },
    errors: {},
  };

// Sample user profile form state
export const sampleUserProfileFormState: UserProfileFormState = {
  isSubmitting: false,
  isSubmitted: false,
  isDirty: false,
  changesSaved: false,
  values: {
    name: "홍길동",
    email: "hong@abc.com",
    organizationName: "ABC회사",
    organizationDomain: "abc.com",
  },
  errors: {},
};

// Sample password change form state
export const samplePasswordChangeFormState: PasswordChangeFormState = {
  isSubmitting: false,
  isSubmitted: false,
  isDirty: false,
  values: {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  },
  errors: {},
  passwordStrength: {
    score: 0,
    feedback: [],
  },
};

export const samplePasswordChangeFormStateStrong: PasswordChangeFormState = {
  isSubmitting: false,
  isSubmitted: false,
  isDirty: true,
  values: {
    currentPassword: "oldPassword123",
    newPassword: "newSecurePassword456!",
    confirmPassword: "newSecurePassword456!",
  },
  errors: {},
  passwordStrength: {
    score: 4,
    feedback: ["강력한 비밀번호입니다."],
  },
};

// Sample search filter form state
export const sampleSearchFilterFormState: SearchFilterFormState = {
  isSubmitting: false,
  isSubmitted: false,
  isDirty: false,
  hasActiveFilters: false,
  values: {
    searchQuery: "",
    status: "all",
    dateFrom: "",
    dateTo: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  },
  errors: {},
};

export const sampleSearchFilterFormStateWithFilters: SearchFilterFormState = {
  isSubmitting: false,
  isSubmitted: false,
  isDirty: true,
  hasActiveFilters: true,
  values: {
    searchQuery: "김철수",
    status: "in_progress",
    dateFrom: "2024-03-01",
    dateTo: "2024-03-31",
    sortBy: "updatedAt",
    sortOrder: "desc",
  },
  errors: {},
};

// Sample organization search form state
export const sampleOrganizationSearchFormState: OrganizationSearchFormState = {
  isSubmitting: false,
  isSubmitted: false,
  isDirty: false,
  isSearching: false,
  results: [],
  selectedOrganizations: [],
  values: {
    query: "",
    verifiedOnly: false,
  },
  errors: {},
};

export const sampleOrganizationSearchFormStateWithResults: OrganizationSearchFormState =
  {
    isSubmitting: false,
    isSubmitted: false,
    isDirty: true,
    isSearching: false,
    results: [sampleOrganization, sampleTargetOrganization],
    selectedOrganizations: [sampleOrganization],
    values: {
      query: "ABC",
      verifiedOnly: true,
    },
    errors: {},
  };

// ============================================================================
// Utility Types Sample Data
// ============================================================================

// Sample strongly typed IDs
export const sampleUserId: UserId = "user_001" as UserId;
export const sampleOrganizationId: OrganizationId = "org_001" as OrganizationId;
export const sampleReferenceRequestId: ReferenceRequestId =
  "req_001" as ReferenceRequestId;

// Sample DeepPartial usage
export const sampleDeepPartialUser: DeepPartial<User> = {
  id: "user_001",
  email: "hong@abc.com",
  // name and type are optional with DeepPartial
  organization: {
    id: "org_001",
    name: "ABC회사",
    domain: "abc.com",
    verified: true,
  },
};

// Sample Result types
export const sampleSuccessResult: Result<User> = {
  success: true,
  data: sampleCorporateUser,
};

export const sampleErrorResult: Result<User> = {
  success: false,
  error: new Error("User not found"),
};

// Sample AsyncState types
export const sampleAsyncStateLoading: AsyncState<User> = {
  state: "loading",
};

export const sampleAsyncStateSuccess: AsyncState<User> = {
  state: "success",
  data: sampleCorporateUser,
};

export const sampleAsyncStateError: AsyncState<User> = {
  state: "error",
  error: new Error("Failed to load user"),
};

// Sample FormField type
export const sampleFormField: FormField<string> = {
  value: "hong@abc.com",
  error: undefined,
  touched: true,
  dirty: true,
};

export const sampleFormFieldWithError: FormField<string> = {
  value: "invalid-email",
  error: "올바른 이메일 주소를 입력하세요.",
  touched: true,
  dirty: true,
};

// Sample event handlers
export const sampleClickHandler: ClickHandler = (event) => {
  console.log("Button clicked:", event.target);
};

export const sampleChangeHandler: ChangeHandler<string> = (value) => {
  console.log("Value changed:", value);
};

export const sampleSubmitHandler: SubmitHandler<
  LoginFormState["values"]
> = async (data) => {
  console.log("Form submitted:", data);
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
};

// Type validation tests
export function validateUserTypes() {
  // Test that we can check user types correctly
  const user: User = sampleCorporateUser;

  if (user.type === "corporate") {
    // TypeScript should know that user.type is 'corporate' here
    console.log(`Corporate user: ${user.name}`);
    if (user.organization) {
      console.log(`Organization: ${user.organization.name}`);
    }
  } else if (user.type === "talent") {
    // TypeScript should know that user.type is 'talent' here
    console.log(`Talent user: ${user.name}`);
  }
}

export function validateOrganizationTypes() {
  const org: Organization = sampleOrganization;

  // Test that all required fields are present
  console.log(`Organization ID: ${org.id}`);
  console.log(`Organization Name: ${org.name}`);
  console.log(`Domain: ${org.domain}`);
  console.log(`Verified: ${org.verified ? "Yes" : "No"}`);
}

export function validateReferenceRequestTypes() {
  const request: ReferenceRequest = sampleReferenceRequest;

  // Test status type checking
  if (request.status === "pending") {
    console.log("Request is pending");
  } else if (request.status === "in_progress") {
    console.log("Request is in progress");
  } else if (request.status === "completed") {
    console.log("Request is completed");
  }

  // Test company iteration
  request.companies.forEach((company, index) => {
    console.log(`Company ${index + 1}: ${company.organization.name}`);
    console.log(`Status: ${company.status}`);
    console.log(`Respondents: ${company.respondents.length}`);

    if (company.status === "rejected" && company.rejectionReason) {
      console.log(`Rejection reason: ${company.rejectionReason}`);
    }
  });
}

export function validateRequestCompanyTypes() {
  const company: RequestCompany = sampleRequestCompany;

  // Test status checking
  const status: RequestCompanyStatus = company.status;

  if (status === "pending") {
    console.log("Company request is pending");
  } else if (status === "responded") {
    console.log("Company has responded");
  } else if (status === "rejected") {
    console.log("Company has rejected the request");
  }

  // Test respondent access
  company.respondents.forEach((respondent) => {
    console.log(`Respondent: ${respondent.name} (${respondent.email})`);
  });
}

export function validateApiTypes() {
  // Test API Response
  const response: ApiResponse<User> = sampleApiResponse;
  if (response.success && response.data) {
    console.log(`User: ${response.data.name}`);
  }

  // Test API Error
  const error: ApiError = sampleApiError;
  console.log(`Error ${error.status}: ${error.message}`);

  // Test Login Request/Response
  const loginReq: LoginRequest = sampleLoginRequest;
  const loginRes: LoginResponse = sampleLoginResponse;
  console.log(`Login for: ${loginReq.email}`);
  console.log(`Token expires in: ${loginRes.expiresIn} seconds`);

  // Test Reference Request Creation
  const createReq: CreateReferenceRequestRequest = sampleCreateReferenceRequest;
  console.log(`Creating request for: ${createReq.talentName}`);
  console.log(`Target organizations: ${createReq.organizationIds.length}`);
}

export function validateFormStateTypes() {
  // Test Login Form State
  const loginForm: LoginFormState = sampleLoginFormState;
  console.log(`Login form email: ${loginForm.values.email}`);
  console.log(`Is submitting: ${loginForm.isSubmitting}`);
  console.log(`Has errors: ${Object.keys(loginForm.errors).length > 0}`);

  // Test Corporate Signup Form State
  const signupForm: CorporateSignupFormState = sampleCorporateSignupFormState;
  console.log(
    `Signup form step: ${signupForm.currentStep}/${signupForm.totalSteps}`
  );
  console.log(`Email verification sent: ${signupForm.emailVerificationSent}`);

  // Test Reference Request Wizard State
  const wizardState: ReferenceRequestWizardState =
    sampleReferenceRequestWizardState;
  console.log(
    `Wizard step: ${wizardState.currentStep}/${wizardState.totalSteps}`
  );
  console.log(
    `Steps completed: ${wizardState.stepCompleted.filter(Boolean).length}`
  );

  // Test Reference Response Form State
  const responseForm: ReferenceResponseFormState =
    sampleReferenceResponseFormState;
  console.log(`Response form token: ${responseForm.token}`);
  console.log(`Consent given: ${responseForm.consentGiven}`);
  console.log(`Auto-save status: ${responseForm.autoSaveStatus}`);

  // Test Organization Search Form State
  const searchForm: OrganizationSearchFormState =
    sampleOrganizationSearchFormState;
  console.log(`Search query: ${searchForm.values.query}`);
  console.log(`Results count: ${searchForm.results.length}`);
  console.log(
    `Selected organizations: ${searchForm.selectedOrganizations.length}`
  );
}

export function validateUtilityTypes() {
  // Test strongly typed IDs
  const userId: UserId = sampleUserId;
  const orgId: OrganizationId = sampleOrganizationId;
  const requestId: ReferenceRequestId = sampleReferenceRequestId;

  console.log(`User ID: ${userId}`);
  console.log(`Organization ID: ${orgId}`);
  console.log(`Request ID: ${requestId}`);

  // Test DeepPartial
  const partialUser: DeepPartial<User> = sampleDeepPartialUser;
  console.log(`Partial user email: ${partialUser.email}`);
  console.log(`Partial user org name: ${partialUser.organization?.name}`);

  // Test Result types
  const successResult: Result<User> = sampleSuccessResult;
  const errorResult: Result<User> = sampleErrorResult;

  if (successResult.success) {
    console.log(`Success result: ${successResult.data.name}`);
  }

  if (!errorResult.success) {
    console.log(`Error result: ${errorResult.error.message}`);
  }

  // Test AsyncState types
  const loadingState: AsyncState<User> = sampleAsyncStateLoading;
  const successState: AsyncState<User> = sampleAsyncStateSuccess;
  const errorState: AsyncState<User> = sampleAsyncStateError;

  console.log(`Loading state: ${loadingState.state}`);
  console.log(
    `Success state: ${successState.state}, data: ${successState.data?.name}`
  );
  console.log(
    `Error state: ${errorState.state}, error: ${errorState.error?.message}`
  );

  // Test FormField type
  const field: FormField<string> = sampleFormField;
  const fieldWithError: FormField<string> = sampleFormFieldWithError;

  console.log(`Field value: ${field.value}, touched: ${field.touched}`);
  console.log(`Field with error: ${fieldWithError.error}`);
}

export function validateTypeGuards() {
  // Test user type guards
  const corporateUser = sampleCorporateUser;
  const talentUser = sampleTalentUser;

  console.log(`Is corporate user: ${isCorporateUser(corporateUser)}`);
  console.log(`Is talent user: ${isTalentUser(talentUser)}`);
  console.log(`Corporate user is talent: ${isTalentUser(corporateUser)}`);
  console.log(`Talent user is corporate: ${isCorporateUser(talentUser)}`);

  // Test organization verification
  const verifiedOrg = sampleOrganization;
  const unverifiedOrg = sampleUnverifiedOrganization;

  console.log(
    `Verified org is verified: ${isVerifiedOrganization(verifiedOrg)}`
  );
  console.log(
    `Unverified org is verified: ${isVerifiedOrganization(unverifiedOrg)}`
  );

  // Test request status guards
  const inProgressRequest = sampleReferenceRequest;
  const completedRequest = sampleCompletedReferenceRequest;

  console.log(
    `In-progress request is in progress: ${isInProgressRequest(
      inProgressRequest
    )}`
  );
  console.log(
    `Completed request is completed: ${isCompletedRequest(completedRequest)}`
  );
  console.log(
    `In-progress request is completed: ${isCompletedRequest(inProgressRequest)}`
  );

  // Test company status guards
  const pendingCompany = sampleRequestCompany;
  const respondedCompany = sampleRespondedRequestCompany;
  const rejectedCompany = sampleRejectedRequestCompany;

  console.log(
    `Pending company has responded: ${hasCompanyResponded(pendingCompany)}`
  );
  console.log(
    `Responded company has responded: ${hasCompanyResponded(respondedCompany)}`
  );
  console.log(
    `Rejected company was rejected: ${wasCompanyRequestRejected(
      rejectedCompany
    )}`
  );

  // Test API response guards
  const successResponse = sampleApiResponse;
  const errorResponse: ApiResponse<User> = {
    success: false,
    message: "Error occurred",
  };

  console.log(`Success response is success: ${isApiSuccess(successResponse)}`);
  console.log(`Error response is success: ${isApiSuccess(errorResponse)}`);
  console.log(`Success response is error: ${isApiError(successResponse)}`);
  console.log(`Error response is error: ${isApiError(errorResponse)}`);

  // Test form error guards
  const formWithErrors = sampleFormErrors;
  const formWithoutErrors: FormErrors<{ email: string }> = {};

  console.log(`Form with errors has errors: ${hasFormErrors(formWithErrors)}`);
  console.log(
    `Form without errors has errors: ${hasFormErrors(formWithoutErrors)}`
  );

  // Test null checks
  const nullValue: string | null = null;
  const stringValue: string | null = "hello";

  console.log(`Null value is not nullish: ${isNotNullish(nullValue)}`);
  console.log(`String value is not nullish: ${isNotNullish(stringValue)}`);

  // Test email validation
  const validEmail = "user@example.com";
  const invalidEmail = "invalid-email";

  console.log(`Valid email is valid: ${isValidEmail(validEmail)}`);
  console.log(`Invalid email is valid: ${isValidEmail(invalidEmail)}`);

  // Test entity ID validation
  const validId = "user_001";
  const invalidId = "";

  console.log(`Valid ID is valid: ${isValidEntityId(validId)}`);
  console.log(`Invalid ID is valid: ${isValidEntityId(invalidId)}`);

  // Test async state guards
  const loading = sampleAsyncStateLoading;
  const success = sampleAsyncStateSuccess;
  const error = sampleAsyncStateError;

  console.log(`Loading state is loading: ${isLoading(loading)}`);
  console.log(`Success state is loading: ${isLoading(success)}`);
  console.log(`Success state is success: ${isAsyncSuccess(success)}`);
  console.log(`Error state is error: ${isAsyncError(error)}`);
}
