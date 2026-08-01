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
  metadataBase: new URL("https://rookepoole.github.io/worth-the-work/"),
  title: "Worth the Work — Freelance Project Decision Calculator",
  description:
    "Price hidden hours and client risk before you accept a freelance project. Get a transparent take, counter, or pass decision.",
  alternates: {
    canonical: "https://rookepoole.github.io/worth-the-work/",
  },
  verification: {
    google: "3KQkOn5rdkAvtEkfnpouShjQW5QMP5XCZxt92zt3sYc",
  },
  openGraph: {
    type: "website",
    url: "https://rookepoole.github.io/worth-the-work/",
    title: "Worth the Work — Freelance Project Decision Calculator",
    description:
      "Price hidden hours, revisions, scope creep, and client risk before you quote a freelance project.",
    images: [
      {
        url: "https://rookepoole.github.io/worth-the-work/worth-the-work-preview.jpg",
        width: 1265,
        height: 712,
        alt: "Worth the Work freelance project calculator showing a sample minimum fee and deal-strength readout",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Worth the Work — Freelance Project Decision Calculator",
    description:
      "Get a transparent take, counter, or pass decision for a freelance project.",
    images: [
      "https://rookepoole.github.io/worth-the-work/worth-the-work-preview.jpg",
    ],
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
