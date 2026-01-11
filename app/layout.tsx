import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navigation from "@/components/Navigation";
import ThemeWrapper from "./theme-wrapper";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const baseUrl = "https://www.shivai.co.in";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Shiv.AI | Intelligent Agentic Knowledge Ecosystem",
  description: "Transform your enterprise with autonomous AI agents that learn, adapt, and collaborate. SHiV.Ai creates an interconnected knowledge ecosystem where intelligent agents unlock infinite possibilities.",
  keywords: ["SHiV.Ai", "agentic AI", "knowledge ecosystem", "autonomous agents", "intelligent systems", "AI collaboration", "enterprise AI", "AI solutions"],
  authors: [{ name: "SHiV.Ai" }],
  creator: "SHiV.Ai",
  publisher: "SHiV.Ai",
  
  // Canonical URL
  alternates: {
    canonical: baseUrl,
    languages: {
      'en-US': baseUrl,
    },
  },
  
  openGraph: {
    title: "Shiv.AI | Intelligent Agentic Knowledge Ecosystem",
    description: "Transform your enterprise with autonomous AI agents that learn, adapt, and collaborate.",
    url: baseUrl,
    siteName: "Shiv.AI",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Shiv.AI - Intelligent Agentic Knowledge Ecosystem",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Shiv.AI | Intelligent Agentic Knowledge Ecosystem",
    description: "Transform your enterprise with autonomous AI agents",
    images: [`${baseUrl}/twitter-image.png`],
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  verification: {
    google: 'google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

  return (
    <html lang="en">
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.clarity.ms" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
        
        {/* Favicon and theme */}
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        
        {/* Google Analytics 4 Global Site Tag */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
              async
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}', {
                    page_path: window.location.pathname,
                    allow_google_signals: false,
                    anonymize_ip: true,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-themed text-themed-primary`}>
        <AnalyticsProvider>
          <ThemeWrapper>
            <Navigation />
            <main className="min-h-screen">
              {children}
            </main>
          </ThemeWrapper>
        </AnalyticsProvider>
      </body>
    </html>
  );
}
