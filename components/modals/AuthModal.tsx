"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Lock,
  Mail,
  KeyRound,
  Loader2,
  AlertCircle,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  Eye,
  EyeOff,
  Send,
} from "lucide-react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/ToastContext";

export const OFFICIAL_ADMIN_EMAIL = "anuragmishra.mail@proton.me";
export const MASTER_ADMIN_PASSWORD = "Sazal2003";

export type AuthMode = "signIn" | "forgotPassword" | "updatePassword" | "signUp";

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: AuthMode;
  onClose: () => void;
  onSuccess: () => void;
}

export function AuthModal({
  isOpen,
  initialMode = "signIn",
  onClose,
  onSuccess,
}: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState(OFFICIAL_ADMIN_EMAIL);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { success, error: toastError } = useToast();

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setEmail(OFFICIAL_ADMIN_EMAIL);
      setPassword("");
      setConfirmPassword("");
      setResetSent(false);
      setErrorMessage(null);
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const isOfficialEmail = email.trim().toLowerCase() === OFFICIAL_ADMIN_EMAIL.toLowerCase();

  // 1. Handle Sign In
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!isOfficialEmail) {
      const msg = `Access Restricted: Only the official administrator (${OFFICIAL_ADMIN_EMAIL}) is authorized to log in.`;
      setErrorMessage(msg);
      toastError("Access Denied", msg);
      return;
    }

    const trimmedPassword = password.trim();
    const isMaster = trimmedPassword === MASTER_ADMIN_PASSWORD;

    setLoading(true);

    if (isSupabaseConfigured()) {
      const supabase = createClient();

      try {
        // Try logging in via Supabase Auth
        const { data, error } = await supabase.auth.signInWithPassword({
          email: OFFICIAL_ADMIN_EMAIL,
          password: trimmedPassword,
        });

        if (data?.session) {
          try {
            localStorage.setItem("portfolio_demo_admin", "true");
          } catch {}
          success("Welcome Anurag", "Admin mode unlocked. You can now manage your live content.");
          onSuccess();
          onClose();
          return;
        }

        // If Supabase sign-in fails but master password matches
        if (isMaster) {
          // Attempt background sign-up in Supabase so the account is registered
          try {
            await supabase.auth.signUp({
              email: OFFICIAL_ADMIN_EMAIL,
              password: MASTER_ADMIN_PASSWORD,
            });
          } catch {}

          try {
            localStorage.setItem("portfolio_demo_admin", "true");
          } catch {}
          success("Welcome Anurag", "Admin access verified via master credentials.");
          onSuccess();
          onClose();
          return;
        }

        if (error) {
          setErrorMessage(error.message);
          toastError("Authentication Failed", error.message);
        }
      } catch (err: unknown) {
        if (isMaster) {
          try {
            localStorage.setItem("portfolio_demo_admin", "true");
          } catch {}
          success("Welcome Anurag", "Admin access verified.");
          onSuccess();
          onClose();
          return;
        }
        const msg = err instanceof Error ? err.message : "Authentication error occurred";
        setErrorMessage(msg);
        toastError("Error", msg);
      } finally {
        setLoading(false);
      }
      return;
    }

    // Offline / Demo Mode fallback
    if (isMaster || trimmedPassword.length >= 6) {
      try {
        localStorage.setItem("portfolio_demo_admin", "true");
      } catch {}
      success("Welcome Anurag", `Admin mode active (${OFFICIAL_ADMIN_EMAIL})`);
      onSuccess();
      onClose();
    } else {
      setErrorMessage("Invalid password. Please use your master password.");
    }
    setLoading(false);
  };

  // 2. Handle Send Password Reset / Setup Link
  const handleSendResetEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!isSupabaseConfigured()) {
      setErrorMessage("Supabase is not configured in this environment.");
      return;
    }

    setLoading(true);
    const supabase = createClient();

    try {
      const redirectUrl = typeof window !== "undefined" ? window.location.origin : undefined;
      const { error } = await supabase.auth.resetPasswordForEmail(OFFICIAL_ADMIN_EMAIL, {
        redirectTo: redirectUrl,
      });

      if (error) {
        setErrorMessage(error.message);
        toastError("Request Failed", error.message);
      } else {
        setResetSent(true);
        success("Email Sent", `A password setup link was dispatched to ${OFFICIAL_ADMIN_EMAIL}.`);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to send reset link";
      setErrorMessage(msg);
      toastError("Error", msg);
    } finally {
      setLoading(false);
    }
  };

  // 3. Handle Update Password (when setting a new password)
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (!isSupabaseConfigured()) {
      try {
        localStorage.setItem("portfolio_demo_admin", "true");
      } catch {}
      success("Password Updated", "Admin password saved locally.");
      onSuccess();
      onClose();
      return;
    }

    setLoading(true);
    const supabase = createClient();

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        setErrorMessage(error.message);
        toastError("Password Update Failed", error.message);
      } else {
        try {
          localStorage.setItem("portfolio_demo_admin", "true");
        } catch {}
        success("Password Updated", "Your new master password is now active.");
        onSuccess();
        onClose();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update password";
      setErrorMessage(msg);
      toastError("Error", msg);
    } finally {
      setLoading(false);
    }
  };

  // 4. Handle Sign Up / Initial Password Registration
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!isOfficialEmail) {
      setErrorMessage(`Only ${OFFICIAL_ADMIN_EMAIL} can be registered as Administrator.`);
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (!isSupabaseConfigured()) {
      try {
        localStorage.setItem("portfolio_demo_admin", "true");
      } catch {}
      success("Admin Registered", "Password saved in browser storage.");
      onSuccess();
      onClose();
      return;
    }

    setLoading(true);
    const supabase = createClient();

    try {
      const { data, error } = await supabase.auth.signUp({
        email: OFFICIAL_ADMIN_EMAIL,
        password,
      });

      if (error) {
        setErrorMessage(error.message);
        toastError("Registration Error", error.message);
      } else if (data.session) {
        try {
          localStorage.setItem("portfolio_demo_admin", "true");
        } catch {}
        success("Account Created", "You are now logged in as Admin.");
        onSuccess();
        onClose();
      } else {
        success("Registration Sent", "Check your Proton email to confirm, or sign in directly with master credentials.");
        setMode("signIn");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Registration failed";
      setErrorMessage(msg);
      toastError("Error", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-navy-900 border border-navy-400 rounded-xl p-6 sm:p-7 shadow-2xl text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-muted hover:text-white rounded-lg transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-lg bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-serif text-lg font-medium text-white">
              {mode === "signIn" && "Admin Authentication"}
              {mode === "forgotPassword" && "Setup / Reset Password"}
              {mode === "updatePassword" && "Set Master Password"}
              {mode === "signUp" && "Register Admin Password"}
            </h2>
            <p className="text-[11px] font-sans text-muted">
              Portfolio Content Management System
            </p>
          </div>
        </div>

        {/* Authorized Badge */}
        <div className="mt-4 p-2.5 rounded-lg bg-navy-950 border border-gold-500/20 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <div className="text-[11px] font-sans text-muted truncate">
            Authorized Account:{" "}
            <span className="text-gold-300 font-mono font-medium">
              {OFFICIAL_ADMIN_EMAIL}
            </span>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mt-3 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2 animate-fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
            <div className="flex-1 leading-relaxed">{errorMessage}</div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* MODE: FORGOT PASSWORD / SEND SETUP LINK */}
        {/* ===================================================================== */}
        {mode === "forgotPassword" && (
          <form onSubmit={handleSendResetEmail} className="mt-5 space-y-4">
            {resetSent ? (
              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <div className="font-semibold text-sm">Setup Link Dispatched</div>
                <p className="text-emerald-200/80 text-[11px] leading-relaxed">
                  We sent a secure password setup link to{" "}
                  <span className="font-mono text-white">{OFFICIAL_ADMIN_EMAIL}</span>. Open the link to set your password.
                </p>
              </div>
            ) : (
              <div>
                <p className="text-xs font-sans text-body leading-relaxed mb-3">
                  Click below to dispatch an email to your official Proton account with a secure link to configure or update your master password.
                </p>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gold-400" />
                  <input
                    type="email"
                    disabled
                    value={OFFICIAL_ADMIN_EMAIL}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-navy-950 border border-navy-400 rounded-lg text-gold-300 font-mono opacity-80 cursor-not-allowed"
                  />
                </div>
              </div>
            )}

            {!resetSent && (
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 bg-gold-500 text-navy-950 font-medium text-xs font-sans uppercase tracking-widest rounded-lg hover:bg-gold-400 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Dispatching Link...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Password Link</span>
                  </>
                )}
              </button>
            )}

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setMode("signIn")}
                className="inline-flex items-center gap-1 text-xs font-sans text-muted hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Sign In</span>
              </button>
            </div>
          </form>
        )}

        {/* ===================================================================== */}
        {/* MODE: UPDATE PASSWORD */}
        {/* ===================================================================== */}
        {mode === "updatePassword" && (
          <form onSubmit={handleUpdatePassword} className="mt-5 space-y-4">
            <div>
              <label className="block text-xs font-sans uppercase tracking-wider text-muted mb-1">
                New Master Password
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-2.5 w-4 h-4 text-muted" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-9 pr-10 py-2 text-xs bg-navy-950 border border-navy-400 rounded-lg text-white placeholder:text-muted/50 focus:outline-none focus:border-gold-500/60 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-muted hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-sans uppercase tracking-wider text-muted mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-2.5 w-4 h-4 text-muted" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-navy-950 border border-navy-400 rounded-lg text-white placeholder:text-muted/50 focus:outline-none focus:border-gold-500/60 font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-gold-500 text-navy-950 font-medium text-xs font-sans uppercase tracking-widest rounded-lg hover:bg-gold-400 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving Password...</span>
                </>
              ) : (
                <span>Save Master Password</span>
              )}
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setMode("signIn")}
                className="inline-flex items-center gap-1 text-xs font-sans text-muted hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Sign In</span>
              </button>
            </div>
          </form>
        )}

        {/* ===================================================================== */}
        {/* MODE: SIGN UP (Initial Registration) */}
        {/* ===================================================================== */}
        {mode === "signUp" && (
          <form onSubmit={handleSignUp} className="mt-5 space-y-4">
            <div>
              <label className="block text-xs font-sans uppercase tracking-wider text-muted mb-1">
                Official Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gold-400" />
                <input
                  type="email"
                  disabled
                  value={OFFICIAL_ADMIN_EMAIL}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-navy-950 border border-navy-400 rounded-lg text-gold-300 font-mono opacity-80 cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-sans uppercase tracking-wider text-muted mb-1">
                Set Password
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-2.5 w-4 h-4 text-muted" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Set initial password"
                  className="w-full pl-9 pr-10 py-2 text-xs bg-navy-950 border border-navy-400 rounded-lg text-white placeholder:text-muted/50 focus:outline-none focus:border-gold-500/60 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-muted hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-sans uppercase tracking-wider text-muted mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-2.5 w-4 h-4 text-muted" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-navy-950 border border-navy-400 rounded-lg text-white placeholder:text-muted/50 focus:outline-none focus:border-gold-500/60 font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-gold-500 text-navy-950 font-medium text-xs font-sans uppercase tracking-widest rounded-lg hover:bg-gold-400 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Registering...</span>
                </>
              ) : (
                <span>Register Master Password</span>
              )}
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setMode("signIn")}
                className="inline-flex items-center gap-1 text-xs font-sans text-muted hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Already registered? Sign In</span>
              </button>
            </div>
          </form>
        )}

        {/* ===================================================================== */}
        {/* MODE: SIGN IN (Default) */}
        {/* ===================================================================== */}
        {mode === "signIn" && (
          <form onSubmit={handleSignIn} className="mt-5 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-sans uppercase tracking-wider text-muted">
                  Official Email
                </label>
                <span className="text-[10px] font-mono text-gold-400">Authorized</span>
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gold-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={OFFICIAL_ADMIN_EMAIL}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-navy-950 border border-navy-400 rounded-lg text-white placeholder:text-muted/50 focus:outline-none focus:border-gold-500/60 font-mono"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-sans uppercase tracking-wider text-muted">
                  Master Password
                </label>
                <button
                  type="button"
                  onClick={() => setMode("forgotPassword")}
                  className="text-[11px] font-sans text-gold-400 hover:text-gold-300 transition-colors"
                >
                  Set / Reset via Email
                </button>
              </div>
              <div className="relative">
                <KeyRound className="absolute left-3 top-2.5 w-4 h-4 text-muted" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-10 py-2 text-sm bg-navy-950 border border-navy-400 rounded-lg text-white placeholder:text-muted/50 focus:outline-none focus:border-gold-500/60 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-muted hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-2.5 px-4 bg-gold-500 text-navy-950 font-medium text-xs font-sans uppercase tracking-widest rounded-lg hover:bg-gold-400 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <span>Sign In to Admin Mode</span>
              )}
            </button>

            {/* Helper Links */}
            <div className="pt-3 border-t border-navy-400 flex flex-col gap-2 text-center text-xs font-sans text-muted">
              <button
                type="button"
                onClick={() => setMode("forgotPassword")}
                className="hover:text-gold-400 transition-colors"
              >
                Forgot password or need to reset? Click here &rarr;
              </button>
              <button
                type="button"
                onClick={() => setMode("signUp")}
                className="text-[11px] text-muted/70 hover:text-white transition-colors"
              >
                Register or update initial password
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
