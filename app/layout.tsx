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

export const metadata: Metadata = {
  title: "Shiv.AI | Intelligent Agentic Knowledge Ecosystem",
  description: "Transform your enterprise with autonomous AI agents that learn, adapt, and collaborate. SHiV.Ai creates an interconnected knowledge ecosystem where intelligent agents unlock infinite possibilities.",
  keywords: ["SHiV.Ai", "agentic AI", "knowledge ecosystem", "autonomous agents", "intelligent systems", "AI collaboration", "enterprise AI"],
  authors: [{ name: "SHiV.Ai" }],
  openGraph: {
    title: "SHiV.Ai | Intelligent Agentic Knowledge Ecosystem",
    description: "Transform your enterprise with autonomous AI agents",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shiv.AI | Intelligent Agentic Knowledge Ecosystem",
    description: "Transform your enterprise with autonomous AI agents",
  },
  robots: {
    index: true,
    follow: true,
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
