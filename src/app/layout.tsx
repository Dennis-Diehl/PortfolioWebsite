import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const SITE_URL = "https://dennisd-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dennis Diehl — Portfolio",
    template: "%s — Dennis Diehl",
  },
  description:
    "Portfolio of Dennis Diehl, a computer science student and AI-focused software developer — " +
    "presented as an interactive VS Code-style editor.",
  keywords: [
    "Dennis Diehl",
    "portfolio",
    "software developer",
    "AI",
    "machine learning",
    "full-stack",
    "React",
    "Next.js",
    "Python",
  ],
  authors: [{ name: "Dennis Diehl" }],
  openGraph: {
    type: "website",
    title: "Dennis Diehl — Portfolio",
    description:
      "Computer science student and AI-focused software developer. Explore my work in an " +
      "interactive VS Code-style portfolio.",
    url: SITE_URL,
    siteName: "Dennis Diehl — Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dennis Diehl — Portfolio",
    description:
      "Computer science student and AI-focused software developer, presented as a VS Code-style editor.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#005fb8" },
    { media: "(prefers-color-scheme: dark)", color: "#007acc" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
