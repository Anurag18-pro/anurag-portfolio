"use client";

import React, { useState } from "react";
import { Highlight, HighlightCategory } from "@/types/portfolio";
import {
  Trophy,
  ExternalLink,
  Plus,
  Edit2,
  Trash2,
  Tag,
  Users,
  Compass,
  Sparkles,
} from "lucide-react";

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

  const getCategoryBadgeClass = (category: string) => {
    switch (category.toLowerCase()) {
      case "competitions":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "leadership":
        return "bg-sky-500/10 text-sky-400 border-sky-500/20";
      case "events":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      default:
        return "bg-zinc-800 text-zinc-300 border-zinc-700";
    }
  };

  return (
    <section id="highlights" className="py-12 sm:py-16">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-100 font-sans">
              Competitions, Leadership & Milestones
            </h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
              {highlights.length}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Case competitions, policy quests, hackathons, and summit representations
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={onAddHighlight}
            className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 text-xs font-mono font-medium transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Item</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 scrollbar-none">
        {categories.map((cat) => {
          const count =
            cat === "All"
              ? highlights.length
              : highlights.filter(
                  (h) => h.category.toLowerCase() === cat.toLowerCase()
                ).length;

          const isActive = selectedCategory === cat;

          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 border ${
                isActive
                  ? "bg-zinc-950 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-950 border-zinc-950 dark:border-zinc-100 font-semibold shadow-sm"
                  : "bg-zinc-100/80 dark:bg-zinc-900/40 text-zinc-600 dark:text-zinc-400 border-zinc-200/80 dark:border-zinc-800 hover:text-zinc-950 dark:hover:text-zinc-100 hover:border-zinc-300 dark:hover:border-zinc-700"
              }`}
            >
              <span>{cat}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive
                    ? "bg-zinc-800 dark:bg-zinc-300 text-zinc-200 dark:text-zinc-900"
                    : "bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* List of Highlights */}
      <div className="space-y-3">
        {filteredHighlights.map((item) => (
          <div
            key={item.id}
            className="group relative p-4 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/30 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                    {item.title}
                  </h3>

                  {item.badge && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {item.badge}
                    </span>
                  )}

                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono border ${getCategoryBadgeClass(
                      item.category
                    )}`}
                  >
                    {item.category}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  <span className="font-medium text-zinc-700 dark:text-zinc-300">
                    {item.organization}
                  </span>
                </div>

                {item.description && (
                  <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
                    {item.description}
                  </p>
                )}
              </div>

              {/* Year & Admin Controls */}
              <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
                <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
                  {item.year}
                </span>

                {item.url && item.url !== "#" && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 rounded text-zinc-400 hover:text-emerald-400 transition-colors"
                    title="View details"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                {isAdmin && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onEditHighlight(item)}
                      className="p-1 rounded text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
                      title="Edit Item"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteHighlight(item)}
                      className="p-1 rounded text-zinc-400 hover:text-rose-400 hover:bg-zinc-800 transition-colors"
                      title="Delete Item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
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
