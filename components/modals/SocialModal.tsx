"use client";

import React, { useState, useEffect } from "react";
import { X, Share2, Loader2, Globe, Github, Linkedin, Twitter, Mail, Youtube, Instagram, Phone, BookOpen } from "lucide-react";
import { SocialLink } from "@/types/portfolio";
import { useToast } from "@/components/ui/ToastContext";

interface SocialModalProps {
  isOpen: boolean;
  social?: SocialLink | null;
  onClose: () => void;
  onSave: (data: Partial<SocialLink>) => Promise<void> | void;
}

function SubstackIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
    </svg>
  );
}

const AVAILABLE_ICONS = [
  { id: "linkedin", name: "LinkedIn", icon: Linkedin },
  { id: "substack", name: "Substack", icon: SubstackIcon },
  { id: "github", name: "GitHub", icon: Github },
  { id: "twitter", name: "X (Twitter)", icon: Twitter },
  { id: "mail", name: "Email", icon: Mail },
  { id: "globe", name: "Website", icon: Globe },
  { id: "youtube", name: "YouTube", icon: Youtube },
  { id: "instagram", name: "Instagram", icon: Instagram },
  { id: "phone", name: "Phone", icon: Phone },
];

export function SocialModal({ isOpen, social, onClose, onSave }: SocialModalProps) {
  const [platform, setPlatform] = useState("");
  const [label, setLabel] = useState("");
  const [url, setUrl] = useState("");
  const [icon, setIcon] = useState("globe");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [saving, setSaving] = useState(false);
  const { error: toastError } = useToast();

  useEffect(() => {
    if (social) {
      setPlatform(social.platform || "");
      setLabel(social.label || "");
      setUrl(social.url || "");
      setIcon(social.icon || "globe");
      setDisplayOrder(social.display_order || 0);
    } else {
      setPlatform("");
      setLabel("");
      setUrl("");
      setIcon("globe");
      setDisplayOrder(0);
    }
  }, [social, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!platform.trim() || !url.trim()) {
      toastError("Validation Error", "Platform and URL are required.");
      return;
    }

    setSaving(true);
    try {
      await onSave({
        ...(social?.id ? { id: social.id } : {}),
        platform: platform.trim(),
        label: label.trim() || platform.trim(),
        url: url.trim(),
        icon,
        display_order: Number(displayOrder) || 0,
        is_active: true,
      });

      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save social link";
      toastError("Save Error", msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-md my-8 p-6 bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl text-zinc-100">
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-200">
              <Share2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-base font-medium">
                {social ? "Edit Social Link" : "Add Social Account"}
              </h3>
              <p className="text-xs text-zinc-400">
                Configure public network and writing links
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
              Platform Name *
            </label>
            <input
              type="text"
              required
              value={platform}
              onChange={(e) => {
                setPlatform(e.target.value);
                if (!label) setLabel(e.target.value);
                if (e.target.value.toLowerCase().includes("substack")) {
                  setIcon("substack");
                } else if (e.target.value.toLowerCase().includes("linkedin")) {
                  setIcon("linkedin");
                }
              }}
              placeholder="LinkedIn / Substack / GitHub"
              className="w-full px-3 py-2 text-sm bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
              Display Label
            </label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="LinkedIn / Substack Newsletter"
              className="w-full px-3 py-2 text-sm bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
              Profile URL or mailto: link *
            </label>
            <input
              type="text"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://... or mailto:..."
              className="w-full px-3 py-2 text-sm bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 font-mono text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
              Select Icon
            </label>
            <div className="grid grid-cols-3 gap-2">
              {AVAILABLE_ICONS.map((item) => {
                const IconComponent = item.icon;
                const isSelected = icon === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setIcon(item.id)}
                    className={`flex items-center gap-2 p-2 rounded-lg border text-xs transition-colors ${
                      isSelected
                        ? "border-emerald-500 bg-emerald-500/10 text-emerald-300"
                        : "border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
                    }`}
                  >
                    <IconComponent className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{item.name}</span>
                  </button>
                );
              })}
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
              {social ? "Update Link" : "Save Link"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
