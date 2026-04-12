import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#0c0e16",
};

export const metadata: Metadata = {
  title: "HLD Brain — Master System Design",
  description:
    "An interactive learning platform to master high-level system design concepts. Track your progress across scaling, databases, caching, messaging, networking, security, architecture, reliability, and storage.",
  keywords: [
    "system design",
    "high level design",
    "HLD",
    "software architecture",
    "distributed systems",
    "interview prep",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased dark`}
      style={{ background: "#0c0e16" }}>
      <body
        className="min-h-full flex flex-col"
        style={{ background: "#0c0e16", color: "#e0e2eb" }}
      >
        {children}
      </body>
    </html>
  );
}
