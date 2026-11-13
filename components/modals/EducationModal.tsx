"use client";

import React, { useState, useEffect } from "react";
import { X, GraduationCap, Loader2 } from "lucide-react";
import { Education } from "@/types/portfolio";
import { useToast } from "@/components/ui/ToastContext";

interface EducationModalProps {
  isOpen: boolean;
  education?: Education | null;
  onClose: () => void;
  onSave: (data: Partial<Education>) => Promise<void> | void;
}

export function EducationModal({ isOpen, education, onClose, onSave }: EducationModalProps) {
  const [institution, setInstitution] = useState("");
  const [degree, setDegree] = useState("");
  const [duration, setDuration] = useState("");
  const [location, setLocation] = useState("");
  const [highlights, setHighlights] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [saving, setSaving] = useState(false);
  const { error: toastError } = useToast();

  useEffect(() => {
    if (education) {
      setInstitution(education.institution || "");
      setDegree(education.degree || "");
      setDuration(education.duration || "");
      setLocation(education.location || "");
      setHighlights(education.highlights ? education.highlights.join("\n") : "");
      setDisplayOrder(education.display_order || 0);
    } else {
      setInstitution("");
      setDegree("");
      setDuration("2025 – 2027");
      setLocation("Greater Noida, India");
      setHighlights("");
      setDisplayOrder(0);
    }
  }, [education, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!institution.trim() || !degree.trim()) {
      toastError("Validation Error", "Institution and Degree are required.");
      return;
    }

    setSaving(true);
    try {
      const parsedHighlights = highlights
        .split("\n")
        .map((h) => h.trim().replace(/^[-•*]\s*/, ""))
        .filter(Boolean);

      await onSave({
        ...(education?.id ? { id: education.id } : {}),
        institution: institution.trim(),
        degree: degree.trim(),
        duration: duration.trim(),
        location: location.trim() || null,
        highlights: parsedHighlights,
        display_order: Number(displayOrder) || 0,
      });

      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save education entry";
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
              <GraduationCap className="w-4 h-4 text-sky-400" />
            </div>
            <div>
              <h3 className="text-base font-medium">
                {education ? "Edit Education" : "Add Education Entry"}
              </h3>
              <p className="text-xs text-zinc-400">
                Academic institutions, degrees, and academic achievements
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
              Institution Name *
            </label>
            <input
              type="text"
              required
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              placeholder="Lloyd Business School"
              className="w-full px-3 py-2 text-sm bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
              Degree / Program *
            </label>
            <input
              type="text"
              required
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              placeholder="Master of Business Administration (MBA)"
              className="w-full px-3 py-2 text-sm bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
                Duration *
              </label>
              <input
                type="text"
                required
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="2025 – 2027"
                className="w-full px-3 py-2 text-sm bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Greater Noida, India"
                className="w-full px-3 py-2 text-sm bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
              Key Highlights & Activities (One per line)
            </label>
            <textarea
              rows={4}
              value={highlights}
              onChange={(e) => setHighlights(e.target.value)}
              placeholder="Specialization in Business Analytics, Strategic Management & Entrepreneurship&#10;Active participant in corporate case studies and strategy simulations"
              className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 leading-relaxed font-sans"
            />
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
              {education ? "Update Education" : "Save Entry"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
