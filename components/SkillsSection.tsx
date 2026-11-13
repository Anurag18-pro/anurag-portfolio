"use client";

import React from "react";

export function SkillsSection() {
  const skillCategories = [
    {
      title: "Core Competencies",
      items: [
        "Market Research",
        "Competitive Intelligence",
        "Business Analysis",
        "Data Collection & Validation",
        "Industry Trend Analysis",
        "Stakeholder Collaboration",
        "Report Preparation",
        "Strategic Recommendations",
      ],
    },
    {
      title: "Technical & Quantitative Tools",
      items: [
        "MS Excel (Advanced – Pivot Tables, Lookups, Dashboards)",
        "Power BI",
        "SQL",
        "Python (Basics)",
        "Financial Modeling (DCF Valuation)",
        "MS PowerPoint",
        "Next.js & Supabase",
      ],
    },
    {
      title: "Soft Skills & Leadership",
      items: [
        "Communication (Fluent English)",
        "Business Acumen",
        "Analytical Thinking",
        "Problem Solving",
        "Negotiation",
        "Cross-functional Teamwork",
      ],
    },
  ];

  return (
    <section id="skills" className="py-12 border-b border-zinc-200/80 dark:border-zinc-800/60">
      <div className="mb-6">
        <h2 className="text-sm font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Skills & Competencies
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {skillCategories.map((cat) => (
          <div
            key={cat.title}
            className="p-4 rounded-xl border border-zinc-200/70 dark:border-zinc-800/50 bg-white/30 dark:bg-zinc-900/10 space-y-3"
          >
            <h3 className="text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400">
              {cat.title}
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {cat.items.map((item) => (
                <span
                  key={item}
                  className="text-xs text-zinc-700 dark:text-zinc-300 bg-zinc-100/80 dark:bg-zinc-800/50 px-2 py-0.5 rounded border border-zinc-200/50 dark:border-zinc-700/40"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
