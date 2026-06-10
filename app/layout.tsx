import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Toaster } from "sonner";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { FloatingActions } from "@/components/floating-actions";
import { ThemeProvider } from "@/components/theme-provider";
import { business } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    default: `${business.name} | Mahindra Spare Parts & Specialized Workshop in Ranchi`,
    template: `%s | ${business.name}`
  },
  description: "Authorized Mahindra spare parts and specialized workshop for Mahindra cars in Ranchi since 2019.",
  openGraph: {
    title: business.name,
    description: business.tagline,
    type: "website",
    locale: "en_IN"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
          <FloatingActions />
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
