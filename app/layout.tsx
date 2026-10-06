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
  title: "FEVER — First Anniversary",
  description: "A private invitation to celebrate FEVER's first anniversary.",
  applicationName: "FEVER First Anniversary",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
  openGraph: {
    title: "FEVER — First Anniversary",
    description:
      "One year of music, energy and unforgettable nights. A private invitation from FEVER.",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1731,
        height: 909,
        alt: "FEVER first anniversary invitation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FEVER — First Anniversary",
    description:
      "One year of music, energy and unforgettable nights. A private invitation from FEVER.",
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
