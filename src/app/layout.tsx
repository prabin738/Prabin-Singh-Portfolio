import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { site, SITE_URL } from "@content/data/site";
import { isProductionDeploy } from "@/lib/seo";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { SkipLink } from "@/components/layout/skip-link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { BackToTop } from "@/components/layout/back-to-top";

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
});

const TITLE = "Prabin Singh Thakuri | Full-stack developer in Kathmandu";
const DESCRIPTION =
  "Full-stack developer in Kathmandu building React and React Native apps with Node.js APIs. See Mero Loksewa and case studies with architecture and results.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Prabin Singh Thakuri",
  },
  description: DESCRIPTION,
  keywords: [
    "Prabin Singh Thakuri",
    "full stack developer Kathmandu",
    "React Native developer Nepal",
    "React developer Nepal",
    "Node.js developer Nepal",
  ],
  authors: [{ name: site.name, url: SITE_URL }],
  creator: site.name,
  publisher: site.name,
  alternates: {
    canonical: "/",
  },
  // Anything other than a Vercel production build gets noindex, so a preview
  // or a stray local export can never leak into search results — see
  // docs/08-seo-performance.md section 2 and src/lib/seo.ts.
  robots: {
    index: isProductionDeploy,
    follow: isProductionDeploy,
    googleBot: {
      index: isProductionDeploy,
      follow: isProductionDeploy,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: site.name,
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#0d1428",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={bricolageGrotesque.className} suppressHydrationWarning>
        <ThemeProvider>
          <SkipLink />
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
