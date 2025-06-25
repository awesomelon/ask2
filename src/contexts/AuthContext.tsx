import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { authService } from "@/services/authService"; // Import the auth service

// Types (remain the same, or can be moved to a central types file if shared more broadly)
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  organization?: string;
  role?: "admin" | "member" | "viewer"; // UserRole type can be defined
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

// Define UserRole type for clarity
export type UserRole = "admin" | "member" | "viewer";

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  getCurrentUser: () => User | null;
  updateUser: (updates: Partial<User>) => void;
  refreshAuthToken: () => Promise<void>;
  hasRole: (role: UserRole) => boolean;
  isTokenExpired: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Role hierarchy can be defined as a constant
const ROLE_HIERARCHY: Record<UserRole, number> = {
  viewer: 0,
  member: 1,
  admin: 2,
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const tokens = authService.getStoredTokens();
        const storedUser = authService.getStoredUser();

        if (tokens && storedUser && !authService.isTokenExpired(tokens.expiresAt)) {
          setUser(storedUser);
        } else if (
          tokens &&
          tokens.refreshToken &&
          // Check if token is not expired or will expire in less than 5 mins (heuristic)
          !authService.isTokenExpired(tokens.expiresAt - 5 * 60 * 1000)
        ) {
          try {
            const newTokens = await authService.refreshToken(tokens.refreshToken);
            // Assuming getCurrentUser might not be needed if refreshToken itself returns user data
            // or if user data is fairly static and already stored.
            // If user data needs refresh, call:
            const currentUser = await authService.getCurrentUser(newTokens.accessToken);

            const rememberMe = authService.getStorageMethod().getItem("ask2_remember_me") === "true";
            authService.storeTokens(newTokens, rememberMe);
            authService.storeUser(currentUser, rememberMe); // Store potentially updated user
            setUser(currentUser);
          } catch (error) {
            console.error("Token refresh failed during init:", error);
            authService.clearAuthStorage();
          }
        } else {
          // No valid tokens or user, or token is too close to expiry without refresh possibility
          authService.clearAuthStorage();
        }
      } catch (error) {
        console.error("Auth initialization failed:", error);
        authService.clearAuthStorage();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      const { user: loggedInUser, tokens } = await authService.login(credentials);
      const rememberMe = credentials.rememberMe || false;
      authService.storeTokens(tokens, rememberMe);
      authService.storeUser(loggedInUser, rememberMe);
      setUser(loggedInUser);
    } catch (error) {
      console.error("Login failed:", error);
      throw error; // Re-throw to be handled by the caller UI
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.clearAuthStorage();
    setUser(null);
    // Optionally, redirect to login page or home page
    // navigate('/login');
  };

  const getCurrentUser = (): User | null => {
    return user;
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      const rememberMe = authService.getStorageMethod().getItem("ask2_remember_me") === "true";
      authService.storeUser(updatedUser, rememberMe);
    }
  };

  const refreshAuthToken = async () => {
    const tokens = authService.getStoredTokens();
    if (!tokens || !tokens.refreshToken) {
      // This case should ideally lead to logout or re-authentication
      console.warn("No refresh token available for refreshing.");
      logout(); // Example: force logout
      throw new Error("No refresh token available");
    }

    try {
      const newTokens = await authService.refreshToken(tokens.refreshToken);
      const rememberMe = authService.getStorageMethod().getItem("ask2_remember_me") === "true";
      authService.storeTokens(newTokens, rememberMe);
      // Optionally, you might want to fetch updated user info here if it can change
      // const updatedUser = await authService.getCurrentUser(newTokens.accessToken);
      // setUser(updatedUser);
      // authService.storeUser(updatedUser, rememberMe);
    } catch (error) {
      console.error("Token refresh failed:", error);
      logout(); // Force logout on critical refresh failure
      throw error;
    }
  };

  const hasRole = (role: UserRole): boolean => {
    if (!user || !user.role) return false;
    const userRoleLevel = ROLE_HIERARCHY[user.role];
    const requiredRoleLevel = ROLE_HIERARCHY[role];
    return userRoleLevel >= requiredRoleLevel;
  };

  const checkTokenExpired = (): boolean => {
    const tokens = authService.getStoredTokens();
    return !tokens || authService.isTokenExpired(tokens.expiresAt);
  };

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

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
