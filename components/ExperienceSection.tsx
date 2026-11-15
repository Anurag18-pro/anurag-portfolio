"use client";

import React from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { Experience } from "@/types/portfolio";

interface ExperienceSectionProps {
  experiences: Experience[];
  isAdmin: boolean;
  onAddExperience?: () => void;
  onEditExperience?: (item: Experience) => void;
  onDeleteExperience?: (id: string) => void;
}

function SectionKicker({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-10">
      <span className="font-serif italic text-gold-500/70 text-[13px]">{num}</span>
      <div className="h-px w-6 bg-navy-400" />
      <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-muted">{label}</span>
    </div>
  );
}

export function ExperienceSection({
  experiences,
  isAdmin,
  onAddExperience,
  onEditExperience,
  onDeleteExperience,
}: ExperienceSectionProps) {
  const sorted = [...experiences].sort((a, b) => a.display_order - b.display_order);

  return (
    <section id="experience" className="px-10 md:px-16 py-24 border-t border-navy-400">
      <SectionKicker num="02" label="Experience" />

      <div className="flex items-start justify-between mb-12">
        <h2 className="font-serif text-3xl md:text-4xl font-light text-white leading-tight">
          Where I have{" "}
          <span className="font-serif italic text-gold-500">worked</span>
        </h2>
        {isAdmin && onAddExperience && (
          <button
            onClick={onAddExperience}
            className="flex items-center gap-1.5 text-[11px] font-sans tracking-widest uppercase text-gold-500 border border-gold-500/50 hover:bg-gold-500/10 px-3 py-2 transition-colors shrink-0"
          >
            <Plus className="w-3.5 h-3.5" /> Add
          </button>
        )}
      </div>

      <div className="space-y-6">
        {sorted.length === 0 && (
          <p className="text-muted font-sans text-sm italic">No experience entries yet.</p>
        )}
        {sorted.map((exp) => {
          const descList = Array.isArray(exp.description)
            ? exp.description
            : typeof exp.description === "string"
            ? (exp.description as string).split("\n").filter(Boolean)
            : [];

          return (
            <div
              key={exp.id}
              className="group relative bg-surface border border-navy-400 rounded-lg p-6 hover:bg-surface-2 transition-colors"
            >
              {isAdmin && (
                <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {onEditExperience && (
                    <button
                      onClick={() => onEditExperience(exp)}
                      className="p-1.5 text-muted hover:text-gold-400 transition-colors"
                      title="Edit experience"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {onDeleteExperience && (
                    <button
                      onClick={() => onDeleteExperience(exp.id)}
                      className="p-1.5 text-muted hover:text-rose-400 transition-colors"
                      title="Delete experience"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                {/* Left: Duration + Location */}
                <div className="w-32 shrink-0 pt-0.5">
                  <p className="font-sans text-gold-500 text-sm font-medium leading-tight">
                    {exp.duration || "Present"}
                  </p>
                  {exp.location && (
                    <p className="font-sans text-muted text-[11px] mt-1">{exp.location}</p>
                  )}
                </div>

                {/* Right: Role details */}
                <div className="flex-1 min-w-0 pr-0 sm:pr-8">
                  <h3 className="font-serif text-xl text-white mb-0.5">{exp.role}</h3>
                  <p className="font-sans text-gold-500 text-sm font-medium mb-4">{exp.company}</p>

                  {descList.length > 0 && (
                    <ul className="space-y-2">
                      {descList.map((line: string, li: number) => (
                        <li key={li} className="flex gap-3 text-sm text-body font-sans leading-relaxed">
                          <span className="text-gold-500 shrink-0 mt-0.5">—</span>
                          <span>{line.replace(/^[-•]\s*/, "")}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {exp.skills && exp.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {exp.skills.map((skill: string) => (
                        <span
                          key={skill}
                          className="font-sans text-[11px] text-muted bg-navy-950 border border-navy-400 px-2 py-0.5 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
