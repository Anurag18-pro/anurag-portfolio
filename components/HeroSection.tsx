"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Profile, SocialLink } from "@/types/portfolio";
import {
  Linkedin,
  Github,
  Twitter,
  Mail,
  Globe,
  Youtube,
  Instagram,
  Phone,
  Plus,
  Edit2,
  Trash2,
  MapPin,
  FileText,
  ExternalLink,
  Copy,
  Check,
  Upload,
} from "lucide-react";

interface HeroSectionProps {
  profile: Profile;
  socials: SocialLink[];
  isAdmin: boolean;
  onEditProfile: () => void;
  onAddSocial: () => void;
  onEditSocial: (social: SocialLink) => void;
  onDeleteSocial: (social: SocialLink) => void;
  onOpenResumeModal?: () => void;
}

function SubstackIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
    </svg>
  );
}

export function HeroSection({
  profile,
  socials,
  isAdmin,
  onEditProfile,
  onAddSocial,
  onEditSocial,
  onDeleteSocial,
  onOpenResumeModal,
}: HeroSectionProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    if (profile.email) {
      navigator.clipboard.writeText(profile.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const getSocialIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case "linkedin":
        return <Linkedin className="w-3.5 h-3.5" />;
      case "substack":
        return <SubstackIcon className="w-3.5 h-3.5" />;
      case "github":
        return <Github className="w-3.5 h-3.5" />;
      case "twitter":
      case "x":
        return <Twitter className="w-3.5 h-3.5" />;
      case "mail":
      case "email":
        return <Mail className="w-3.5 h-3.5" />;
      case "youtube":
        return <Youtube className="w-3.5 h-3.5" />;
      case "instagram":
        return <Instagram className="w-3.5 h-3.5" />;
      case "phone":
        return <Phone className="w-3.5 h-3.5" />;
      default:
        return <Globe className="w-3.5 h-3.5" />;
    }
  };

  return (
    <section className="relative pt-6 pb-12 sm:pb-16 border-b border-zinc-200/80 dark:border-zinc-800/60">
      <div className="flex flex-col-reverse sm:flex-row sm:items-start justify-between gap-6 sm:gap-10">
        <div className="flex-1 space-y-4">
          {/* Status pill & Location */}
          <div className="flex flex-wrap items-center gap-3">
            {profile.available_for_work && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono tracking-tight bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Available for Strategy, Analytics & Product Roles
              </span>
            )}
            {profile.location && (
              <span className="inline-flex items-center gap-1 text-[11px] text-zinc-500 font-mono">
                <MapPin className="w-3 h-3 text-zinc-400" />
                {profile.location}
              </span>
            )}
          </div>

          {/* Name & Headline */}
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 font-sans">
                {profile.name}
              </h1>
              {isAdmin && (
                <button
                  onClick={onEditProfile}
                  className="p-1 rounded text-zinc-400 hover:text-emerald-400 transition-colors"
                  title="Edit Hero & Bio"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <p className="mt-1 text-sm sm:text-base font-normal text-zinc-600 dark:text-zinc-400 font-mono">
              {profile.headline}
            </p>
          </div>

          {/* Bio */}
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl font-sans">
            {profile.bio}
          </p>

          {/* Connect Bar + Resume Option */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            {/* Resume button for recruiters */}
            <div className="flex items-center gap-1">
              <a
                href={profile.resume_url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-900 dark:border-zinc-100 bg-zinc-950 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-950 text-xs font-mono font-medium hover:opacity-90 transition-opacity shadow-sm"
                title="View Resume / CV for recruiters"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume (CV)</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>

              {isAdmin && (
                <button
                  onClick={onOpenResumeModal}
                  className="p-1.5 text-zinc-400 hover:text-emerald-400 rounded transition-colors"
                  title="Upload / Change Resume PDF"
                >
                  <Upload className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Social accounts */}
            {socials
              .filter((s) => s.is_active)
              .sort((a, b) => a.display_order - b.display_order)
              .map((item) => (
                <div key={item.id} className="relative group/social flex items-center">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 text-xs text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
                    title={item.label || item.platform}
                  >
                    <span className="text-zinc-500 dark:text-zinc-400 group-hover/social:text-zinc-950 dark:group-hover/social:text-zinc-100 transition-colors">
                      {getSocialIcon(item.icon)}
                    </span>
                    <span>{item.label || item.platform}</span>
                  </a>

                  {/* Inline admin controls for social */}
                  {isAdmin && (
                    <div className="flex items-center gap-0.5 ml-0.5">
                      <button
                        onClick={() => onEditSocial(item)}
                        className="p-1 text-zinc-400 hover:text-zinc-100 rounded"
                        title="Edit Social Link"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => onDeleteSocial(item)}
                        className="p-1 text-zinc-400 hover:text-rose-400 rounded"
                        title="Delete Social Link"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              ))}

            {/* Quick Email copy button */}
            {profile.email && (
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800/80 text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                title={`Copy ${profile.email}`}
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-500" />
                    <span className="text-emerald-500 text-[11px] font-mono">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-zinc-400" />
                    <span className="text-[11px] font-mono">Copy Email</span>
                  </>
                )}
              </button>
            )}

            {/* Admin + Add Social button */}
            {isAdmin && (
              <button
                onClick={onAddSocial}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-dashed border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 text-xs font-mono transition-colors"
                title="Add New Social Profile"
              >
                <Plus className="w-3 h-3" />
                <span>Add Link</span>
              </button>
            )}
          </div>
        </div>

        {/* Profile Avatar */}
        {profile.avatar_url && (
          <div className="relative shrink-0">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm bg-zinc-100 dark:bg-zinc-900 group">
              <Image
                src={profile.avatar_url}
                alt={profile.name}
                fill
                sizes="(max-width: 640px) 80px, 96px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
            </div>
            {isAdmin && (
              <button
                onClick={onEditProfile}
                className="absolute -bottom-1 -right-1 p-1 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white transition-colors"
                title="Change Photo"
              >
                <Edit2 className="w-2.5 h-2.5" />
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
