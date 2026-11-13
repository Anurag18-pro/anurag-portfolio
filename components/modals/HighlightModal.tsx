"use client";

import React, { useState, useEffect } from "react";
import { X, Trophy, Loader2, Link as LinkIcon, Tag } from "lucide-react";
import { Highlight, HighlightCategory } from "@/types/portfolio";
import { useToast } from "@/components/ui/ToastContext";

interface HighlightModalProps {
  isOpen: boolean;
  highlight?: Highlight | null;
  onClose: () => void;
  onSave: (data: Partial<Highlight>) => Promise<void> | void;
}

const CATEGORIES: HighlightCategory[] = [
  "Competitions",
  "Leadership",
  "Events",
  "Achievements",
];

export function HighlightModal({
  isOpen,
  highlight,
  onClose,
  onSave,
}: HighlightModalProps) {
  const [title, setTitle] = useState("");
  const [organization, setOrganization] = useState("");
  const [category, setCategory] = useState<HighlightCategory>("Competitions");
  const [year, setYear] = useState("");
  const [badge, setBadge] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [saving, setSaving] = useState(false);
  const { error: toastError } = useToast();

  useEffect(() => {
    if (highlight) {
      setTitle(highlight.title || "");
      setOrganization(highlight.organization || "");
      setCategory(highlight.category || "Competitions");
      setYear(highlight.year || "");
      setBadge(highlight.badge || "");
      setDescription(highlight.description || "");
      setUrl(highlight.url || "");
      setDisplayOrder(highlight.display_order || 0);
    } else {
      setTitle("");
      setOrganization("");
      setCategory("Competitions");
      setYear(new Date().getFullYear().toString());
      setBadge("");
      setDescription("");
      setUrl("");
      setDisplayOrder(0);
    }
  }, [highlight, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !organization.trim()) {
      toastError("Validation Error", "Title and Organization are required.");
      return;
    }

    setSaving(true);
    try {
      await onSave({
        ...(highlight?.id ? { id: highlight.id } : {}),
        title: title.trim(),
        organization: organization.trim(),
        category,
        year: year.trim() || new Date().getFullYear().toString(),
        badge: badge.trim() || null,
        description: description.trim() || null,
        url: url.trim() || null,
        display_order: Number(displayOrder) || 0,
      });

      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save item";
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
              <Trophy className="w-4 h-4 text-purple-400" />
            </div>
            <div>
              <h3 className="text-base font-medium">
                {highlight ? "Edit Milestone / Highlight" : "Add Milestone / Highlight"}
              </h3>
              <p className="text-xs text-zinc-400">
                Competitions, leadership honors, hackathons, and summit representations
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
              Title / Role *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Shri Ram Policy Quest / Case-O-Mania / Campus Ambassador"
              className="w-full px-3 py-2 text-sm bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
                Organization / Host *
              </label>
              <input
                type="text"
                required
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="SRCC / Unstop / Air India"
                className="w-full px-3 py-2 text-sm bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none focus:border-zinc-500"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
                Badge / Tag Label
              </label>
              <div className="relative">
                <Tag className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  placeholder="Team Leader / Finalist / Delegate"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 text-xs"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
                Year
              </label>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="2026"
                className="w-full px-3 py-2 text-sm bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
              Short Context & Achievement
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Analyzed public policy frameworks and formulated scalable socioeconomic strategies..."
              className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 leading-relaxed font-sans"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
              Reference / Organization URL
            </label>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://..."
                className="w-full pl-9 pr-3 py-2 text-sm bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
              />
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
              {highlight ? "Update Milestone" : "Save Milestone"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
