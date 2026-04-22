import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ConsentBootstrap } from "./components/ConsentBootstrap";

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://midnightautostudio.com"
).replace(/\/$/, "");
const SITE_NAME = "Midnight Auto Studio";
const DEFAULT_TITLE = "Midnight Auto Studio | PPF · Wrap · Tint · Detailing";
const DEFAULT_DESCRIPTION =
  "Butični studio zaščite in preobrazbe za BMW M, Audi RS in Porsche. Premium PPF, wrap, tonirna folija in detailing z 3D vizualizacijo pred montažo.";
const DEFAULT_DESCRIPTION_EN =
  "Boutique protection and transformation studio for BMW M, Audi RS and Porsche. Premium PPF, wrap, window tint and detailing with 3D visualisation before installation.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | Midnight Auto Studio",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: [
    "PPF",
    "paint protection film",
    "zaščita laka",
    "auto folija",
    "car wrap",
    "wrap Ljubljana",
    "tonirna folija",
    "window tint",
    "detailing",
    "ceramic coating",
    "keramična zaščita",
    "BMW M",
    "Audi RS",
    "Porsche",
    "Midnight Auto Studio",
    "Slovenija",
    "Ljubljana",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "automotive",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      "x-default": "/",
      sl: "/",
      en: "/",
      de: "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "sl_SI",
    alternateLocale: ["en_US", "de_DE"],
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION_EN,
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION_EN,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
    shortcut: "/favicon.ico",
    apple: "/logo.webp",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#000000" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.webp`,
      },
      email: "info@midnightautostudio.com",
      sameAs: ["https://instagram.com/midnightautostudio.eu"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: ["sl-SI", "en", "de"],
      publisher: { "@id": `${SITE_URL}#organization` },
    },
    {
      "@type": "AutomotiveBusiness",
      "@id": `${SITE_URL}#business`,
      name: SITE_NAME,
      url: SITE_URL,
      image: `${SITE_URL}/midnight-studio.webp`,
      logo: `${SITE_URL}/logo.webp`,
      email: "info@midnightautostudio.com",
      telephone: "+38640813855",
      priceRange: "€€€",
      address: {
        "@type": "PostalAddress",
        addressCountry: "SI",
      },
      areaServed: [
        { "@type": "Country", name: "Slovenia" },
        { "@type": "AdministrativeArea", name: "EU" },
      ],
      sameAs: [
        "https://instagram.com/midnightautostudio.eu",
        "https://wa.me/38640813855",
      ],
      knowsAbout: [
        "Paint Protection Film",
        "Vehicle Wrap",
        "Window Tint",
        "Ceramic Coating",
        "Automotive Detailing",
      ],
      makesOffer: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Paint Protection Film (PPF)",
            serviceType: "Paint Protection Film installation",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Vehicle Wrap",
            serviceType: "Full and partial vehicle wrap",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Window Tint",
            serviceType: "Automotive window tinting",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Detailing & Ceramic Coating",
            serviceType: "Premium detailing and ceramic coating",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sl">
      <head>
        <ConsentBootstrap />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={montserrat.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
