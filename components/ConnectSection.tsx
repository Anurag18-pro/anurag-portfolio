"use client";

import React, { useState } from "react";
import { Mail, Linkedin, Github, FileText, ArrowUpRight, Send } from "lucide-react";
import { Profile, SocialLink } from "@/types/portfolio";

interface ConnectSectionProps {
  profile: Profile;
  socials: SocialLink[];
  onOpenResumeModal?: () => void;
  isAdmin?: boolean;
}

function SubstackIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
    </svg>
  );
}

function getSocialIcon(icon: string, cls = "w-4 h-4") {
  switch (icon.toLowerCase()) {
    case "linkedin":  return <Linkedin className={cls} />;
    case "github":    return <Github className={cls} />;
    case "substack":  return <SubstackIcon className={cls} />;
    case "mail":
    case "email":     return <Mail className={cls} />;
    default:          return <ArrowUpRight className={cls} />;
  }
}

export function ConnectSection({ profile, socials, onOpenResumeModal, isAdmin }: ConnectSectionProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    const subject = encodeURIComponent(`Portfolio contact from ${name || "visitor"}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.open(`mailto:anuragmishra.mail@proton.me?subject=${subject}&body=${body}`, "_blank");
  };

  const activeSocials = socials.filter((s) => s.is_active && s.icon !== "mail");

  return (
    <section id="connect" className="px-10 md:px-16 py-24 border-t border-navy-400">
      <div className="flex items-center gap-3 mb-10">
        <span className="font-serif italic text-gold-500/70 text-[13px]">08</span>
        <div className="h-px w-6 bg-navy-400" />
        <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-muted">Connect</span>
      </div>

      <h2 className="font-serif text-3xl md:text-4xl font-light text-white leading-tight mb-16">
        {`Let's talk about what I can `}
        <span className="font-serif italic text-gold-500">build for you</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        {/* Left: Contact info */}
        <div className="space-y-6">
          <div>
            <p className="font-sans text-[11px] uppercase tracking-widest text-muted mb-2">Email</p>
            <a
              href={`mailto:${profile.email || "anuragmishra.mail@proton.me"}`}
              className="font-sans text-gold-400 hover:text-gold-300 transition-colors text-sm"
            >
              {profile.email || "anuragmishra.mail@proton.me"}
            </a>
          </div>

          {profile.location && (
            <div>
              <p className="font-sans text-[11px] uppercase tracking-widest text-muted mb-2">Location</p>
              <p className="font-sans text-body text-sm">{profile.location}</p>
            </div>
          )}

          <div>
            <p className="font-sans text-[11px] uppercase tracking-widest text-muted mb-3">Social</p>
            <div className="flex flex-col gap-3">
              {activeSocials.map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-muted hover:text-gold-400 transition-colors font-sans text-sm"
                >
                  {getSocialIcon(s.icon, "w-3.5 h-3.5")}
                  <span>{s.label}</span>
                  <ArrowUpRight className="w-3 h-3 ml-auto opacity-50" />
                </a>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <a
              href={profile.resume_url || "/resume.pdf"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-gold-500/60 text-gold-500 font-sans text-[11px] tracking-widest uppercase hover:bg-gold-500/10 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              Download Resume
            </a>
          </div>
        </div>

        {/* Right: Contact form */}
        <div className="space-y-4">
          <div>
            <label className="block font-sans text-[11px] uppercase tracking-widest text-muted mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full bg-surface border border-navy-400 rounded px-4 py-3 font-sans text-sm text-white placeholder-muted/50 focus:outline-none focus:border-gold-500/60 transition-colors"
            />
          </div>
          <div>
            <label className="block font-sans text-[11px] uppercase tracking-widest text-muted mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full bg-surface border border-navy-400 rounded px-4 py-3 font-sans text-sm text-white placeholder-muted/50 focus:outline-none focus:border-gold-500/60 transition-colors"
            />
          </div>
          <div>
            <label className="block font-sans text-[11px] uppercase tracking-widest text-muted mb-2">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              placeholder="What would you like to discuss?"
              className="w-full bg-surface border border-navy-400 rounded px-4 py-3 font-sans text-sm text-white placeholder-muted/50 focus:outline-none focus:border-gold-500/60 transition-colors resize-none"
            />
          </div>
          <button
            onClick={handleSend}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-gold-500 text-navy-900 font-sans text-[11px] tracking-[0.2em] uppercase font-semibold hover:bg-gold-400 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            Send Message
          </button>
        </div>
      </div>
    </section>
  );
}
