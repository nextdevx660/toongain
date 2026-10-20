"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavbarLinks() {
  const pathname = usePathname();

  const navLinks = [
    { name: "DISCOVER", href: "/" },
    { name: "TRENDING", href: "/trending" },
    { name: "NEW RELEASES", href: "/new-release" },
    { name: "PORNHWA", href: "/pornhwa" },
    { name: "COMPLETED", href: "/completed" },
    { name: "SEARCH", href: "/search" },
  ];

  return (
    <div className="hidden md:flex items-center bg-[#101318]/90 border border-gray-800/80 rounded-md overflow-hidden">
      {navLinks.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.name}
            href={link.href}
            className={`px-4 py-2 text-xs font-bold tracking-wider transition-all border-r border-gray-800/80 last:border-r-0 ${
              isActive
                ? "bg-[#181c24] text-rose-500 border-rose-500/80 shadow-[inset_0_0_12px_rgba(245,158,11,0.08)]"
                : "text-gray-400 hover:text-gray-200 hover:bg-[#14171e]"
            }`}
          >
            {link.name}
          </Link>
        );
      })}
    </div>
  );
}

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-[#0a0c0f]/95 backdrop-blur-md border-b border-gray-900/80 px-4 sm:px-8 py-3 flex items-center justify-between font-sans">
      {/* Logo and badge */}
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-1.5 group">
          <div className="w-7 h-7 bg-rose-500 rounded-sm flex items-center justify-center rotate-[-6deg] shadow-sm shadow-rose-500/20 group-hover:scale-105 transition-transform">
            <span className="text-black font-black text-lg leading-none italic">
              T
            </span>
          </div>

          <span className="text-white font-extrabold text-xl tracking-tight leading-none">
            TOON<span className="text-gray-100">GAIN</span>
          </span>
        </Link>

        <div className="flex items-center gap-1 bg-[#14171d] border border-gray-800/80 px-2.5 py-1 rounded-md text-rose-500 text-xs font-bold shadow-inner">
          <svg
            className="w-3.5 h-3.5 fill-current"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span>2%</span>
        </div>
      </div>

      {/* Navigation links */}
      <Suspense fallback={<div className="hidden md:block" />}>
        <NavbarLinks />
      </Suspense>
    </nav>
  );
}
