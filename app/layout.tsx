import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const display = localFont({
  src: "../node_modules/@fontsource-variable/cormorant-garamond/files/cormorant-garamond-latin-wght-normal.woff2",
  variable: "--font-display",
  weight: "300 700",
  style: "normal",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

const sans = localFont({
  src: "../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
  variable: "--font-sans",
  weight: "200 800",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.feverevent.store",
  ),
  title: "FEVER Grand Opening — Your Place Is Yours",
  description:
    "FEVER Grand Opening · November 6 & 7. A private invitation for the guests whose loyalty, presence and energy have made them part of FEVER.",
  applicationName: "FEVER Membership",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
  openGraph: {
    title: "FEVER Grand Opening — Your Place Is Yours",
    description:
      "Grand Opening · November 6 & 7 · Fraser Jones, Gallardo, The Áche, Canales.",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1731,
        height: 909,
        alt: "FEVER Membership private recognition",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FEVER Grand Opening — Your Place Is Yours",
    description:
      "Grand Opening · November 6 & 7 · Fraser Jones, Gallardo, The Áche, Canales.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable}`}>{children}</body>
    </html>
  );
}
