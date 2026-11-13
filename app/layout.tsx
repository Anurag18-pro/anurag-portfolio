import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { ToastProvider } from "@/components/ui/ToastContext";

export const metadata: Metadata = {
  title: "Anurag Mishra | Strategy, Analytics & Product Builder",
  description:
    "Personal portfolio of Anurag Mishra — MBA Candidate, Data Analytics with Python, Business Strategy, and Full-Stack Digital Products.",
  keywords: [
    "Anurag Mishra",
    "MBA",
    "Data Analytics",
    "Python",
    "Business Strategy",
    "Product Management",
    "Full-Stack",
    "Next.js",
    "Supabase",
    "Portfolio",
  ],
  authors: [{ name: "Anurag Mishra" }],
  creator: "Anurag Mishra",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://anuragmishra.me",
    title: "Anurag Mishra — Portfolio",
    description:
      "MBA Candidate | Data Analytics, Strategy & Product Builder. Explore projects, education, certifications, and leadership milestones.",
    siteName: "Anurag Mishra Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anurag Mishra — Portfolio",
    description: "MBA Candidate | Data Analytics, Strategy & Product Builder",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground selection:bg-zinc-800 selection:text-white">
        <ThemeProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
