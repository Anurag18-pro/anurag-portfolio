"use client";

import React from "react";
import { Lock } from "lucide-react";

interface FooterProps {
  isAdmin: boolean;
  onOpenAuth: () => void;
}

export function Footer({ isAdmin, onOpenAuth }: FooterProps) {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="border-t border-navy-400 bg-navy-950 px-10 md:px-16 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-sans text-[11px] text-muted">
          &copy; {new Date().getFullYear()} Anurag Mishra. All rights reserved.
        </p>

        <p className="font-mono text-[10px] text-muted/50">
          Built with Next.js &middot; Supabase &middot; Vercel
        </p>

        <div className="flex items-center gap-4">
          <button
            onClick={scrollTop}
            className="font-sans text-[11px] tracking-widest uppercase text-muted hover:text-gold-500 transition-colors"
          >
            Back to Top &uarr;
          </button>
          {!isAdmin && (
            <button
              onClick={onOpenAuth}
              className="text-muted hover:text-gold-400 transition-colors"
              title="Admin login"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}
