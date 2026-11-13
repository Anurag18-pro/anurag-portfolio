"use client";

import React, { useState } from "react";
import { Highlight } from "@/types/portfolio";
import { Plus, Edit2, Trash2, ArrowUpRight } from "lucide-react";

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
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Competitions", "Leadership", "Events"];

  const filteredHighlights = highlights
    .filter((h) => {
      if (selectedCategory === "All") return true;
      return h.category.toLowerCase() === selectedCategory.toLowerCase();
    })
    .sort((a, b) => a.display_order - b.display_order);

  return (
    <section id="highlights" className="py-12 border-b border-zinc-200/80 dark:border-zinc-800/60">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-sm font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Competitions, Leadership & Milestones
          </h2>
        </div>

        {isAdmin && (
          <button
            onClick={onAddHighlight}
            className="self-start sm:self-auto flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 text-xs font-mono transition-colors"
          >
            <Plus className="w-3 h-3" />
            <span>Add Item</span>
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 pb-2 mb-4 overflow-x-auto scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all ${
                isActive
                  ? "bg-zinc-950 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-950 font-medium"
                  : "text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Minimal List */}
      <div className="space-y-2.5">
        {filteredHighlights.map((item) => (
          <div
            key={item.id}
            className="group relative p-3.5 rounded-xl border border-zinc-200/70 dark:border-zinc-800/50 bg-white/20 dark:bg-zinc-900/10 hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xs sm:text-sm font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                    {item.title}
                  </h3>

                  {item.badge && (
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400">
                      {item.badge}
                    </span>
                  )}
                </div>

                <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 font-sans">
                  {item.organization}
                </div>

                {item.description && (
                  <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
                    {item.description}
                  </p>
                )}
              </div>

              {/* Year & Controls */}
              <div className="flex items-center gap-2.5 shrink-0 text-xs font-mono text-zinc-400">
                <span>{item.year}</span>

                {item.url && item.url !== "#" && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-0.5 text-zinc-400 hover:text-emerald-400 transition-colors"
                    title="View details"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}

                {isAdmin && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onEditHighlight(item)}
                      className="p-0.5 text-zinc-400 hover:text-zinc-100 transition-colors"
                      title="Edit Item"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => onDeleteHighlight(item)}
                      className="p-0.5 text-zinc-400 hover:text-rose-400 transition-colors"
                      title="Delete Item"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
