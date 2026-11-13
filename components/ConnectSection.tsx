"use client";

import React, { useState } from "react";
import {
  Mail,
  Linkedin,
  Github,
  Twitter,
  FileText,
  Copy,
  Check,
  ArrowUpRight,
} from "lucide-react";
import { SocialLink, Profile } from "@/types/portfolio";

interface ConnectSectionProps {
  profile: Profile;
  socials: SocialLink[];
  onOpenResumeModal?: () => void;
  isAdmin?: boolean;
}

function SubstackIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
    </svg>
  );
}

export function ConnectSection({
  profile,
  socials,
  onOpenResumeModal,
  isAdmin,
}: ConnectSectionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email || "anuragmishra.mail@proton.me");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="connect" className="py-12 border-b border-zinc-200/80 dark:border-zinc-800/60">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
        <div className="max-w-md">
          <h2 className="text-sm font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Connect & Collaborate
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
            Always open to discussing full-time strategy & product management roles, analytical consulting, or interesting software ventures.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${profile.email || "anuragmishra.mail@proton.me"}`}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-950 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-950 text-xs font-mono font-medium hover:opacity-90 transition-opacity"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{profile.email || "anuragmishra.mail@proton.me"}</span>
            </a>

            <button
              onClick={handleCopyEmail}
              className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
              title="Copy email to clipboard"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Connect Links Grid */}
        <div className="flex flex-col gap-2 min-w-[200px] text-xs font-mono">
          <a
            href="https://www.linkedin.com/in/anurag-mishramba/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors"
          >
            <span className="flex items-center gap-2">
              <Linkedin className="w-3.5 h-3.5 text-zinc-400" />
              <span>LinkedIn</span>
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
          </a>

          <a
            href="https://substack.com/@anuragmishraa"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors"
          >
            <span className="flex items-center gap-2">
              <SubstackIcon className="w-3.5 h-3.5 text-zinc-400" />
              <span>Substack</span>
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
          </a>

          <a
            href="https://github.com/Anurag18-pro"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors"
          >
            <span className="flex items-center gap-2">
              <Github className="w-3.5 h-3.5 text-zinc-400" />
              <span>GitHub</span>
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
          </a>

          <a
            href={profile.resume_url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/50 text-emerald-600 dark:text-emerald-400 font-medium transition-colors border border-emerald-500/20 bg-emerald-500/5"
          >
            <span className="flex items-center gap-2">
              <FileText className="w-3.5 h-3.5" />
              <span>View Resume (PDF)</span>
            </span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
