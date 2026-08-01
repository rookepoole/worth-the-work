import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Worth the Work — Freelance Project Decision Calculator",
  description:
    "Price hidden hours and client risk before you accept a freelance project. Get a transparent take, counter, or pass decision.",
  alternates: {
    canonical: "https://rookepoole.github.io/worth-the-work/",
  },
  openGraph: {
    type: "website",
    url: "https://rookepoole.github.io/worth-the-work/",
    title: "Worth the Work — Freelance Project Decision Calculator",
    description:
      "Price hidden hours, revisions, scope creep, and client risk before you quote a freelance project.",
  },
  twitter: {
    card: "summary",
    title: "Worth the Work — Freelance Project Decision Calculator",
    description:
      "Get a transparent take, counter, or pass decision for a freelance project.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
