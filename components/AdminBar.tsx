"use client";

import React from "react";
import { Plus, LogOut, Edit3, Database, FileText, KeyRound } from "lucide-react";
import { isSupabaseConfigured } from "@/lib/supabase/client";

interface AdminBarProps {
  isAdmin: boolean;
  onOpenProfile: () => void;
  onOpenResumeModal: () => void;
  onOpenPasswordModal?: () => void;
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
  onOpenPasswordModal,
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
    <div className="sticky top-0 z-40 w-full bg-navy-950/95 backdrop-blur-md border-b border-gold-500/20 text-white py-2 px-4 shadow-sm text-xs font-mono md:pl-[376px]">
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <span className="flex h-1.5 w-1.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
          </span>
          <span className="font-medium text-emerald-400">Admin CMS</span>
          <span className="text-navy-400 hidden sm:inline">|</span>
          <span className="text-muted text-[11px] hidden md:flex items-center gap-1">
            <Database className="w-3 h-3 text-navy-400" />
            {isConfigured ? (
              <span className="text-gold-500/80">Supabase Connected</span>
            ) : (
              <span className="text-amber-400">Local Mode</span>
            )}
          </span>
        </div>

        <div className="flex items-center flex-wrap gap-1">
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-navy-700 hover:bg-navy-600 text-white border border-navy-400 transition-colors"
          >
            <Edit3 className="w-3 h-3 text-muted" />
            <span>Profile</span>
          </button>
          <button
            onClick={onOpenResumeModal}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-navy-700 hover:bg-navy-600 text-gold-400 border border-navy-400 transition-colors"
          >
            <FileText className="w-3 h-3" />
            <span>Resume</span>
          </button>
          {onOpenPasswordModal && (
            <button
              onClick={onOpenPasswordModal}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-navy-700 hover:bg-navy-600 text-white border border-navy-400 transition-colors"
              title="Set or update admin password"
            >
              <KeyRound className="w-3 h-3 text-muted" />
              <span>Password</span>
            </button>
          )}
          <button
            onClick={onAddProject}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-gold-500/10 hover:bg-gold-500/20 text-gold-400 border border-gold-500/30 transition-colors"
          >
            <Plus className="w-3 h-3" />
            <span>Project</span>
          </button>
          <button
            onClick={onAddEducation}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-navy-700 hover:bg-navy-600 text-white border border-navy-400 transition-colors hidden sm:flex"
          >
            <Plus className="w-3 h-3" />
            <span>Education</span>
          </button>
          <button
            onClick={onAddCertification}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-navy-700 hover:bg-navy-600 text-white border border-navy-400 transition-colors hidden sm:flex"
          >
            <Plus className="w-3 h-3" />
            <span>Cert</span>
          </button>
          <button
            onClick={onAddHighlight}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-navy-700 hover:bg-navy-600 text-white border border-navy-400 transition-colors hidden sm:flex"
          >
            <Plus className="w-3 h-3" />
            <span>Milestone</span>
          </button>
          <button
            onClick={onAddSocial}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-navy-700 hover:bg-navy-600 text-white border border-navy-400 transition-colors hidden sm:flex"
          >
            <Plus className="w-3 h-3" />
            <span>Social</span>
          </button>
          <button
            onClick={onLogout}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-colors ml-1"
          >
            <LogOut className="w-3 h-3" />
            <span>Exit</span>
          </button>
        </div>
      </div>
    </div>
  );
}
