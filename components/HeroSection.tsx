"use client";

import React from "react";
import { Edit2, ChevronDown } from "lucide-react";
import { Profile, SocialLink } from "@/types/portfolio";

interface HeroSectionProps {
  profile: Profile;
  socials?: SocialLink[];
  isAdmin: boolean;
  onEditProfile: () => void;
  onAddSocial?: () => void;
  onEditSocial?: (s: SocialLink) => void;
  onDeleteSocial?: (item: SocialLink) => void;
  onOpenResumeModal: () => void;
}

export function HeroSection({
  profile,
  isAdmin,
  onEditProfile,
  onOpenResumeModal,
}: HeroSectionProps) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-10 md:px-16 py-24 md:py-32"
    >
      {/* Background grid decoration */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#b39164" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-2xl">
        {/* Eyebrow */}
        <p className="text-[11px] font-sans font-medium tracking-[0.25em] uppercase text-gold-500/70 mb-8">
          Portfolio &nbsp;&mdash;&nbsp; MBA &nbsp;&mdash;&nbsp; Finance &amp; Information Technology
        </p>

        {/* Name */}
        <h1 className="font-serif leading-none mb-6">
          <span className="block text-[72px] md:text-[88px] font-light text-white tracking-tight">
            Anurag
          </span>
          <span className="block text-[72px] md:text-[88px] font-light italic text-gold-500 tracking-tight">
            Mishra.
          </span>
        </h1>

        {/* Tagline */}
        <p className="font-sans text-body text-base md:text-lg leading-relaxed max-w-lg mb-10">
          I sit at the intersection of{" "}
          <span className="font-serif italic text-gold-400">capital markets</span> and{" "}
          <span className="font-serif italic text-gold-400">analytics</span>: strategic
          thinking, backed by systems that quantify it.
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap gap-8 mb-12">
          {[
            { val: "MBA", sub: "Finance & IT — in progress" },
            { val: "4+",  sub: "Certifications"             },
            { val: "3+",  sub: "Projects deployed"          },
            { val: "2",   sub: "Internships"                },
          ].map((s) => (
            <div key={s.val} className="flex flex-col">
              <span className="font-serif text-2xl font-light text-gold-500">{s.val}</span>
              <span className="font-sans text-[11px] text-muted mt-0.5">{s.sub}</span>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-5">
          <a
            href={profile.resume_url || "/resume.pdf"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-gold-500 text-gold-500 font-sans text-[11px] tracking-[0.2em] uppercase hover:bg-gold-500 hover:text-navy-900 transition-all duration-200"
          >
            Resume <ChevronDown className="w-3 h-3" />
          </a>
          <button
            onClick={() => scrollTo("projects")}
            className="inline-flex items-center gap-2 font-sans text-[11px] tracking-[0.2em] uppercase text-muted hover:text-white transition-colors"
          >
            View Work <ChevronDown className="w-3 h-3" />
          </button>
        </div>

        {/* Availability */}
        <div className="mt-10 flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-sans text-[11px] text-muted">
            {profile.available_for_work
              ? "Available for strategy & analytics roles — MBA 2027"
              : "Currently unavailable for new roles"}
          </span>
        </div>
      </div>

      {/* Admin edit buttons */}
      {isAdmin && (
        <div className="absolute top-6 right-6 flex items-center gap-2">
          <button
            onClick={onOpenResumeModal}
            className="flex items-center gap-1.5 text-[11px] font-sans text-muted hover:text-gold-400 transition-colors border border-navy-400 hover:border-gold-500/50 px-3 py-1.5 rounded"
          >
            Resume
          </button>
          <button
            onClick={onEditProfile}
            className="flex items-center gap-1.5 text-[11px] font-sans text-muted hover:text-gold-400 transition-colors border border-navy-400 hover:border-gold-500/50 px-3 py-1.5 rounded"
          >
            <Edit2 className="w-3 h-3" /> Edit
          </button>
        </div>
      )}
    </section>
  );
}
