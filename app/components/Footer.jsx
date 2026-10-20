import Link from "next/link";
import { Coffee, ArrowUpRight, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0b1622] text-[#A1A1AA] text-sm pt-16 pb-8 border-t border-[#1F2023]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16">
          {/* Brand Info (Left Side) */}
          <div className="md:col-span-6 space-y-5">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="bg-rose-500 text-black font-extrabold px-2.5 py-1 rounded text-lg tracking-wider transform -skew-x-6">
                T
              </div>
              <span className="text-white font-extrabold text-2xl tracking-wide">
                TOONGAIN
              </span>
            </Link>

            {/* Subtitle */}
            <p className="text-[#8E8F96] max-w-sm leading-relaxed text-[15px]">
              Your premium destination for discovering and reading the best
              Webtoons, Manhwa, and Manhua.
            </p>

            {/* Buy Us A Coffee Button */}

          </div>

          {/* Navigation Links (Right Side) */}
          <div className="md:col-span-6 grid grid-cols-2 gap-8 md:pl-16">
            {/* Discover Column */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-5 flex items-center gap-2">
                <span className="text-rose-500 font-normal">—</span> DISCOVER
              </h3>
              <ul className="space-y-3.5 text-[14px]">
                {["Trending", "New Release", "Pornhwa", "Completed", "Search"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                        className="hover:text-white transition-colors"
                      >
                        {item}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* Support Column */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-5 flex items-center gap-2">
                <span className="text-rose-500 font-normal">—</span> SUPPORT
              </h3>
              <ul className="space-y-3.5 text-[14px]">
                {[
                  "About Us",
                  "Feedback",
                  "Suggest Series",
                  "Community",
                  "Guilds",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                      className="hover:text-white transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#1F2028] pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-[#71717A]">
          {/* Legal / Policy Links */}
          <div className="flex flex-wrap items-center gap-6">
            <Link
              href="/terms-of-service"
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy-policy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/cookie-policy"
              className="hover:text-white transition-colors"
            >
              Cookie Policy
            </Link>
            <Link href="/dmca" className="hover:text-white transition-colors">
              DMCA
            </Link>
            <Link
              href="/mirrors"
              className="hover:text-white transition-colors"
            >
              Mirrors
            </Link>
          </div>

          {/* Copyright & Tagline */}
          <div className="flex flex-wrap items-center gap-2 tracking-wider text-[11px] uppercase">
            <span>© 2026 TOONGAIN. ALL RIGHTS RESERVED.</span>
            <span className="hidden md:inline text-[#3F3F46]">|</span>
            <span className="flex items-center gap-1">
              MADE WITH{" "}
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 inline" />{" "}
              FOR MANGA LOVERS
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
