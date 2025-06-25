import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

// Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  organization?: string;
  role?: "admin" | "member" | "viewer";
  verified?: boolean;
}

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthContextType {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  getCurrentUser: () => User | null;
  updateUser: (updates: Partial<User>) => void;
  refreshAuthToken: () => Promise<void>;

  // Utilities
  hasRole: (role: User["role"]) => boolean;
  isTokenExpired: () => boolean;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Storage keys
const STORAGE_KEYS = {
  ACCESS_TOKEN: "ask2_access_token",
  REFRESH_TOKEN: "ask2_refresh_token",
  TOKEN_EXPIRES_AT: "ask2_token_expires_at",
  USER_DATA: "ask2_user_data",
  REMEMBER_ME: "ask2_remember_me",
} as const;

// Mock API functions (replace with real API calls)
const mockAPI = {
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

  async refreshToken(refreshToken: string): Promise<AuthToken> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      accessToken: "mock_new_access_token_" + Date.now(),
      refreshToken: refreshToken,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000,
    };
  },

  async getCurrentUser(token: string): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 500));

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
};

// Utility functions
const getStorageMethod = (rememberMe: boolean) => {
  return rememberMe ? localStorage : sessionStorage;
};

const storeTokens = (tokens: AuthToken, rememberMe: boolean = false) => {
  const storage = getStorageMethod(rememberMe);

  storage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokens.accessToken);
  storage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken);
  storage.setItem(STORAGE_KEYS.TOKEN_EXPIRES_AT, tokens.expiresAt.toString());
  storage.setItem(STORAGE_KEYS.REMEMBER_ME, rememberMe.toString());
};

const getStoredTokens = (): AuthToken | null => {
  // Try localStorage first, then sessionStorage
  let storage = localStorage;
  let accessToken = storage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

  if (!accessToken) {
    storage = sessionStorage;
    accessToken = storage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  if (!accessToken) return null;

  const refreshToken = storage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  const expiresAt = storage.getItem(STORAGE_KEYS.TOKEN_EXPIRES_AT);

  if (!refreshToken || !expiresAt) return null;

  return {
    accessToken,
    refreshToken,
    expiresAt: parseInt(expiresAt),
  };
};

const storeUser = (user: User, rememberMe: boolean = false) => {
  const storage = getStorageMethod(rememberMe);
  storage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
};

const getStoredUser = (): User | null => {
  // Try localStorage first, then sessionStorage
  let userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
  if (!userData) {
    userData = sessionStorage.getItem(STORAGE_KEYS.USER_DATA);
  }

  return userData ? JSON.parse(userData) : null;
};

const clearStorage = () => {
  // Clear from both localStorage and sessionStorage
  Object.values(STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  });
};

const isTokenExpired = (expiresAt: number): boolean => {
  return Date.now() >= expiresAt;
};

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state on app start
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const tokens = getStoredTokens();
        const storedUser = getStoredUser();

        if (tokens && storedUser && !isTokenExpired(tokens.expiresAt)) {
          setUser(storedUser);
        } else if (
          tokens &&
          tokens.refreshToken &&
          !isTokenExpired(tokens.expiresAt - 5 * 60 * 1000)
        ) {
          // Try to refresh token if it expires in less than 5 minutes
          try {
            const newTokens = await mockAPI.refreshToken(tokens.refreshToken);
            const currentUser = await mockAPI.getCurrentUser(
              newTokens.accessToken
            );

            const rememberMe =
              localStorage.getItem(STORAGE_KEYS.REMEMBER_ME) === "true";
            storeTokens(newTokens, rememberMe);
            storeUser(currentUser, rememberMe);
            setUser(currentUser);
          } catch (error) {
            console.error("Token refresh failed:", error);
            clearStorage();
          }
        } else {
          clearStorage();
        }
      } catch (error) {
        console.error("Auth initialization failed:", error);
        clearStorage();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      const { user: loggedInUser, tokens } = await mockAPI.login(credentials);

      const rememberMe = credentials.rememberMe || false;
      storeTokens(tokens, rememberMe);
      storeUser(loggedInUser, rememberMe);
      setUser(loggedInUser);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    clearStorage();
    setUser(null);
  };

  // Get current user
  const getCurrentUser = (): User | null => {
    return user;
  };

  // Update user
  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);

      const rememberMe =
        localStorage.getItem(STORAGE_KEYS.REMEMBER_ME) === "true";
      storeUser(updatedUser, rememberMe);
    }
  };

  // Refresh auth token
  const refreshAuthToken = async () => {
    const tokens = getStoredTokens();
    if (!tokens || !tokens.refreshToken) {
      throw new Error("No refresh token available");
    }

    try {
      const newTokens = await mockAPI.refreshToken(tokens.refreshToken);
      const rememberMe =
        localStorage.getItem(STORAGE_KEYS.REMEMBER_ME) === "true";
      storeTokens(newTokens, rememberMe);
    } catch (error) {
      console.error("Token refresh failed:", error);
      logout();
      throw error;
    }
  };

  // Check if user has specific role
  const hasRole = (role: User["role"]): boolean => {
    if (!user) return false;

    const roleHierarchy = {
      viewer: 0,
      member: 1,
      admin: 2,
    };

    const userRoleLevel = roleHierarchy[user.role || "viewer"];
    const requiredRoleLevel = roleHierarchy[role || "viewer"];

    return userRoleLevel >= requiredRoleLevel;
  };

  // Check if token is expired
  const checkTokenExpired = (): boolean => {
    const tokens = getStoredTokens();
    return !tokens || isTokenExpired(tokens.expiresAt);
  };

  // Context value
  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    getCurrentUser,
    updateUser,
    refreshAuthToken,
    hasRole,
    isTokenExpired: checkTokenExpired,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Export default
export default AuthContext;
