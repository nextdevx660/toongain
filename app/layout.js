import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Suspense } from "react";

export const metadata = {
  title: "TOONGAIN - Free site to read hentai manhwa "Completely free site to read hentai manhwa",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`bg-[#0b1622] hide-scrollbar`}>
      <body className="min-h-full flex flex-col bg-neutral-900">
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
        {children}
        <Footer />
      </body>
    </html>
  );
}
