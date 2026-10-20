"use client";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Star, BookOpen, Eye, ArrowRight } from "lucide-react";

export default function SearchContent() {
  const [searchResult, setSearchResult] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const searchParam = useSearchParams();
  const router = useRouter();
  const q = searchParam.get("q") || "";

  // API Call to fetch search results
  useEffect(() => {
    const getResult = async () => {
      if (!q) {
        setSearchResult([]);
        return;
      }
      try {
        setLoading(true);
        const resp = await axios.get(
          `https://omegaapi8746754.vercel.app/api/v1/search?q=${q}`,
        );
        // API response data array handle karne ke liye
        const data = resp.data.data || resp.data || [];
        setSearchResult(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        console.error("Error fetching search results:", err);
        setSearchResult([]);
      } finally {
        setLoading(false);
      }
    };

    getResult();
  }, [q]);

  // Handle redirect when searching via input button or form submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push("/search?q=" + encodeURIComponent(query));
  };

  const formatNumber = (num) => {
    if (!num) return "0";
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-[#0b0d10] text-[#e0e2e6] px-4 py-8 sm:px-8 lg:px-16 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Search Input Bar Header */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex gap-3 max-w-2xl mx-auto"
        >
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              value={query}
              placeholder="Search series, comics, manhwa..."
              className="w-full bg-[#14171f] border border-gray-800 text-white pl-11 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:border-rose-500 transition-colors shadow-inner"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-rose-500 hover:bg-rose-400 text-white font-extrabold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-rose-500/10 flex items-center gap-2 active:scale-95"
          >
            Search
          </button>
        </form>

        {/* Query Title */}
        {q && (
          <div className="border-b border-gray-800 pb-4">
            <h1 className="text-xl font-bold text-white">
              Search results for: <span className="text-rose-500">"{q}"</span>
            </h1>
          </div>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center items-center py-24">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-rose-500"></div>
          </div>
        )}

        {/* Results Grid */}
        {!loading && searchResult.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {searchResult.map((item) => {
              const poster =
                item.thumbnail ||
                item.cover ||
                "https://via.placeholder.com/200x300";
              const itemSlug = item.slug;

              return (
                <Link
                  key={item.id || itemSlug}
                  href={`/series/${itemSlug}`}
                  className="group bg-[#14171f] border border-gray-800/80 hover:border-rose-500/50 rounded-xl overflow-hidden shadow-md transition-all flex flex-col"
                >
                  {/* Thumbnail Cover */}
                  <div className="relative w-full h-[220px] sm:h-[260px] overflow-hidden bg-gray-900">
                    <img
                      src={poster}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {item.status && (
                      <span className="absolute top-2 left-2 bg-black/70 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-[#00e6a8] px-2 py-0.5 rounded border border-[#00e6a8]/30">
                        {item.status}
                      </span>
                    )}
                  </div>

                  {/* Details info */}
                  <div className="p-3 flex flex-col flex-1 justify-between gap-2">
                    <h3 className="text-xs sm:text-sm font-bold text-white line-clamp-2 group-hover:text-rose-400 transition-colors">
                      {item.title}
                    </h3>

                    <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1 border-t border-gray-800/60">
                      {item.rating ? (
                        <div className="flex items-center gap-1 text-rose-400 font-bold">
                          <Star size={12} fill="currentColor" />
                          <span>{item.rating}</span>
                        </div>
                      ) : (
                        <span />
                      )}

                      {item.totalViews && (
                        <div className="flex items-center gap-1">
                          <Eye size={12} />
                          <span>{formatNumber(item.totalViews)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!loading && q && searchResult.length === 0 && (
          <div className="text-center py-20 bg-[#12151b] rounded-2xl border border-gray-800/80">
            <Search size={40} className="mx-auto mb-3 text-gray-600" />
            <p className="text-gray-300 font-semibold text-base">
              No series found matching "{q}"
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Try searching with a different keyword.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
