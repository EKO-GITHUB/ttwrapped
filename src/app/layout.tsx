import "./globals.css";
import React from "react";
import { Analytics } from "@vercel/analytics/next";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import Auth_Nav from "@/components/layout/Auth_Nav";

export const metadata: Metadata = {
  title: "TTWrapped - Your TikTok Year in Review",
  description:
    "Analyze your TikTok data export with a Spotify Wrapped-style experience. View your watch time, activity stats, and personality profile - all processed privately in your browser.",

  openGraph: {
    title: "TTWrapped - Your TikTok Year in Review",
    description: "Analyze your TikTok data export with a Spotify Wrapped-style experience.",
    url: "https://ttwrapped.com",
    siteName: "TTWrapped",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TTWrapped - TikTok Analytics",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "TTWrapped - Your TikTok Year in Review",
    description: "Analyze your TikTok data export with a Spotify Wrapped-style experience.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <meta
            property="og:logo"
            content="https://ttwrapped.com/logo.png"
          />
          <link
            rel="preconnect"
            href="https://fonts.googleapis.com"
          />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=TikTok+Sans:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </head>
        <body className="font-tiktok">
          <Auth_Nav />
          {children}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
