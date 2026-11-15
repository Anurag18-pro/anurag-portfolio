import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#090f17",
          900: "#0f1723",
          800: "#131f2e",
          700: "#172335",
          600: "#1e2f42",
          500: "#233348",
          400: "#2a3848",
        },
        gold: {
          500: "#b39164",
          400: "#cdb181",
          300: "#dfc99a",
          200: "#f0e2bb",
          100: "#fbeecb",
        },
        body: "#cad4de",
        muted: "#909caa",
      },
      fontFamily: {
        serif: [
          "Fraunces",
          "ui-serif",
          "Georgia",
          "serif",
        ],
        sans: [
          "Manrope",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "monospace",
        ],
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        "fade-up":  "fade-up 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      },
      borderColor: {
        DEFAULT: "#2a3848",
      },
    },
  },
  plugins: [],
};

export default config;
