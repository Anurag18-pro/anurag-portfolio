"use client";

import React, { useState } from "react";
import { X, FileText, Upload, Loader2, Link as LinkIcon, ExternalLink, CheckCircle2 } from "lucide-react";
import { uploadPortfolioAsset } from "@/lib/supabase/storage";
import { useToast } from "@/components/ui/ToastContext";

interface ResumeModalProps {
  isOpen: boolean;
  currentResumeUrl?: string | null;
  onClose: () => void;
  onSave: (url: string) => Promise<void> | void;
}

export function ResumeModal({
  isOpen,
  currentResumeUrl,
  onClose,
  onSave,
}: ResumeModalProps) {
  const [resumeUrl, setResumeUrl] = useState(currentResumeUrl || "");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { success, error: toastError } = useToast();

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf" && !file.name.endsWith(".pdf")) {
      toastError("Invalid File", "Please upload a PDF document.");
      return;
    }

    setUploading(true);
    const { url, error } = await uploadPortfolioAsset(file, "resumes");
    setUploading(false);

    if (error) {
      // In offline / fallback mode, convert to data URL so it still works!
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        setResumeUrl(dataUrl);
        success("Resume Staged", "Resume PDF uploaded locally.");
      };
      reader.readAsDataURL(file);
    } else if (url) {
      setResumeUrl(url);
      success("Resume Uploaded", "PDF uploaded to Supabase Storage.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeUrl.trim()) {
      toastError("Validation Error", "Please provide a resume URL or upload a PDF.");
      return;
    }

    setSaving(true);
    try {
      await onSave(resumeUrl.trim());
      success("Resume Updated", "Recruiters can now view and download your resume.");
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update resume";
      toastError("Error", msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md p-6 bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl text-zinc-100">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-emerald-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-medium">Manage Resume (CV)</h3>
              <p className="text-xs text-zinc-400">
                Upload a PDF or paste a link for recruiters
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* File Upload Box */}
          <div className="p-4 rounded-xl border border-dashed border-zinc-700 bg-zinc-900/50 hover:bg-zinc-900/80 transition-colors text-center">
            <label className="cursor-pointer flex flex-col items-center justify-center gap-2">
              <div className="p-2.5 rounded-full bg-zinc-800 text-emerald-400">
                <Upload className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="font-medium text-emerald-400 hover:underline">
                  {uploading ? "Uploading PDF..." : "Upload Resume PDF"}
                </span>
                <span className="text-zinc-500 block text-[11px] mt-0.5">
                  Direct upload for recruiters (PDF, max 10MB)
                </span>
              </div>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-zinc-800"></div>
            <span className="flex-shrink mx-3 text-[11px] font-mono text-zinc-500 uppercase">
              Or paste cloud link
            </span>
            <div className="flex-grow border-t border-zinc-800"></div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
              Resume URL (Google Drive / Cloud Link)
            </label>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                value={resumeUrl}
                onChange={(e) => setResumeUrl(e.target.value)}
                placeholder="https://drive.google.com/... or /resume.pdf"
                className="w-full pl-9 pr-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 font-mono"
              />
            </div>
          </div>

          {resumeUrl && (
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300">
              <div className="flex items-center gap-2 truncate max-w-[280px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate font-mono text-[11px]">{resumeUrl}</span>
              </div>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 text-zinc-400 hover:text-emerald-400 transition-colors"
                title="Preview Resume"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="px-4 py-2 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 rounded-lg hover:bg-zinc-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || !resumeUrl}
              className="px-5 py-2 text-xs font-medium text-zinc-950 bg-zinc-100 hover:bg-white rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              Save Resume
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
