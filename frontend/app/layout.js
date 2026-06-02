import "./globals.css";
import Script from "next/script";

const GA_ID = "G-GVEP10RL3Q";

export const metadata = {
  title: "Mr Electric Mobility — Authorised Sokudo Electric Dealer",
  description:
    "Mr Electric Mobility is an authorised distributor of Sokudo Electric India. See the full range of Sokudo electric scooters — specs, prices and test rides.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}

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
