"use client";

import React, { useState, useEffect } from "react";
import { X, Award, Loader2, Link as LinkIcon, Hash } from "lucide-react";
import { Certification } from "@/types/portfolio";
import { useToast } from "@/components/ui/ToastContext";

interface CertificationModalProps {
  isOpen: boolean;
  certification?: Certification | null;
  onClose: () => void;
  onSave: (data: Partial<Certification>) => Promise<void> | void;
}

export function CertificationModal({
  isOpen,
  certification,
  onClose,
  onSave,
}: CertificationModalProps) {
  const [title, setTitle] = useState("");
  const [issuer, setIssuer] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [credentialUrl, setCredentialUrl] = useState("");
  const [certificateId, setCertificateId] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [saving, setSaving] = useState(false);
  const { error: toastError } = useToast();

  useEffect(() => {
    if (certification) {
      setTitle(certification.title || "");
      setIssuer(certification.issuer || "");
      setIssueDate(certification.issue_date || "");
      setCredentialUrl(certification.credential_url || "");
      setCertificateId(certification.certificate_id || "");
      setDisplayOrder(certification.display_order || 0);
    } else {
      setTitle("");
      setIssuer("");
      setIssueDate(new Date().getFullYear().toString());
      setCredentialUrl("");
      setCertificateId("");
      setDisplayOrder(0);
    }
  }, [certification, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !issuer.trim()) {
      toastError("Validation Error", "Title and Issuer are required.");
      return;
    }

    setSaving(true);
    try {
      await onSave({
        ...(certification?.id ? { id: certification.id } : {}),
        title: title.trim(),
        issuer: issuer.trim(),
        issue_date: issueDate.trim() || new Date().getFullYear().toString(),
        credential_url: credentialUrl.trim() || null,
        certificate_id: certificateId.trim() || null,
        display_order: Number(displayOrder) || 0,
      });

      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save certification";
      toastError("Save Error", msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg my-8 p-6 bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl text-zinc-100">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-200">
              <Award className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h3 className="text-base font-medium">
                {certification ? "Edit Certification" : "Add Certification & Program"}
              </h3>
              <p className="text-xs text-zinc-400">
                Accreditations, professional masteries, and executive certifications
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
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
              Credential Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Data Analytics with Python (NOC26-CS86)"
              className="w-full px-3 py-2 text-sm bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
                Issuing Organization *
              </label>
              <input
                type="text"
                required
                value={issuer}
                onChange={(e) => setIssuer(e.target.value)}
                placeholder="NPTEL & SWAYAM / IIM Ahmedabad"
                className="w-full px-3 py-2 text-sm bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
                Year / Issue Date *
              </label>
              <input
                type="text"
                required
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                placeholder="2026"
                className="w-full px-3 py-2 text-sm bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
                Credential Verification URL
              </label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
                <input
                  type="url"
                  value={credentialUrl}
                  onChange={(e) => setCredentialUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full pl-9 pr-3 py-2 text-sm bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
                Certificate ID / License
              </label>
              <div className="relative">
                <Hash className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value)}
                  placeholder="NOC26-CS86"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 font-mono text-xs"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <label className="text-xs font-mono text-zinc-400">Display Order:</label>
              <input
                type="number"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
                className="w-16 px-2 py-1 text-xs bg-zinc-900 border border-zinc-800 rounded text-center text-zinc-100"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
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
              disabled={saving}
              className="px-5 py-2 text-xs font-medium text-zinc-950 bg-zinc-100 hover:bg-white rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              {certification ? "Update Certificate" : "Add Certificate"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
