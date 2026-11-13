"use client";

import React from "react";
import { Education } from "@/types/portfolio";
import { GraduationCap, Plus, Edit2, Trash2, MapPin, Calendar } from "lucide-react";

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
    <section id="education" className="py-12 sm:py-16 border-b border-zinc-200 dark:border-zinc-800/80">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-100 font-sans">
              Education
            </h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
              {education.length}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Academic training, strategic foundations, and business credentials
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={onAddEducation}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 text-xs font-mono font-medium transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Education</span>
          </button>
        )}
      </div>

      {/* Vertical Timeline */}
      <div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-8">
        {sortedEducation.map((item) => (
          <div key={item.id} className="relative group">
            {/* Timeline node */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border-2 border-emerald-500 transition-transform group-hover:scale-125" />

            <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/30 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div>
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                    {item.degree}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-0.5 text-xs text-zinc-600 dark:text-zinc-400">
                    <span className="font-medium text-emerald-600 dark:text-emerald-400">
                      {item.institution}
                    </span>
                    {item.location && (
                      <>
                        <span className="text-zinc-400">•</span>
                        <span className="inline-flex items-center gap-1 text-zinc-500">
                          <MapPin className="w-3 h-3" />
                          {item.location}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1 text-xs font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/60 px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-700/50">
                    <Calendar className="w-3 h-3 text-zinc-400" />
                    {item.duration}
                  </span>

                  {isAdmin && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onEditEducation(item)}
                        className="p-1 rounded text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
                        title="Edit Education"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDeleteEducation(item)}
                        className="p-1 rounded text-zinc-400 hover:text-rose-400 hover:bg-zinc-800 transition-colors"
                        title="Delete Education"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Highlights */}
              {item.highlights && item.highlights.length > 0 && (
                <ul className="mt-4 space-y-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                  {item.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 shrink-0 mt-2" />
                      <span className="leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
