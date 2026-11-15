"use client";

import React from "react";

const SECTIONS = [
  { id: "hero",       label: "About"      },
  { id: "experience", label: "Experience" },
  { id: "projects",   label: "Work"       },
  { id: "skills",     label: "Capability" },
  { id: "connect",    label: "Connect"    },
];

interface DotRailProps {
  activeSection: string;
}

export function DotRail({ activeSection }: DotRailProps) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3 z-30">
      {SECTIONS.map((s) => {
        const isActive = activeSection === s.id;
        return (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            title={s.label}
            className="group relative flex items-center justify-end gap-2"
          >
            {/* Tooltip */}
            <span className="absolute right-5 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-sans tracking-widest uppercase text-muted whitespace-nowrap pointer-events-none">
              {s.label}
            </span>
            {/* Dot */}
            <span
              className={`block rounded-full transition-all duration-300 ${
                isActive
                  ? "w-2 h-2 bg-gold-500"
                  : "w-1.5 h-1.5 bg-navy-400 group-hover:bg-muted"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
