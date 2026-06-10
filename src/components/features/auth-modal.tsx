"use client";

import { useState, type FormEvent } from "react";
import { Mail, Lock, User, ArrowRight, GraduationCap } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth-context";
import { cn } from "@/lib/utils";

type AuthMode = "login" | "signup";

/**
 * Login/Signup modal using shadcn/ui Dialog + form components.
 *
 * Features:
 * - Toggle between Login and Signup modes
 * - Client-side validation (required fields, email format)
 * - Mock submission via AuthContext
 * - Responsive design — full-width on mobile
 * - Accessible: proper labels, aria, focus management via Dialog
 */
export function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, login, signup } = useAuth();
  const [mode, setMode] = useState<AuthMode>("login");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ── Form state ────────────────────────────────────────────
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ── Reset form when switching modes ───────────────────────
  function switchMode(newMode: AuthMode) {
    setMode(newMode);
    setErrors({});
  }

  // ── Validation ────────────────────────────────────────────
  function validate(): boolean {
    const newErrors: Record<string, string> = {};

    if (mode === "signup" && !name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // ── Submit ────────────────────────────────────────────────
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (mode === "login") {
      login(name || email.split("@")[0], email);
    } else {
      signup(name, email);
    }

    // Reset form
    setName("");
    setEmail("");
    setPassword("");
    setErrors({});
    setIsSubmitting(false);
  }

  return (
    <Dialog open={isAuthModalOpen} onOpenChange={(open) => !open && closeAuthModal()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          {/* Logo / Brand */}
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950/50">
            <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <DialogTitle className="text-center text-lg">
            {mode === "login" ? "Welcome back" : "Create an account"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {mode === "login"
              ? "Sign in to save colleges and track your shortlist."
              : "Join CollegeDiscovery to save and compare colleges."}
          </DialogDescription>
        </DialogHeader>

        {/* ── Form ──────────────────────────────────────────── */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {/* Name field (signup only) */}
          {mode === "signup" && (
            <div className="space-y-1.5">
              <Label htmlFor="auth-name" className="text-sm font-medium">
                Full Name
              </Label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="auth-name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                  }}
                  className={cn("h-10 pl-10", errors.name && "border-red-500 focus-visible:ring-red-500/20")}
                  aria-invalid={!!errors.name}
                />
              </div>
              {errors.name && (
                <p className="text-xs text-red-600 dark:text-red-400">{errors.name}</p>
              )}
            </div>
          )}

          {/* Email field */}
          <div className="space-y-1.5">
            <Label htmlFor="auth-email" className="text-sm font-medium">
              Email
            </Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                id="auth-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                }}
                className={cn("h-10 pl-10", errors.email && "border-red-500 focus-visible:ring-red-500/20")}
                aria-invalid={!!errors.email}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-600 dark:text-red-400">{errors.email}</p>
            )}
          </div>

          {/* Password field */}
          <div className="space-y-1.5">
            <Label htmlFor="auth-password" className="text-sm font-medium">
              Password
            </Label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                id="auth-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
                }}
                className={cn("h-10 pl-10", errors.password && "border-red-500 focus-visible:ring-red-500/20")}
                aria-invalid={!!errors.password}
              />
            </div>
            {errors.password && (
              <p className="text-xs text-red-600 dark:text-red-400">{errors.password}</p>
            )}
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            className="h-10 w-full gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                {mode === "login" ? "Signing in..." : "Creating account..."}
              </span>
            ) : (
              <>
                {mode === "login" ? "Sign In" : "Create Account"}
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        {/* ── Mode toggle ───────────────────────────────────── */}
        <div className="pt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          {mode === "login" ? (
            <>
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => switchMode("signup")}
                className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => switchMode("login")}
                className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Sign in
              </button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
