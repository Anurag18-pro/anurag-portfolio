"use client";

import React, { useState } from "react";
import { X, Lock, Mail, KeyRound, Loader2, AlertCircle, ShieldCheck } from "lucide-react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/ToastContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { success, error: toastError, info } = useToast();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!isSupabaseConfigured()) {
      // In demo mode without configured Supabase, allow testing admin mode
      if (email.toLowerCase().includes("admin") || email.toLowerCase().includes("anurag")) {
        success("Admin Demo Mode", "Logged in with demo admin credentials.");
        onSuccess();
        onClose();
        return;
      }
      setErrorMessage(
        "Supabase environment variables are not configured yet. To test admin mode, enter 'anurag@admin.com' or configure .env.local"
      );
      return;
    }

    setLoading(true);
    const supabase = createClient();

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) {
          setErrorMessage(error.message);
          toastError("Sign Up Failed", error.message);
        } else if (data.session) {
          success("Account Created", "Logged in successfully as Admin.");
          onSuccess();
          onClose();
        } else {
          info("Verification Email Sent", "Please check your inbox to confirm your email.");
          onClose();
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setErrorMessage(error.message);
          toastError("Authentication Failed", error.message);
        } else {
          success("Welcome Anurag", "Admin mode unlocked. You can now edit and manage content.");
          onSuccess();
          onClose();
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred";
      setErrorMessage(msg);
      toastError("Error", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md p-6 bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl text-zinc-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-200">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-medium text-zinc-100">
                {isSignUp ? "Create Admin Account" : "Admin Authentication"}
              </h3>
              <p className="text-xs text-zinc-400">
                Authorized access for Anurag Mishra
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

        {/* Error Notice */}
        {errorMessage && (
          <div className="mt-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Supabase status hint */}
        {!isSupabaseConfigured() && (
          <div className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
            <div>
              <span className="font-medium">Demo Mode Notice: </span>
              Add your Supabase credentials in <code className="bg-black/40 px-1 py-0.5 rounded">.env.local</code>.
              For previewing admin controls now, enter <code className="bg-black/40 px-1 py-0.5 rounded">anurag@admin.com</code> and any password.
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="anuragmishra.mgmt@gmail.com"
                className="w-full pl-9 pr-3 py-2 text-sm bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
              Password
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3 py-2 text-sm bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2.5 px-4 bg-zinc-100 text-zinc-950 font-medium text-sm rounded-lg hover:bg-white active:bg-zinc-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : isSignUp ? (
              "Create Admin Account"
            ) : (
              "Sign In to Admin Mode"
            )}
          </button>
        </form>

        {/* Toggle Sign Up / Sign In */}
        <div className="mt-4 pt-4 border-t border-zinc-900 text-center text-xs text-zinc-500">
          {isSignUp ? "Already have an account?" : "Need to register the initial admin account?"}{" "}
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setErrorMessage(null);
            }}
            className="text-zinc-300 hover:text-white underline underline-offset-4 ml-1 transition-colors"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}
