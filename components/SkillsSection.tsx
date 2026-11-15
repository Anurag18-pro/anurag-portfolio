"use client";

import React from "react";

function SectionKicker({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-10">
      <span className="font-serif italic text-gold-500/70 text-[13px]">{num}</span>
      <div className="h-px w-6 bg-navy-400" />
      <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-muted">{label}</span>
    </div>
  );
}

const COLUMNS = [
  {
    title: "Finance",
    subtitle: "The Judgment",
    items: [
      "DCF & LBO Modeling",
      "Comparable Company Analysis",
      "Financial Statement Analysis",
      "Market Research & Intelligence",
      "Working Capital Management",
      "MS Excel (Advanced)",
    ],
  },
  {
    title: "Technology",
    subtitle: "The Tooling",
    items: [
      "Python (Pandas, NumPy)",
      "SQL & Database Design",
      "Power BI",
      "MS PowerPoint",
      "Next.js & Supabase",
      "Financial Modeling",
    ],
  },
  {
    title: "Business",
    subtitle: "The Translation",
    items: [
      "Strategic Analysis",
      "Market Sizing",
      "Stakeholder Communication",
      "Competitive Intelligence",
      "Report & Pitch Preparation",
      "Cross-functional Teamwork",
    ],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="px-10 md:px-16 py-24 border-t border-navy-400">
      <SectionKicker num="04" label="Capability" />

      <h2 className="font-serif text-3xl md:text-4xl font-light text-white leading-tight mb-16">
        Two disciplines,{" "}
        <span className="font-serif italic text-gold-500">one toolkit</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
        {COLUMNS.map((col) => (
          <div key={col.title}>
            {/* Column header */}
            <div className="mb-6 pb-4 border-b border-navy-400">
              <h3 className="font-serif italic text-gold-500 text-xl mb-1">{col.title}</h3>
              <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-muted">{col.subtitle}</p>
            </div>
            {/* Items */}
            <ul className="space-y-3">
              {col.items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-gold-500 text-sm mt-0.5 shrink-0">—</span>
                  <span className="font-sans text-sm text-body">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
