"use client";

import React, { useState, useEffect } from "react";
import { Mail, Linkedin, Github, Lock, Unlock, LogOut, Menu, X, FileText, ArrowUpRight } from "lucide-react";
import { Profile, SocialLink } from "@/types/portfolio";

interface SidebarProps {
  profile: Profile;
  socials: SocialLink[];
  isAdmin: boolean;
  activeSection: string;
  onOpenAuth: () => void;
  onLogout: () => void;
}

const NAV_ITEMS = [
  { num: "01", label: "About",      id: "hero"        },
  { num: "02", label: "Experience", id: "experience"  },
  { num: "03", label: "Work",       id: "projects"    },
  { num: "04", label: "Skills",     id: "skills"      },
  { num: "05", label: "Connect",    id: "connect"     },
];

function SubstackIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
    </svg>
  );
}

function getSocialIcon(icon: string, className = "w-3.5 h-3.5") {
  switch (icon.toLowerCase()) {
    case "linkedin":  return <Linkedin className={className} />;
    case "github":    return <Github   className={className} />;
    case "mail":
    case "email":     return <Mail     className={className} />;
    case "substack":  return <SubstackIcon className={className} />;
    default:          return <ArrowUpRight className={className} />;
  }
}

export function Sidebar({ profile, socials, isAdmin, activeSection, onOpenAuth, onLogout }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      {/* ===================== MOBILE HEADER ===================== */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4 bg-navy-950/95 backdrop-blur-md border-b border-navy-400">
        <div>
          <span className="font-serif text-sm font-normal tracking-widest uppercase text-gold-500">
            Anurag Mishra
          </span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={profile.resume_url || "/resume.pdf"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 border border-gold-500/50 text-gold-500 text-[11px] font-sans tracking-widest uppercase hover:bg-gold-500/10 transition-colors"
          >
            <FileText className="w-3 h-3" />
            <span>Resume</span>
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-muted hover:text-white transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 pt-16 bg-navy-950/98 backdrop-blur-sm flex flex-col p-8 gap-6">
          <nav className="flex flex-col gap-6 mt-4">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="flex items-center gap-4 text-left"
                >
                  <span className="font-serif italic text-gold-500/60 text-sm w-6">{item.num}</span>
                  <span className={`font-serif text-xl transition-colors ${isActive ? "text-white" : "text-muted hover:text-white"}`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>
          <div className="mt-auto flex items-center gap-4 text-muted text-xs">
            {isAdmin ? (
              <button onClick={onLogout} className="flex items-center gap-1.5 hover:text-white transition-colors">
                <LogOut className="w-3.5 h-3.5" /> Sign Out
              </button>
            ) : (
              <button onClick={onOpenAuth} className="flex items-center gap-1.5 hover:text-gold-500 transition-colors">
                <Lock className="w-3.5 h-3.5" /> Admin
              </button>
            )}
          </div>
        </div>
      )}

      {/* ===================== DESKTOP SIDEBAR ===================== */}
      <aside className="hidden md:flex fixed inset-y-0 left-0 w-[360px] flex-col z-30 bg-navy-950 border-r border-navy-400">
        {/* Top — Branding & Tagline */}
        <div className="flex-1 flex flex-col px-10 pt-12 pb-6 overflow-y-auto">

          {/* Logo / Name */}
          <div>
            <span className="text-[11px] font-sans font-medium tracking-[0.2em] uppercase text-gold-500/80">
              Anurag Mishra
            </span>
          </div>

          {/* Tagline */}
          <div className="mt-6">
            <p className="font-serif text-[22px] leading-[1.4] text-white font-light">
              I sit at the intersection of{" "}
              <span className="italic text-gold-500">capital markets</span> and{" "}
              <span className="italic text-gold-500">analytics</span>:{" "}
              strategic thinking, backed by systems that quantify it.
            </p>
          </div>

          {/* Availability */}
          <div className="mt-6 flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-sans text-muted">
              {profile.available_for_work ? "Available for roles — MBA 2027" : "Not currently available"}
            </span>
          </div>

          {/* Nav */}
          <nav className="mt-10 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`group flex items-center gap-4 py-2.5 text-left transition-all`}
                >
                  <span className="font-serif italic text-[13px] text-gold-500/50 w-6 shrink-0">
                    {item.num}
                  </span>
                  <span
                    className={`font-serif text-[17px] transition-colors ${
                      isActive ? "text-white italic" : "text-muted group-hover:text-white"
                    }`}
                  >
                    {item.label}
                  </span>
                  <div
                    className={`ml-auto h-px transition-all ${
                      isActive ? "w-7 bg-gold-500" : "w-4 bg-navy-400 group-hover:bg-muted"
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Contact Links */}
          <div className="mt-8 space-y-2">
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-2 text-[12px] font-sans text-muted hover:text-gold-400 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{profile.email}</span>
              </a>
            )}
            {socials
              .filter((s) => s.is_active && s.icon !== "mail")
              .slice(0, 3)
              .map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[12px] font-sans text-muted hover:text-gold-400 transition-colors"
                >
                  {getSocialIcon(s.icon, "w-3.5 h-3.5")}
                  <span>{s.label}</span>
                  <ArrowUpRight className="w-2.5 h-2.5 ml-auto opacity-50" />
                </a>
              ))}
          </div>

          {/* Resume + Admin */}
          <div className="mt-6 pt-5 border-t border-navy-400 flex items-center justify-between">
            <a
              href={profile.resume_url || "/resume.pdf"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[11px] font-sans tracking-widest uppercase text-gold-500 hover:text-gold-400 transition-colors"
            >
              <FileText className="w-3 h-3" />
              <span>Resume ↓</span>
            </a>

            {isAdmin ? (
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <Unlock className="w-3 h-3" /> Admin
                </span>
                <button
                  onClick={onLogout}
                  className="text-[11px] text-muted hover:text-rose-400 flex items-center gap-1 transition-colors"
                >
                  <LogOut className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="text-[11px] font-sans text-muted hover:text-white flex items-center gap-1.5 transition-colors"
                title="Admin login"
              >
                <Lock className="w-3 h-3" />
                <span>Admin</span>
              </button>
            )}
          </div>

          {/* Monogram stamp */}
          <div className="mt-5 flex items-center justify-center">
            <div className="relative w-16 h-16">
              <svg viewBox="0 0 64 64" className="w-full h-full text-gold-500/20" fill="none">
                <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-serif text-sm font-light text-gold-500/60 tracking-wider">AM</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
