"use client";

import React from "react";
import { Certification } from "@/types/portfolio";
import { Plus, Edit2, Trash2, ArrowUpRight } from "lucide-react";

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
    <section id="certifications" className="py-12 border-b border-zinc-200/80 dark:border-zinc-800/60">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-sm font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Certifications & Executive Programs
          </h2>
        </div>

        {isAdmin && (
          <button
            onClick={onAddCertification}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 text-xs font-mono transition-colors"
          >
            <Plus className="w-3 h-3" />
            <span>Add Cert</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {sortedCertifications.map((cert) => (
          <div
            key={cert.id}
            className="group relative p-3.5 rounded-xl border border-zinc-200/70 dark:border-zinc-800/50 bg-white/30 dark:bg-zinc-900/10 hover:border-zinc-400 dark:hover:border-zinc-700 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-[11px] font-mono text-zinc-400">
                  {cert.issue_date}
                </span>

                <div className="flex items-center gap-1.5">
                  {cert.credential_url && (
                    <a
                      href={cert.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-emerald-400 transition-colors"
                      title="Verify Credential"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {isAdmin && (
                    <>
                      <button
                        onClick={() => onEditCertification(cert)}
                        className="p-0.5 text-zinc-400 hover:text-zinc-100 transition-colors"
                        title="Edit Certification"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => onDeleteCertification(cert)}
                        className="p-0.5 text-zinc-400 hover:text-rose-400 transition-colors"
                        title="Delete Certification"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              <h3 className="text-xs sm:text-sm font-medium text-zinc-900 dark:text-zinc-100 mt-1 leading-snug group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">
                {cert.title}
              </h3>
            </div>

            <div className="mt-2 pt-2 border-t border-zinc-100 dark:border-zinc-800/40 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
              <span className="truncate">{cert.issuer}</span>
              {cert.certificate_id && (
                <span className="text-zinc-400 shrink-0 ml-2">
                  {cert.certificate_id}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
