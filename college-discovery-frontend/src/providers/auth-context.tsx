"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";

// ============================================================================
// Types
// ============================================================================

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  /** The currently logged-in user, or null */
  user: User | null;
  /** Whether the user is authenticated */
  isAuthenticated: boolean;
  /** IDs of colleges the user has saved/bookmarked */
  savedCollegeIds: string[];
  /** Whether the auth modal is open */
  isAuthModalOpen: boolean;
}

interface AuthActions {
  /** Mock login — accepts any name/email */
  login: (name: string, email: string) => void;
  /** Mock signup — same as login for this mock */
  signup: (name: string, email: string) => void;
  /** Log out and clear saved items */
  logout: () => void;
  /** Toggle a college in the saved list */
  toggleSaveCollege: (collegeId: string) => void;
  /** Check if a college is saved */
  isCollegeSaved: (collegeId: string) => boolean;
  /** Open the auth modal */
  openAuthModal: () => void;
  /** Close the auth modal */
  closeAuthModal: () => void;
}

type AuthContextValue = AuthState & AuthActions;

// ============================================================================
// Context
// ============================================================================

const AuthContext = createContext<AuthContextValue | null>(null);

// ============================================================================
// Provider
// ============================================================================

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * AuthProvider — manages mock authentication and saved colleges.
 *
 * Architecture:
 * - State is kept in-memory (no persistence). On refresh, user is logged out.
 * - In production, swap login/signup with real API calls and add token storage.
 * - savedCollegeIds would be persisted to a backend or localStorage.
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [savedCollegeIds, setSavedCollegeIds] = useState<string[]>([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const isAuthenticated = user !== null;

  // ── Auth actions ──────────────────────────────────────────

  const login = useCallback((name: string, email: string) => {
    // Mock: create a user object from the provided credentials
    const mockUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
    };
    setUser(mockUser);
    setIsAuthModalOpen(false);
  }, []);

  const signup = useCallback((name: string, email: string) => {
    // Mock: signup is identical to login for this MVP
    const mockUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
    };
    setUser(mockUser);
    setIsAuthModalOpen(false);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setSavedCollegeIds([]);
  }, []);

  // ── Saved colleges actions ────────────────────────────────

  const toggleSaveCollege = useCallback(
    (collegeId: string) => {
      if (!isAuthenticated) {
        // If not logged in, prompt the user to log in first
        setIsAuthModalOpen(true);
        return;
      }

      setSavedCollegeIds((prev) =>
        prev.includes(collegeId)
          ? prev.filter((id) => id !== collegeId)
          : [...prev, collegeId]
      );
    },
    [isAuthenticated]
  );

  const isCollegeSaved = useCallback(
    (collegeId: string) => savedCollegeIds.includes(collegeId),
    [savedCollegeIds]
  );

  // ── Modal actions ─────────────────────────────────────────

  const openAuthModal = useCallback(() => setIsAuthModalOpen(true), []);
  const closeAuthModal = useCallback(() => setIsAuthModalOpen(false), []);

  // ── Memoized context value ────────────────────────────────

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated,
      savedCollegeIds,
      isAuthModalOpen,
      login,
      signup,
      logout,
      toggleSaveCollege,
      isCollegeSaved,
      openAuthModal,
      closeAuthModal,
    }),
    [
      user,
      isAuthenticated,
      savedCollegeIds,
      isAuthModalOpen,
      login,
      signup,
      logout,
      toggleSaveCollege,
      isCollegeSaved,
      openAuthModal,
      closeAuthModal,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ============================================================================
// Hook
// ============================================================================

/**
 * Access the auth context. Must be used within an <AuthProvider>.
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an <AuthProvider>");
  }
  return context;
}
