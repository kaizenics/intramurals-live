import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import localFont from "next/font/local";
import { Montserrat } from "next/font/google";
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
  title: "Create Next App",
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
         <Navbar />
        {children}
      </body>
    </html>
  );
}
