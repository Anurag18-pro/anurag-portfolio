"use client";

import React from "react";
import Image from "next/image";
import { Project } from "@/types/portfolio";
import {
  ExternalLink,
  Github,
  Plus,
  Edit2,
  Trash2,
  ArrowUpRight,
} from "lucide-react";

interface ProjectsSectionProps {
  projects: Project[];
  isAdmin: boolean;
  onAddProject: () => void;
  onEditProject: (project: Project) => void;
  onDeleteProject: (project: Project) => void;
}

export function ProjectsSection({
  projects,
  isAdmin,
  onAddProject,
  onEditProject,
  onDeleteProject,
}: ProjectsSectionProps) {
  const sortedProjects = [...projects].sort(
    (a, b) => a.display_order - b.display_order
  );

  return (
    <section id="projects" className="py-12 border-b border-zinc-200/80 dark:border-zinc-800/60">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-sm font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Selected Work & Projects
          </h2>
        </div>

        {isAdmin && (
          <button
            onClick={onAddProject}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 text-xs font-mono transition-colors"
          >
            <Plus className="w-3 h-3" />
            <span>Add Project</span>
          </button>
        )}
      </div>

      {/* 2-Column Minimalist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sortedProjects.map((project) => (
          <div
            key={project.id}
            className="group relative flex flex-col justify-between p-5 rounded-xl border border-zinc-200/80 dark:border-zinc-800/70 bg-white/40 dark:bg-zinc-900/20 hover:border-zinc-400 dark:hover:border-zinc-700 transition-all duration-200"
          >
            <div>
              {/* Header: Title + Year + Controls */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold text-zinc-950 dark:text-zinc-100 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                      {project.title}
                    </h3>
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-emerald-400 transition-colors"
                        title="Open live site"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400">
                    {project.date}
                  </span>
                </div>

                {/* Admin controls */}
                {isAdmin && (
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => onEditProject(project)}
                      className="p-1 rounded text-zinc-400 hover:text-zinc-100 transition-colors"
                      title="Edit Project"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => onDeleteProject(project)}
                      className="p-1 rounded text-zinc-400 hover:text-rose-400 transition-colors"
                      title="Delete Project"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="mt-2.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
                {project.description}
              </p>
            </div>

            {/* Bottom: Tags & Links */}
            <div className="pt-4 mt-3 border-t border-zinc-100 dark:border-zinc-800/50 flex flex-col gap-2.5">
              {/* Tech tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/50 px-1.5 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Links */}
              <div className="flex items-center gap-4 text-xs font-mono">
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-zinc-800 dark:text-zinc-200 hover:text-emerald-500 dark:hover:text-emerald-400 font-medium transition-colors"
                  >
                    <span>Visit App</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                )}

                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors"
                  >
                    <Github className="w-3 h-3" />
                    <span>Source</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
