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
  Layers,
  Sparkles,
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
    <section id="projects" className="py-12 sm:py-16 border-b border-zinc-200 dark:border-zinc-800/80">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-100 font-sans">
              Projects & Engineering
            </h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
              {projects.length}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Software systems, analytics platforms, and full-stack digital architectures
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={onAddProject}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 text-xs font-mono font-medium transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Project</span>
          </button>
        )}
      </div>

      {/* 2-Column Minimalist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {sortedProjects.map((project) => (
          <div
            key={project.id}
            className="group relative flex flex-col justify-between rounded-xl border border-zinc-200 dark:border-zinc-800/90 bg-white dark:bg-zinc-900/40 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/80 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 shadow-sm overflow-hidden"
          >
            {/* Optional Thumbnail Image */}
            {project.image_url && (
              <div className="relative w-full h-40 bg-zinc-100 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800/80 overflow-hidden">
                <Image
                  src={project.image_url}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {project.featured && (
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider font-semibold bg-emerald-500 text-zinc-950 shadow-sm flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" />
                    Featured
                  </div>
                )}
              </div>
            )}

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                {/* Title & Date */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500">
                      {project.date}
                    </span>
                  </div>

                  {/* Admin controls */}
                  {isAdmin && (
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => onEditProject(project)}
                        className="p-1 rounded text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
                        title="Edit Project"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => onDeleteProject(project)}
                        className="p-1 rounded text-zinc-400 hover:text-rose-400 hover:bg-zinc-800 transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="mt-2.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* Tags & Action Links */}
              <div className="pt-2 space-y-3">
                {/* Tech tags */}
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-700/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Live Demo and GitHub buttons */}
                <div className="flex items-center gap-3 pt-1 border-t border-zinc-100 dark:border-zinc-800/60 text-xs">
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-medium text-zinc-800 dark:text-zinc-200 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live App</span>
                    </a>
                  )}

                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Source Code</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
