import "./globals.css";
import Script from "next/script";

const GA_ID = "G-GVEP10RL3Q";
const SITE_URL = "https://mrelectricmobility.com";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Sokudo Electric Scooters in Delhi NCR | Mr Electric Mobility",
  description:
    "Authorised distributor of Sokudo Electric scooters in Delhi NCR. Explore the full Sokudo range — Plus, Pace, Rapid, Select & Acute — prices from ₹67,951, with free test rides, easy finance and service in Ghaziabad & Noida.",
  keywords: [
    "Sokudo electric scooter",
    "electric scooter Delhi NCR",
    "Sokudo dealer Ghaziabad",
    "electric scooter Noida",
    "Sokudo electric scooter price",
    "Mr Electric Mobility",
    "Sokudo Acute",
    "Sokudo Plus",
    "buy electric scooter Delhi NCR",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Sokudo Electric Scooters in Delhi NCR | Mr Electric Mobility",
    description:
      "Authorised Sokudo Electric distributor in Delhi NCR. Full range of Sokudo electric scooters, transparent pricing, free test rides, easy finance and service.",
    url: SITE_URL,
    siteName: "Mr Electric Mobility",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/brand/MR.png", width: 1200, height: 1200, alt: "Mr Electric Mobility — Sokudo Electric" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sokudo Electric Scooters in Delhi NCR | Mr Electric Mobility",
    description:
      "Authorised Sokudo Electric distributor in Delhi NCR. Full range, transparent pricing, free test rides and finance.",
    images: ["/brand/MR.png"],
  },
  robots: { index: true, follow: true },
};

const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "AutomobileDealer",
  name: "Mr Electric Mobility",
  description:
    "Authorised distributor of Sokudo Electric India offering the full range of Sokudo electric scooters in Delhi NCR.",
  image: `${SITE_URL}/brand/MR.png`,
  url: SITE_URL,
  telephone: ["+919999279115", "+919873125802"],
  email: "info@mrelectricmobility.com",
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Khasra No. 225/2, Gda Market, Arthala, Rajendra Nagar, Vasundhara",
    addressLocality: "Ghaziabad",
    addressRegion: "Uttar Pradesh",
    postalCode: "201012",
    addressCountry: "IN",
  },
  areaServed: ["Delhi NCR", "Ghaziabad", "Noida", "Delhi", "Greater Noida"],
  brand: { "@type": "Brand", name: "Sokudo Electric" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}

        {/* Local business structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />

        {/* Google Analytics (gtag.js) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
