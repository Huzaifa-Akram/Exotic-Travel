import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

/*
 * Fonts are self-hosted (app/fonts/*.woff2) rather than fetched from
 * Google at build time. This keeps production builds deterministic and
 * offline-capable — no dependency on fonts.gstatic.com being reachable
 * in CI. Both faces are variable, so a single file covers every weight.
 * Latin subset only; add more subsets here if the client needs them.
 */

// Display face — Cormorant Garamond. Used light (300–500); at large
// sizes a light serif reads as expensive, heavier reads as a newspaper.
const cormorant = localFont({
  variable: "--font-cormorant",
  display: "swap",
  src: "./fonts/cormorant-var-latin.woff2",
  weight: "300 500",
});

// UI + body face — Inter variable.
const inter = localFont({
  variable: "--font-inter",
  display: "swap",
  src: "./fonts/inter-var-latin.woff2",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Exotic Travel — Premium Chauffeur & Airport Transfers",
    template: "%s | Exotic Travel",
  },
  description:
    "Executive chauffeur service and airport transfers. Meet & greet, live flight monitoring, and professional chauffeurs. Request a bespoke quotation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${cormorant.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
