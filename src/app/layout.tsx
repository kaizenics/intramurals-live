import type { Metadata } from "next";
import localFont from "next/font/local";
import { Montserrat } from "next/font/google";
import { ThemeProvider } from "@/components/ui/theme-provider";
import AnimatedLayout from "@/components/animated-layout";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const montserrat = Montserrat({
  weight: ["100", "400", "500", "600", "900"],
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const raceSport = localFont({
  src: "./fonts/RaceSport.ttf",
  variable: "--font-race-sport",
});

export const metadata: Metadata = {
  title: "Cross Blazers Cup 2024",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${raceSport.variable} antialiased`}
      >
        <AnimatedLayout>
          <ThemeProvider attribute="class" defaultTheme="dark">
            {children}
          </ThemeProvider>
        </AnimatedLayout>
      </body>
    </html>
  );
}
