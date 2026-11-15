"use client";

import React from "react";
import { Plus, Edit2, Trash2, ExternalLink } from "lucide-react";
import { Project } from "@/types/portfolio";

interface ProjectsSectionProps {
  projects: Project[];
  isAdmin: boolean;
  onAddProject: () => void;
  onEditProject: (project: Project) => void;
  onDeleteProject: (project: Project) => void;
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

function padNum(n: number) {
  return String(n).padStart(2, "0");
}

export function ProjectsSection({
  projects,
  isAdmin,
  onAddProject,
  onEditProject,
  onDeleteProject,
}: ProjectsSectionProps) {
  const sorted = [...projects].sort((a, b) => a.display_order - b.display_order);

  return (
    <section id="projects" className="px-10 md:px-16 py-24 border-t border-navy-400">
      <SectionKicker num="03" label="Work" />

      <div className="flex items-start justify-between mb-12">
        <h2 className="font-serif text-3xl md:text-4xl font-light text-white leading-tight">
          Projects with a{" "}
          <span className="font-serif italic text-gold-500">point of view</span>
        </h2>
        {isAdmin && (
          <button
            onClick={onAddProject}
            className="flex items-center gap-1.5 text-[11px] font-sans tracking-widest uppercase text-gold-500 border border-gold-500/50 hover:bg-gold-500/10 px-3 py-2 transition-colors shrink-0"
          >
            <Plus className="w-3.5 h-3.5" /> Add
          </button>
        )}
      </div>

      <div className="border-t border-navy-400">
        {sorted.length === 0 && (
          <p className="py-8 text-muted font-sans text-sm italic">No projects yet.</p>
        )}
        {sorted.map((project, i) => (
          <div
            key={project.id}
            className="group relative flex items-center gap-6 md:gap-10 py-6 border-b border-navy-400 hover:pl-3 transition-all duration-200 hover:border-l-2 hover:border-l-gold-500"
          >
            {/* Number */}
            <span className="font-serif italic text-gold-500/60 text-lg md:text-xl w-8 shrink-0 select-none">
              {padNum(i + 1)}
            </span>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-serif text-lg md:text-xl text-white group-hover:text-gold-100 transition-colors">
                  {project.title}
                </h3>
                {project.featured && (
                  <span className="font-sans text-[10px] tracking-widest uppercase text-gold-500 border border-gold-500/50 px-2 py-0.5">
                    Live
                  </span>
                )}
              </div>
              <p className="font-sans text-muted text-sm leading-relaxed line-clamp-2">
                {project.description}
              </p>
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {project.tags.slice(0, 4).map((tag: string) => (
                    <span key={tag} className="font-sans text-[10px] text-muted/70 bg-navy-950 border border-navy-400 px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Right: links + admin */}
            <div className="flex items-center gap-2 shrink-0">
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted hover:text-gold-400 transition-colors"
                  title="Live site"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {/* Circular + expand button */}
              <button
                onClick={() => onEditProject(project)}
                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
                  isAdmin
                    ? "border-gold-500/50 text-gold-500 hover:bg-gold-500/10"
                    : "border-navy-400 text-muted hover:border-gold-500/50 hover:text-gold-500"
                }`}
                title={isAdmin ? "Edit project" : "View details"}
              >
                {isAdmin ? <Edit2 className="w-3 h-3" /> : <span className="text-sm leading-none">+</span>}
              </button>
              {isAdmin && (
                <button
                  onClick={() => onDeleteProject(project)}
                  className="p-1.5 text-muted hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
