"use client";

import React from "react";
import { Certification } from "@/types/portfolio";
import { Award, ExternalLink, Plus, Edit2, Trash2, CheckCircle2 } from "lucide-react";

interface CertificationsSectionProps {
  certifications: Certification[];
  isAdmin: boolean;
  onAddCertification: () => void;
  onEditCertification: (item: Certification) => void;
  onDeleteCertification: (item: Certification) => void;
}

export function CertificationsSection({
  certifications,
  isAdmin,
  onAddCertification,
  onEditCertification,
  onDeleteCertification,
}: CertificationsSectionProps) {
  const sortedCertifications = [...certifications].sort(
    (a, b) => a.display_order - b.display_order
  );

  return (
    <section id="certifications" className="py-12 sm:py-16 border-b border-zinc-200 dark:border-zinc-800/80">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-100 font-sans">
              Certifications & Executive Programs
            </h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
              {certifications.length}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Data analytics credentials, venture mastery, and premier institution programs
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={onAddCertification}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 text-xs font-mono font-medium transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Certification</span>
          </button>
        )}
      </div>

      {/* Grid of Certifications */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sortedCertifications.map((cert) => (
          <div
            key={cert.id}
            className="group relative p-4 rounded-xl border border-zinc-200 dark:border-zinc-800/90 bg-white dark:bg-zinc-900/30 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200 shadow-sm flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20 shrink-0">
                  <Award className="w-4 h-4" />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
                    {cert.issue_date}
                  </span>

                  {isAdmin && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onEditCertification(cert)}
                        className="p-1 rounded text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
                        title="Edit Certification"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => onDeleteCertification(cert)}
                        className="p-1 rounded text-zinc-400 hover:text-rose-400 hover:bg-zinc-800 transition-colors"
                        title="Delete Certification"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                  {cert.title}
                </h3>
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-1">
                  {cert.issuer}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between text-xs">
              {cert.certificate_id ? (
                <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500 truncate max-w-[150px]">
                  ID: {cert.certificate_id}
                </span>
              ) : (
                <span />
              )}

              {cert.credential_url && (
                <a
                  href={cert.credential_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors font-medium ml-auto"
                >
                  <span>Verify</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
