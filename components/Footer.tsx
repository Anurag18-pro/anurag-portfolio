"use client";

import React from "react";
import { ArrowUp, Lock, Sparkles, Heart } from "lucide-react";

interface FooterProps {
  isAdmin: boolean;
  onOpenAuth: () => void;
}

export function Footer({ isAdmin, onOpenAuth }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 border-t border-zinc-200 dark:border-zinc-800/80 text-xs text-zinc-500 dark:text-zinc-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left */}
        <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
          <span className="font-medium text-zinc-700 dark:text-zinc-300">
            Anurag Mishra
          </span>
          <span className="hidden sm:inline text-zinc-400 dark:text-zinc-600">•</span>
          <span>© {new Date().getFullYear()} All rights reserved</span>
        </div>

        {/* Center / Stack attribution */}
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
          <span>Engineered with Next.js 14, Supabase & Vercel</span>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {!isAdmin && (
            <button
              onClick={onOpenAuth}
              className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors flex items-center gap-1"
              title="Admin Mode"
            >
              <Lock className="w-3 h-3" />
              <span>Admin</span>
            </button>
          )}

          <button
            onClick={scrollToTop}
            className="p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title="Scroll to top"
            aria-label="Back to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
