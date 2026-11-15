"use client";

import React from "react";
import { Plus, Edit2, Trash2, ExternalLink } from "lucide-react";
import { Highlight } from "@/types/portfolio";

interface HighlightsSectionProps {
  highlights: Highlight[];
  isAdmin: boolean;
  onAddHighlight: () => void;
  onEditHighlight: (item: Highlight) => void;
  onDeleteHighlight: (item: Highlight) => void;
}

export function HighlightsSection({
  highlights,
  isAdmin,
  onAddHighlight,
  onEditHighlight,
  onDeleteHighlight,
}: HighlightsSectionProps) {
  const sorted = [...highlights].sort((a, b) => a.display_order - b.display_order);

  return (
    <section id="highlights" className="px-10 md:px-16 py-24 border-t border-navy-400">
      <div className="flex items-center gap-3 mb-10">
        <span className="font-serif italic text-gold-500/70 text-[13px]">07</span>
        <div className="h-px w-6 bg-navy-400" />
        <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-muted">Milestones</span>
      </div>

      <div className="flex items-start justify-between mb-12">
        <h2 className="font-serif text-3xl md:text-4xl font-light text-white leading-tight">
          Recognition &amp;{" "}
          <span className="font-serif italic text-gold-500">milestones</span>
        </h2>
        {isAdmin && (
          <button
            onClick={onAddHighlight}
            className="flex items-center gap-1.5 text-[11px] font-sans tracking-widest uppercase text-gold-500 border border-gold-500/50 hover:bg-gold-500/10 px-3 py-2 transition-colors shrink-0"
          >
            <Plus className="w-3.5 h-3.5" /> Add
          </button>
        )}
      </div>

      <div className="border-t border-navy-400">
        {sorted.length === 0 && (
          <p className="py-8 text-muted font-sans text-sm italic">No highlights yet.</p>
        )}
        {sorted.map((hl) => (
          <div
            key={hl.id}
            className="group flex items-start justify-between gap-4 py-5 border-b border-navy-400 hover:bg-surface/30 -mx-2 px-2 transition-colors"
          >
            {/* Year */}
            <span className="font-mono text-gold-500 text-[11px] w-12 shrink-0 pt-0.5">
              {hl.year || "—"}
            </span>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-sans text-sm text-white font-medium">{hl.title}</p>
                {hl.badge && (
                  <span className="font-sans text-[10px] uppercase tracking-wider text-gold-400 border border-gold-500/30 px-1.5 py-0.5 rounded-sm">
                    {hl.badge}
                  </span>
                )}
                {hl.category && (
                  <span className="font-sans text-[10px] text-muted bg-navy-900 border border-navy-400 px-1.5 py-0.5 rounded-sm">
                    {hl.category}
                  </span>
                )}
              </div>
              {hl.organization && (
                <p className="font-sans text-[12px] text-muted mt-1">{hl.organization}</p>
              )}
              {hl.description && (
                <p className="font-sans text-xs text-body/90 mt-1.5 leading-relaxed">{hl.description}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0 pt-0.5">
              {hl.url && hl.url !== "#" && (
                <a
                  href={hl.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-muted hover:text-gold-400 transition-colors"
                  title="View link"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {isAdmin && (
                <>
                  <button
                    onClick={() => onEditHighlight(hl)}
                    className="p-1.5 text-muted hover:text-gold-400 transition-colors opacity-0 group-hover:opacity-100"
                    title="Edit milestone"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDeleteHighlight(hl)}
                    className="p-1.5 text-muted hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100"
                    title="Delete milestone"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
