"use client";

import React from "react";
import { Plus, LogOut, Edit3, Database, FileText } from "lucide-react";
import { isSupabaseConfigured } from "@/lib/supabase/client";

interface AdminBarProps {
  isAdmin: boolean;
  onOpenProfile: () => void;
  onOpenResumeModal: () => void;
  onAddProject: () => void;
  onAddEducation: () => void;
  onAddCertification: () => void;
  onAddHighlight: () => void;
  onAddSocial: () => void;
  onLogout: () => void;
}

export function AdminBar({
  isAdmin,
  onOpenProfile,
  onOpenResumeModal,
  onAddProject,
  onAddEducation,
  onAddCertification,
  onAddHighlight,
  onAddSocial,
  onLogout,
}: AdminBarProps) {
  if (!isAdmin) return null;

  const isConfigured = isSupabaseConfigured();

  return (
    <div className="sticky top-14 z-30 w-full bg-zinc-900/90 dark:bg-zinc-900/95 backdrop-blur-md border-y border-emerald-500/30 text-zinc-100 py-2 px-4 shadow-sm text-xs animate-fade-in font-mono">
      <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <span className="flex h-1.5 w-1.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
          <span className="font-medium text-emerald-400">
            Admin Live CMS
          </span>
          <span className="text-zinc-600 hidden sm:inline">|</span>
          <span className="text-zinc-400 text-[11px] hidden md:flex items-center gap-1">
            <Database className="w-3 h-3 text-zinc-500" />
            {isConfigured ? (
              <span className="text-zinc-300">Supabase Connected</span>
            ) : (
              <span className="text-amber-400">Local CMS Mode (Saved in Browser)</span>
            )}
          </span>
        </div>

        <div className="flex items-center flex-wrap gap-1">
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 transition-colors"
          >
            <Edit3 className="w-3 h-3 text-zinc-400" />
            <span>Profile</span>
          </button>
          <button
            onClick={onOpenResumeModal}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-emerald-400 border border-zinc-700 transition-colors"
          >
            <FileText className="w-3 h-3" />
            <span>Resume</span>
          </button>
          <button
            onClick={onAddProject}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition-colors"
          >
            <Plus className="w-3 h-3" />
            <span>Project</span>
          </button>
          <button
            onClick={onAddEducation}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 transition-colors hidden sm:flex"
          >
            <Plus className="w-3 h-3" />
            <span>Education</span>
          </button>
          <button
            onClick={onAddCertification}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 transition-colors hidden sm:flex"
          >
            <Plus className="w-3 h-3" />
            <span>Cert</span>
          </button>
          <button
            onClick={onAddHighlight}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 transition-colors hidden sm:flex"
          >
            <Plus className="w-3 h-3" />
            <span>Milestone</span>
          </button>
          <button
            onClick={onAddSocial}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 transition-colors hidden sm:flex"
          >
            <Plus className="w-3 h-3" />
            <span>Social</span>
          </button>
          <button
            onClick={onLogout}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 transition-colors ml-1"
          >
            <LogOut className="w-3 h-3" />
            <span>Exit</span>
          </button>
        </div>
      </div>
    </div>
  );
}
