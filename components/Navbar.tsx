"use client";

import React, { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Lock, Unlock, LogOut, Sparkles, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  isAdmin: boolean;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenProfile?: () => void;
}

export function Navbar({ isAdmin, onOpenAuth, onLogout, onOpenProfile }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Projects", href: "#projects" },
    { label: "Education", href: "#education" },
    { label: "Certifications", href: "#certifications" },
    { label: "Highlights", href: "#highlights" },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-200",
        scrolled
          ? "bg-white/80 dark:bg-[#09090B]/85 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 py-3.5 shadow-sm"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Name / Brand */}
        <a
          href="#"
          className="group flex items-center gap-2.5 font-sans font-medium text-sm text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform" />
          <span className="tracking-tight font-semibold">Anurag Mishra</span>
          <span className="hidden sm:inline-block text-[11px] font-mono text-zinc-400 dark:text-zinc-500">
            / portfolio
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-zinc-600 dark:text-zinc-400">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions: Theme Toggle + Admin Button */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {isAdmin ? (
            <div className="flex items-center gap-1.5">
              <button
                onClick={onOpenProfile}
                title="Edit Profile"
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono font-medium rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors"
              >
                <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Admin</span>
              </button>
              <button
                onClick={onLogout}
                title="Log out from Admin Mode"
                className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-500/10 dark:hover:bg-rose-500/10 transition-colors"
                aria-label="Admin Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              title="Admin Login"
              className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors"
              aria-label="Admin Access"
            >
              <Lock className="w-4 h-4" />
            </button>
          )}

          {/* Mobile menu toggle button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white"
            >
              {link.label}
            </a>
          ))}
          {isAdmin && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProfile?.();
              }}
              className="w-full text-left text-xs font-mono py-2 text-emerald-400 border-t border-zinc-800 pt-3"
            >
              Edit Profile Details
            </button>
          )}
        </div>
      )}
    </header>
  );
}
