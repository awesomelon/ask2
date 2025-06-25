import type { User, AuthToken, LoginCredentials } from "@/contexts/AuthContext";

// Storage keys (can be centralized if used by other services)
const STORAGE_KEYS = {
  ACCESS_TOKEN: "ask2_access_token",
  REFRESH_TOKEN: "ask2_refresh_token",
  TOKEN_EXPIRES_AT: "ask2_token_expires_at",
  USER_DATA: "ask2_user_data",
  REMEMBER_ME: "ask2_remember_me",
} as const;

// Mock API functions (replace with real API calls)
export const authService = {
  async login(
    credentials: LoginCredentials
  ): Promise<{ user: User; tokens: AuthToken }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock validation
    if (
      credentials.email === "test@example.com" &&
      credentials.password === "password"
    ) {
      const user: User = {
        id: "1",
        email: credentials.email,
        name: "홍길동",
        avatar: "",
        organization: "ABC회사",
        role: "admin",
        verified: true,
      };

      const tokens: AuthToken = {
        accessToken: "mock_access_token_" + Date.now(),
        refreshToken: "mock_refresh_token_" + Date.now(),
        expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      };

      return { user, tokens };
    }

    throw new Error("Invalid credentials");
  },

  async refreshToken(refreshTokenValue: string): Promise<AuthToken> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Ensure refreshTokenValue is used if needed by the actual API
    console.log("Refreshing token with:", refreshTokenValue);

    return {
      accessToken: "mock_new_access_token_" + Date.now(),
      // Ensure the new refresh token is returned if the API rotates it
      refreshToken: "mock_new_refresh_token_" + Date.now(),
      expiresAt: Date.now() + 24 * 60 * 60 * 1000,
    };
  },

  async getCurrentUser(token: string): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Ensure token is used if needed by the actual API
    console.log("Getting current user with token:", token);

    return {
      id: "1",
      email: "test@example.com",
      name: "홍길동",
      avatar: "",
      organization: "ABC회사",
      role: "admin",
      verified: true,
    };
  },

  // Storage utility functions, potentially moved to a separate storage service
  // For now, keep them co-located for simplicity as they are tightly coupled with auth logic

  getStorageMethod(rememberMe?: boolean): Storage {
    // If rememberMe is explicitly false, use sessionStorage. Otherwise, default to localStorage.
    // This behavior might need adjustment based on how "rememberMe" is initially determined
    // when retrieving tokens/user.
    if (rememberMe === false) {
      return sessionStorage;
    }
    // Check REMEMBER_ME flag from storage if rememberMe param is not provided
    if (typeof rememberMe === 'undefined') {
      const storedRememberMe = localStorage.getItem(STORAGE_KEYS.REMEMBER_ME);
      if (storedRememberMe === 'false') {
        return sessionStorage;
      }
    }
    return localStorage;
  },

  storeTokens(tokens: AuthToken, rememberMe: boolean = false): void {
    const storage = this.getStorageMethod(rememberMe);
    storage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokens.accessToken);
    storage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken);
    storage.setItem(STORAGE_KEYS.TOKEN_EXPIRES_AT, tokens.expiresAt.toString());
    // Always store REMEMBER_ME in localStorage so it can be checked without knowing context
    localStorage.setItem(STORAGE_KEYS.REMEMBER_ME, rememberMe.toString());
  },

  getStoredTokens(): AuthToken | null {
    // Determine storage type based on REMEMBER_ME flag in localStorage
    const rememberMe = localStorage.getItem(STORAGE_KEYS.REMEMBER_ME) === "true";
    const storage = this.getStorageMethod(rememberMe);

    const accessToken = storage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (!accessToken) return null;

    const refreshToken = storage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    const expiresAt = storage.getItem(STORAGE_KEYS.TOKEN_EXPIRES_AT);

    if (!refreshToken || !expiresAt) return null;

    return {
      accessToken,
      refreshToken,
      expiresAt: parseInt(expiresAt),
    };
  },

  storeUser(user: User, rememberMe: boolean = false): void {
    const storage = this.getStorageMethod(rememberMe);
    storage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
  },

  getStoredUser(): User | null {
    const rememberMe = localStorage.getItem(STORAGE_KEYS.REMEMBER_ME) === "true";
    const storage = this.getStorageMethod(rememberMe);
    const userData = storage.getItem(STORAGE_KEYS.USER_DATA);
    return userData ? JSON.parse(userData) : null;
  },

  clearAuthStorage(): void {
    // Clear from both, as we don't know which one was used without checking REMEMBER_ME first
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.TOKEN_EXPIRES_AT);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    // Also clear from sessionStorage
    sessionStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    sessionStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    sessionStorage.removeItem(STORAGE_KEYS.TOKEN_EXPIRES_AT);
    sessionStorage.removeItem(STORAGE_KEYS.USER_DATA);
    // Clear the REMEMBER_ME flag itself
    localStorage.removeItem(STORAGE_KEYS.REMEMBER_ME);
  },

  isTokenExpired(expiresAt: number): boolean {
    return Date.now() >= expiresAt;
  }
};
