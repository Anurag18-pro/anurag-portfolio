import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/ui/ToastContext";

export const metadata: Metadata = {
  title: "Anurag Mishra — Finance × Analytics",
  description:
    "Personal portfolio of Anurag Mishra — MBA Candidate (Finance & IT), Investment Banking Research Analyst, and product builder. Noida, India.",
  keywords: [
    "Anurag Mishra",
    "MBA",
    "Finance",
    "Data Analytics",
    "Investment Banking",
    "Portfolio",
    "Next.js",
    "Supabase",
  ],
  authors: [{ name: "Anurag Mishra" }],
  creator: "Anurag Mishra",
  openGraph: {
    type: "website",
    locale: "en_IN",
    title: "Anurag Mishra — Finance × Analytics",
    description: "MBA Candidate | Investment Banking & Market Analytics | Product Builder",
    siteName: "Anurag Mishra Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anurag Mishra — Finance × Analytics",
    description: "MBA Candidate | Investment Banking & Market Analytics",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;1,9..144,300;1,9..144,400;1,9..144,600&family=Manrope:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-navy-900 text-white">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
