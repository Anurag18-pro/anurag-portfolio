"use client";

import React, { useState } from "react";
import { Mail, Linkedin, Github, FileText, ArrowUpRight, Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { Profile, SocialLink } from "@/types/portfolio";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/ToastContext";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { success, error: toastError } = useToast();

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toastError("Incomplete fields", "Please fill in your name, email, and message.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      // 1. Send real email directly to Anurag's official address via FormSubmit AJAX API
      const res = await fetch("https://formsubmit.co/ajax/anuragmishra.mail@proton.me", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          _subject: `New Portfolio Message from ${name.trim()} (${email.trim()})`,
          _template: "table",
        }),
      });

      // 2. Also record in Supabase database if configured
      if (isSupabaseConfigured()) {
        try {
          const supabase = createClient();
          await supabase.from("messages").insert([
            {
              name: name.trim(),
              email: email.trim(),
              message: message.trim(),
            },
          ]);
        } catch (dbErr) {
          console.warn("Could not record message in Supabase:", dbErr);
        }
      }

      // 3. Fallback record in local storage so admin can always view it
      try {
        const localInbox = JSON.parse(localStorage.getItem("portfolio_inbox") || "[]");
        localInbox.unshift({
          id: `msg-${Date.now()}`,
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          created_at: new Date().toISOString(),
        });
        localStorage.setItem("portfolio_inbox", JSON.stringify(localInbox));
      } catch {
        // Ignore local storage error
      }

      if (!res.ok) {
        throw new Error("Delivery service returned an unexpected response.");
      }

      setIsSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
      success("Message Sent", "Your message was sent directly to Anurag.");
    } catch (err: unknown) {
      console.error("Message send error:", err);
      // Even if external network fails, if we saved it or if mailto is preferred, handle cleanly
      setErrorMsg("Message delivery service encountered an issue. You can also email directly to anuragmishra.mail@proton.me.");
      toastError("Delivery Notice", "Please also feel free to email directly at anuragmishra.mail@proton.me.");
    } finally {
      setIsSubmitting(false);
    }
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

        {/* Right: Actual Contact form */}
        <div className="space-y-4">
          {isSuccess ? (
            <div className="bg-surface border border-emerald-500/40 rounded-lg p-8 flex flex-col items-center text-center animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="font-serif text-xl text-white mb-2">Message Sent Successfully</h3>
              <p className="font-sans text-sm text-body leading-relaxed max-w-sm mb-6">
                Thank you for reaching out! Your message has been sent directly to Anurag Mishra at{" "}
                <span className="text-gold-400">anuragmishra.mail@proton.me</span>. You will receive a response shortly.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="px-6 py-2.5 border border-gold-500 text-gold-500 font-sans text-[11px] tracking-widest uppercase hover:bg-gold-500 hover:text-navy-900 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSend} className="space-y-4">
              {errorMsg && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div>
                <label className="block font-sans text-[11px] uppercase tracking-widest text-muted mb-2">
                  Name <span className="text-gold-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full bg-surface border border-navy-400 rounded px-4 py-3 font-sans text-sm text-blue-400 font-bold placeholder:text-muted/60 placeholder:font-normal focus:outline-none focus:border-gold-500/60 transition-colors"
                />
              </div>

              <div>
                <label className="block font-sans text-[11px] uppercase tracking-widest text-muted mb-2">
                  Email <span className="text-gold-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-surface border border-navy-400 rounded px-4 py-3 font-sans text-sm text-blue-400 font-bold placeholder:text-muted/60 placeholder:font-normal focus:outline-none focus:border-gold-500/60 transition-colors"
                />
              </div>

              <div>
                <label className="block font-sans text-[11px] uppercase tracking-widest text-muted mb-2">
                  Message <span className="text-gold-500">*</span>
                </label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  placeholder="What would you like to discuss?"
                  className="w-full bg-surface border border-navy-400 rounded px-4 py-3 font-sans text-sm text-blue-400 font-bold placeholder:text-muted/60 placeholder:font-normal focus:outline-none focus:border-gold-500/60 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-gold-500 text-navy-900 font-sans text-[11px] tracking-[0.2em] uppercase font-semibold hover:bg-gold-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
