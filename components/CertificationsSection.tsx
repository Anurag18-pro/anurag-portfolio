"use client";

import React from "react";
import { Plus, Edit2, Trash2, ExternalLink } from "lucide-react";
import { Certification } from "@/types/portfolio";

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
  const sorted = [...certifications].sort((a, b) => a.display_order - b.display_order);

  return (
    <section id="certifications" className="px-10 md:px-16 py-24 border-t border-navy-400">
      <div className="flex items-center gap-3 mb-10">
        <span className="font-serif italic text-gold-500/70 text-[13px]">06</span>
        <div className="h-px w-6 bg-navy-400" />
        <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-muted">Certifications</span>
      </div>

      <div className="flex items-start justify-between mb-12">
        <h2 className="font-serif text-3xl md:text-4xl font-light text-white leading-tight">
          Credentials &amp;{" "}
          <span className="font-serif italic text-gold-500">programs</span>
        </h2>
        {isAdmin && (
          <button
            onClick={onAddCertification}
            className="flex items-center gap-1.5 text-[11px] font-sans tracking-widest uppercase text-gold-500 border border-gold-500/50 hover:bg-gold-500/10 px-3 py-2 transition-colors shrink-0"
          >
            <Plus className="w-3.5 h-3.5" /> Add
          </button>
        )}
      </div>

      <div className="border-t border-navy-400">
        {sorted.length === 0 && (
          <p className="py-8 text-muted font-sans text-sm italic">No certifications yet.</p>
        )}
        {sorted.map((cert) => (
          <div
            key={cert.id}
            className="group flex items-center justify-between gap-4 py-5 border-b border-navy-400 hover:bg-surface/30 -mx-2 px-2 transition-colors"
          >
            {/* Year */}
            <span className="font-mono text-gold-500 text-[11px] w-12 shrink-0">
              {cert.issue_date || "—"}
            </span>

            {/* Title + Issuer */}
            <div className="flex-1 min-w-0">
              <p className="font-sans text-sm text-white font-medium">{cert.title}</p>
              <p className="font-sans text-[12px] text-muted mt-0.5">{cert.issuer}</p>
              {cert.certificate_id && (
                <p className="font-mono text-[10px] text-gold-500/60 mt-0.5">ID: {cert.certificate_id}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              {cert.credential_url && cert.credential_url !== "#" && (
                <a
                  href={cert.credential_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-muted hover:text-gold-400 transition-colors"
                  title="View Credential"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {isAdmin && (
                <>
                  <button
                    onClick={() => onEditCertification(cert)}
                    className="p-1.5 text-muted hover:text-gold-400 transition-colors opacity-0 group-hover:opacity-100"
                    title="Edit certification"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDeleteCertification(cert)}
                    className="p-1.5 text-muted hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100"
                    title="Delete certification"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
