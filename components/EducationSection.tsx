"use client";

import React from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { Education } from "@/types/portfolio";

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
  const sorted = [...education].sort((a, b) => a.display_order - b.display_order);

  return (
    <section id="education" className="px-10 md:px-16 py-24 border-t border-navy-400">
      <div className="flex items-center gap-3 mb-10">
        <span className="font-serif italic text-gold-500/70 text-[13px]">05</span>
        <div className="h-px w-6 bg-navy-400" />
        <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-muted">Education</span>
      </div>

      <div className="flex items-start justify-between mb-12">
        <h2 className="font-serif text-3xl md:text-4xl font-light text-white leading-tight">
          Academic{" "}
          <span className="font-serif italic text-gold-500">foundation</span>
        </h2>
        {isAdmin && (
          <button
            onClick={onAddEducation}
            className="flex items-center gap-1.5 text-[11px] font-sans tracking-widest uppercase text-gold-500 border border-gold-500/50 hover:bg-gold-500/10 px-3 py-2 transition-colors shrink-0"
          >
            <Plus className="w-3.5 h-3.5" /> Add
          </button>
        )}
      </div>

      <div className="space-y-6">
        {sorted.length === 0 && (
          <p className="text-muted font-sans text-sm italic">No education entries yet.</p>
        )}
        {sorted.map((edu) => (
          <div
            key={edu.id}
            className="group relative bg-surface border border-navy-400 rounded-lg p-6 hover:bg-surface-2 transition-colors"
          >
            {isAdmin && (
              <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onEditEducation(edu)}
                  className="p-1.5 text-muted hover:text-gold-400 transition-colors"
                  title="Edit education"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onDeleteEducation(edu)}
                  className="p-1.5 text-muted hover:text-rose-400 transition-colors"
                  title="Delete education"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
              <div className="w-32 shrink-0 pt-0.5">
                <p className="font-sans text-gold-500 text-sm font-medium leading-tight">
                  {edu.duration || "Present"}
                </p>
                {edu.location && (
                  <p className="font-sans text-muted text-[11px] mt-1">{edu.location}</p>
                )}
              </div>
              <div className="flex-1 min-w-0 pr-0 sm:pr-8">
                <h3 className="font-serif text-xl text-white mb-0.5">{edu.degree}</h3>
                <p className="font-sans text-gold-500 text-sm font-medium mb-3">{edu.institution}</p>
                {edu.highlights && edu.highlights.length > 0 && (
                  <ul className="space-y-1.5 mt-2">
                    {edu.highlights.map((hl, idx) => (
                      <li key={idx} className="flex gap-2.5 text-xs text-body font-sans leading-relaxed">
                        <span className="text-gold-500/70 shrink-0">—</span>
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {edu.coursework && (
                  <div className="mt-3 text-xs text-muted">
                    <span className="uppercase tracking-wider text-[10px] text-gold-500/80">Coursework: </span>
                    <span className="text-body">{edu.coursework}</span>
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
