"use client";

import React from "react";
import { Education } from "@/types/portfolio";
import { Plus, Edit2, Trash2 } from "lucide-react";

interface EducationSectionProps {
  education: Education[];
  isAdmin: boolean;
  onAddEducation: () => void;
  onEditEducation: (item: Education) => void;
  onDeleteEducation: (item: Education) => void;
}

export function EducationSection({
  education,
  isAdmin,
  onAddEducation,
  onEditEducation,
  onDeleteEducation,
}: EducationSectionProps) {
  const sortedEducation = [...education].sort(
    (a, b) => a.display_order - b.display_order
  );

  return (
    <section id="education" className="py-12 border-b border-zinc-200/80 dark:border-zinc-800/60">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-sm font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Education
          </h2>
        </div>

        {isAdmin && (
          <button
            onClick={onAddEducation}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 text-xs font-mono transition-colors"
          >
            <Plus className="w-3 h-3" />
            <span>Add Education</span>
          </button>
        )}
      </div>

      <div className="space-y-4">
        {sortedEducation.map((item) => (
          <div
            key={item.id}
            className="group relative p-4 rounded-xl border border-zinc-200/70 dark:border-zinc-800/50 bg-white/30 dark:bg-zinc-900/10 hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <div>
                <h3 className="text-sm font-semibold text-zinc-950 dark:text-zinc-100">
                  {item.degree}
                </h3>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  <span className="font-medium text-emerald-600 dark:text-emerald-400">
                    {item.institution}
                  </span>
                  {item.location && <span> · {item.location}</span>}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
                  {item.duration}
                </span>

                {isAdmin && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onEditEducation(item)}
                      className="p-1 rounded text-zinc-400 hover:text-zinc-100 transition-colors"
                      title="Edit Education"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => onDeleteEducation(item)}
                      className="p-1 rounded text-zinc-400 hover:text-rose-400 transition-colors"
                      title="Delete Education"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Coursework */}
            {item.coursework && (
              <div className="mt-2.5 text-xs text-zinc-600 dark:text-zinc-400 font-sans">
                <span className="font-mono text-[11px] text-zinc-400 font-medium">
                  Coursework:{" "}
                </span>
                <span>{item.coursework}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
