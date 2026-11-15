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

  const { success, error: toastError, info } = useToast();

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

    if (!isSupabaseConfigured()) {
      // Offline fallback
      success("Admin Demo Mode", `Logged in as ${OFFICIAL_ADMIN_EMAIL}`);
      onSuccess();
      onClose();
      return;
    }

    setLoading(true);
    const supabase = createClient();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: OFFICIAL_ADMIN_EMAIL,
        password,
      });

      if (error) {
        setErrorMessage(error.message);
        toastError("Authentication Failed", error.message);
      } else if (data.session) {
        success("Welcome Anurag", "Admin mode unlocked. You can now manage your live content.");
        onSuccess();
        onClose();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Authentication error occurred";
      setErrorMessage(msg);
      toastError("Error", msg);
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle Send Password Reset / Setup Link
  const handleSendResetEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!isSupabaseConfigured()) {
      setErrorMessage("Supabase is not configured yet. Configure NEXT_PUBLIC_SUPABASE_URL & ANON_KEY to send reset emails.");
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
      success("Password Updated", "Demo password saved locally.");
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
        success("Password Set Successfully", "Your new password is now active. Admin mode unlocked.");
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

  // 4. Handle Initial Sign Up (strictly for official email)
  const handleInitialSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!isOfficialEmail) {
      const msg = `Access Restricted: Registration is strictly limited to ${OFFICIAL_ADMIN_EMAIL}.`;
      setErrorMessage(msg);
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (!isSupabaseConfigured()) {
      success("Account Created", "Logged in via demo mode.");
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
        toastError("Sign Up Failed", error.message);
      } else if (data.session) {
        success("Admin Account Created", "Password saved and logged in successfully.");
        onSuccess();
        onClose();
      } else {
        info("Confirmation Sent", `Check ${OFFICIAL_ADMIN_EMAIL} to confirm your account.`);
        onClose();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error creating admin account";
      setErrorMessage(msg);
      toastError("Error", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in font-sans">
      <div className="relative w-full max-w-md p-6 bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl text-zinc-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-emerald-400">
              {mode === "forgotPassword" ? (
                <Send className="w-4 h-4" />
              ) : mode === "updatePassword" ? (
                <KeyRound className="w-4 h-4" />
              ) : (
                <Lock className="w-4 h-4" />
              )}
            </div>
            <div>
              <h3 className="text-base font-medium text-zinc-100">
                {mode === "forgotPassword"
                  ? "Set / Reset Admin Password"
                  : mode === "updatePassword"
                  ? "Set New Password"
                  : mode === "signUp"
                  ? "Register Initial Admin"
                  : "Admin Authentication"}
              </h3>
              <p className="text-xs text-zinc-400 font-mono">
                {OFFICIAL_ADMIN_EMAIL}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Security Badge */}
        <div className="mt-4 p-2.5 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 text-xs flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Strict Admin Whitelist:</span>
            <span className="text-zinc-200 font-semibold">{OFFICIAL_ADMIN_EMAIL}</span>
          </div>
        </div>

        {/* Error Notice */}
        {errorMessage && (
          <div className="mt-3 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* ===================================================================== */}
        {/* MODE: FORGOT / SET PASSWORD VIA EMAIL */}
        {/* ===================================================================== */}
        {mode === "forgotPassword" && (
          <div className="mt-5 space-y-4">
            {resetSent ? (
              <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-center space-y-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-semibold text-zinc-100">Setup Link Dispatched</h4>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  A password setup email has been sent to{" "}
                  <strong className="text-emerald-400 font-mono">{OFFICIAL_ADMIN_EMAIL}</strong>.
                  Open your ProtonMail inbox, click the link, and you will be directed back to choose your password.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setResetSent(false);
                      setMode("signIn");
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-zinc-100 transition-colors underline underline-offset-4"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Sign In</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSendResetEmail} className="space-y-4">
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Only you have access to <strong className="text-zinc-200">{OFFICIAL_ADMIN_EMAIL}</strong>.
                  Click below to receive a secure link to set or reset your master password.
                </p>

                <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Mail className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{OFFICIAL_ADMIN_EMAIL}</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 uppercase">Verified</span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 px-4 bg-emerald-500 text-zinc-950 font-medium text-xs font-mono rounded-lg hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Email...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Setup Link to ProtonMail</span>
                    </>
                  )}
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setMode("signIn")}
                    className="inline-flex items-center gap-1 text-xs font-mono text-zinc-400 hover:text-zinc-200"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Sign In</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* ===================================================================== */}
        {/* MODE: UPDATE / SET NEW PASSWORD */}
        {/* ===================================================================== */}
        {mode === "updatePassword" && (
          <form onSubmit={handleUpdatePassword} className="mt-5 space-y-4">
            <p className="text-xs text-zinc-400 leading-relaxed">
              Enter your new private master password below. Once saved, only this password will grant admin access.
            </p>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
                New Password
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full pl-9 pr-10 py-2 text-sm bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-zinc-500 hover:text-zinc-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-emerald-500 text-zinc-950 font-medium text-xs font-mono rounded-lg hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving Password...</span>
                </>
              ) : (
                <span>Save Password & Unlock Admin</span>
              )}
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setMode("signIn")}
                className="inline-flex items-center gap-1 text-xs font-mono text-zinc-400 hover:text-zinc-200"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Cancel</span>
              </button>
            </div>
          </form>
        )}

        {/* ===================================================================== */}
        {/* MODE: INITIAL SIGN UP (ONLY for official email) */}
        {/* ===================================================================== */}
        {mode === "signUp" && (
          <form onSubmit={handleInitialSignUp} className="mt-5 space-y-4">
            <p className="text-xs text-zinc-400 leading-relaxed">
              Set your initial admin password for <strong className="text-zinc-200">{OFFICIAL_ADMIN_EMAIL}</strong>.
            </p>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
                <input
                  type="email"
                  disabled
                  value={OFFICIAL_ADMIN_EMAIL}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-zinc-900/60 border border-zinc-800 rounded-lg text-zinc-300 font-mono cursor-not-allowed opacity-90"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
                Create Master Password
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Choose password (min 6 chars)"
                  className="w-full pl-9 pr-10 py-2 text-sm bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-zinc-500 hover:text-zinc-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
                Confirm Master Password
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat master password"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-zinc-100 text-zinc-950 font-medium text-xs font-mono rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Registering...</span>
                </>
              ) : (
                <span>Register & Set Password</span>
              )}
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setMode("signIn")}
                className="inline-flex items-center gap-1 text-xs font-mono text-zinc-400 hover:text-zinc-200"
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
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Official Email
                </label>
                <span className="text-[10px] font-mono text-emerald-400">Authorized</span>
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 w-4 h-4 text-emerald-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={OFFICIAL_ADMIN_EMAIL}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 font-mono"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Master Password
                </label>
                <button
                  type="button"
                  onClick={() => setMode("forgotPassword")}
                  className="text-[11px] font-mono text-zinc-400 hover:text-emerald-400 transition-colors"
                >
                  Set / Reset via Email
                </button>
              </div>
              <div className="relative">
                <KeyRound className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-10 py-2 text-sm bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-zinc-500 hover:text-zinc-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-2.5 px-4 bg-zinc-100 text-zinc-950 font-medium text-xs font-mono rounded-lg hover:bg-white active:bg-zinc-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
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

            {/* Quick Helper Links */}
            <div className="pt-3 border-t border-zinc-900 flex flex-col gap-2 text-center text-xs font-mono text-zinc-500">
              <button
                type="button"
                onClick={() => setMode("forgotPassword")}
                className="text-zinc-400 hover:text-emerald-400 transition-colors"
              >
                Forgot password or need to set one? Click here &rarr;
              </button>
              <button
                type="button"
                onClick={() => setMode("signUp")}
                className="text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                First time? Register initial admin password
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
