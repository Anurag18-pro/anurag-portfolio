"use client";

import React, { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Lock, Unlock, LogOut, FileText, Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  isAdmin: boolean;
  resumeUrl?: string | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenProfile?: () => void;
  onOpenResumeModal?: () => void;
}

export function Navbar({
  isAdmin,
  resumeUrl,
  onOpenAuth,
  onLogout,
  onOpenProfile,
  onOpenResumeModal,
}: NavbarProps) {
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
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Education", href: "#education" },
    { label: "Certifications", href: "#certifications" },
    { label: "Connect", href: "#connect" },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-200",
        scrolled
          ? "bg-white/80 dark:bg-[#09090B]/85 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 py-3 shadow-sm"
          : "bg-transparent py-4"
      )}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Monogram / Brand */}
        <a
          href="#"
          className="group flex items-center gap-2 text-xs font-mono text-zinc-900 dark:text-zinc-100 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform" />
          <span className="font-semibold tracking-tight text-sm font-sans">Anurag Mishra</span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-5 text-xs font-mono text-zinc-500 dark:text-zinc-400">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors"
            >
              {link.label}
            </a>
          ))}

          {/* Quick Resume Link */}
          <a
            href={resumeUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:underline underline-offset-4 ml-1"
          >
            <span>Resume</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5">
          <ThemeToggle />

          {isAdmin ? (
            <div className="flex items-center gap-1">
              <button
                onClick={onOpenProfile}
                title="Edit Profile"
                className="flex items-center gap-1 px-2 py-1 text-[11px] font-mono rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors"
              >
                <Unlock className="w-3 h-3 text-emerald-400" />
                <span>Admin</span>
              </button>
              <button
                onClick={onLogout}
                title="Log out"
                className="p-1.5 rounded text-zinc-500 hover:text-rose-400 transition-colors"
                aria-label="Admin Logout"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              title="Admin Mode"
              className="p-1.5 rounded text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              aria-label="Admin Access"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-3 space-y-2 text-xs font-mono">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href={resumeUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 text-emerald-500 font-medium"
          >
            Resume (PDF) ↗
          </a>
        </div>
      )}
    </header>
  );
}
