import type { Metadata } from "next";
import { Cormorant_Garamond, Great_Vibes } from "next/font/google";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import ThemePanel from "@/components/theme/ThemePanel";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const greatVibes = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Brand Maker — Theme Builder",
  description: "Test and customize colors and fonts on real templates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${cormorant.variable} ${greatVibes.variable} antialiased`}
      >
        <ThemeProvider>
          <ThemePanel />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
