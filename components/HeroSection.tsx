"use client";

import React from "react";
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
  Sparkles,
} from "lucide-react";

interface HeroSectionProps {
  profile: Profile;
  socials: SocialLink[];
  isAdmin: boolean;
  onEditProfile: () => void;
  onAddSocial: () => void;
  onEditSocial: (social: SocialLink) => void;
  onDeleteSocial: (social: SocialLink) => void;
}

export function HeroSection({
  profile,
  socials,
  isAdmin,
  onEditProfile,
  onAddSocial,
  onEditSocial,
  onDeleteSocial,
}: HeroSectionProps) {
  const getSocialIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case "linkedin":
        return <Linkedin className="w-4 h-4" />;
      case "github":
        return <Github className="w-4 h-4" />;
      case "twitter":
      case "x":
        return <Twitter className="w-4 h-4" />;
      case "mail":
      case "email":
        return <Mail className="w-4 h-4" />;
      case "youtube":
        return <Youtube className="w-4 h-4" />;
      case "instagram":
        return <Instagram className="w-4 h-4" />;
      case "phone":
        return <Phone className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  return (
    <section className="relative pt-6 pb-14 sm:pb-20 border-b border-zinc-200 dark:border-zinc-800/80">
      <div className="flex flex-col-reverse sm:flex-row sm:items-start justify-between gap-6 sm:gap-8">
        <div className="flex-1 space-y-4">
          {/* Status badge & Location */}
          <div className="flex flex-wrap items-center gap-2.5">
            {profile.available_for_work && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Available for Strategy & Product Roles
              </span>
            )}
            {profile.location && (
              <span className="inline-flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                <MapPin className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
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
                  className="p-1.5 rounded-md text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800/60 transition-colors"
                  title="Edit Hero & Bio"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              )}
            </div>
            <p className="mt-1 text-base sm:text-lg font-medium text-zinc-700 dark:text-zinc-300">
              {profile.headline}
            </p>
          </div>

          {/* Bio */}
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
            {profile.bio}
          </p>

          {/* Social Links Bar */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            {socials
              .filter((s) => s.is_active)
              .sort((a, b) => a.display_order - b.display_order)
              .map((item) => (
                <div key={item.id} className="relative group/social flex items-center">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all shadow-sm"
                    title={item.label || item.platform}
                  >
                    <span className="text-zinc-500 dark:text-zinc-400 group-hover/social:text-zinc-900 dark:group-hover/social:text-zinc-100 transition-colors">
                      {getSocialIcon(item.icon)}
                    </span>
                    <span>{item.label || item.platform}</span>
                  </a>

                  {/* Inline admin controls for social */}
                  {isAdmin && (
                    <div className="flex items-center gap-0.5 ml-1">
                      <button
                        onClick={() => onEditSocial(item)}
                        className="p-1 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded transition-colors"
                        title="Edit Social Link"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => onDeleteSocial(item)}
                        className="p-1 text-zinc-400 hover:text-rose-400 hover:bg-zinc-800 rounded transition-colors"
                        title="Delete Social Link"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              ))}

            {profile.resume_url && profile.resume_url !== "#" && (
              <a
                href={profile.resume_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800/80 text-xs font-mono font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
                <span>Resume / CV</span>
              </a>
            )}

            {/* Admin + Add Social button */}
            {isAdmin && (
              <button
                onClick={onAddSocial}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-dashed border-emerald-500/40 text-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/10 text-xs font-mono font-medium transition-colors"
                title="Add New Social Profile"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Social</span>
              </button>
            )}
          </div>
        </div>

        {/* Profile Avatar / Headshot */}
        {profile.avatar_url && (
          <div className="relative shrink-0">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-md bg-zinc-100 dark:bg-zinc-900 group">
              <Image
                src={profile.avatar_url}
                alt={profile.name}
                fill
                sizes="(max-width: 640px) 96px, 112px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
            </div>
            {isAdmin && (
              <button
                onClick={onEditProfile}
                className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors shadow-sm"
                title="Change Photo"
              >
                <Edit2 className="w-3 h-3" />
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
