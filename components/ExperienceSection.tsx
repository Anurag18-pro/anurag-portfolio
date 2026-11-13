"use client";

import React from "react";
import { Experience } from "@/types/portfolio";
import { Plus, Edit2, Trash2 } from "lucide-react";

interface ExperienceSectionProps {
  experiences: Experience[];
  isAdmin: boolean;
  onAddExperience?: () => void;
  onEditExperience?: (item: Experience) => void;
  onDeleteExperience?: (item: Experience) => void;
}

export function ExperienceSection({
  experiences,
  isAdmin,
  onAddExperience,
  onEditExperience,
  onDeleteExperience,
}: ExperienceSectionProps) {
  const sortedExperiences = [...experiences].sort(
    (a, b) => a.display_order - b.display_order
  );

  return (
    <section id="experience" className="py-12 border-b border-zinc-200/80 dark:border-zinc-800/60">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-sm font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Professional Experience
          </h2>
        </div>

        {isAdmin && onAddExperience && (
          <button
            onClick={onAddExperience}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 text-xs font-mono transition-colors"
          >
            <Plus className="w-3 h-3" />
            <span>Add Experience</span>
          </button>
        )}
      </div>

      <div className="space-y-6">
        {sortedExperiences.map((exp) => (
          <div
            key={exp.id}
            className="group relative p-4 rounded-xl border border-zinc-200/70 dark:border-zinc-800/50 bg-white/30 dark:bg-zinc-900/10 hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <div>
                <h3 className="text-sm font-semibold text-zinc-950 dark:text-zinc-100">
                  {exp.role}
                </h3>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  <span className="font-medium text-emerald-600 dark:text-emerald-400">
                    {exp.company}
                  </span>
                  {exp.location && <span> · {exp.location}</span>}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
                  {exp.duration}
                </span>

                {isAdmin && (
                  <div className="flex items-center gap-1">
                    {onEditExperience && (
                      <button
                        onClick={() => onEditExperience(exp)}
                        className="p-1 rounded text-zinc-400 hover:text-zinc-100 transition-colors"
                        title="Edit Experience"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                    )}
                    {onDeleteExperience && (
                      <button
                        onClick={() => onDeleteExperience(exp)}
                        className="p-1 rounded text-zinc-400 hover:text-rose-400 transition-colors"
                        title="Delete Experience"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Bullets */}
            {exp.description && exp.description.length > 0 && (
              <ul className="mt-3 space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400 font-sans">
                {exp.description.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-zinc-400 dark:text-zinc-600 font-mono text-[10px] mt-0.5">
                      —
                    </span>
                    <span className="leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Skills */}
            {exp.skills && exp.skills.length > 0 && (
              <div className="mt-3 pt-2.5 border-t border-zinc-100 dark:border-zinc-800/40 flex flex-wrap gap-1.5">
                {exp.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/60 px-1.5 py-0.5 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
