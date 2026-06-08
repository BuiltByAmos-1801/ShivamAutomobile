import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { FloatingActions } from "@/components/floating-actions";
import { ThemeProvider } from "@/components/theme-provider";
import { business } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    default: `${business.name} | Authorized Mahindra Workshop in Ranchi`,
    template: `%s | ${business.name}`
  },
  description: "Authorized Mahindra workshop and genuine spare parts center in Ranchi since 2017.",
  openGraph: {
    title: business.name,
    description: business.tagline,
    type: "website",
    locale: "en_IN"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
