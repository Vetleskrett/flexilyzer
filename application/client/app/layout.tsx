import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

import Providers from "./providers";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "GitSpect",
  description: "Git analyzer dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={`${inter.variable}`}>
      <body>
        <Providers>
          <div className='mx-auto w-full max-w-screen-2xl p-4'>
            <NavBar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
