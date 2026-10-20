"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  List,
  ArrowUp,
  Home,
  BookOpen,
} from "lucide-react";

export default function ChapterReaderContent({ seriesSlug, chapterSlug }) {
  const router = useRouter();
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getChapterDetails = async () => {
      try {
        setLoading(true);
        // API Endpoint: https://omegaapi8746754.vercel.app/api/v1/chapter/{seriesSlug}/{chapterSlug}
        const resp = await axios.get(
          `https://omegaapi8746754.vercel.app/api/v1/chapter/${seriesSlug}/${chapterSlug}`,
        );
        const data = resp.data.data || resp.data;
        setChapter(data);
        // console.log(data);
      } catch (err) {
        console.error("Error fetching chapter:", err);
        setError("CHAPTER IS NOT AVAILABLE");
      } finally {
        setLoading(false);
      }
    };

    if (seriesSlug && chapterSlug) {
      getChapterDetails();
    }
  }, [seriesSlug, chapterSlug]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0d10] text-white flex flex-col items-center justify-center gap-3">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-rose-500"></div>
        <p className="text-xs text-gray-400 font-medium">Loading chapter...</p>
      </div>
    );
  }

  if (error || !chapter) {
    return (
      <div className="min-h-screen bg-[#0b0d10] text-white flex flex-col items-center justify-center p-4">
        <p className="text-red-400 mb-4">{error || "Chapter nahi mila."}</p>
        <Link
          href={`/series/${seriesSlug}`}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white"
        >
          <ArrowLeft size={16} /> Back to Details
        </Link>
      </div>
    );
  }

  // Handle image pages array from API (check keys like images, pages, or chapterData)
  const pagesList =
    chapter.images || chapter.pages || chapter.chapterData || [];

  return (
    <div className="min-h-screen bg-[#000000] text-[#e0e2e6] flex flex-col font-sans select-none">
      {/* 1. TOP STICKY HEADER */}
      <header className="sticky top-0 z-50 bg-[#0c0e12]/90 backdrop-blur-md border-b border-gray-800/80 px-4 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href={`/series/${seriesSlug}`}
            className="p-1.5 text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-colors"
            title="Back to Details"
          >
            <ArrowLeft size={18} />
          </Link>
          <div className="min-w-0">
            <h1 className="text-sm sm:text-base font-bold text-white truncate">
              {chapter.series.title || seriesSlug}
            </h1>
            <p className="text-xs text-rose-500 font-medium truncate">
              {chapter.name ||
                chapter.title ||
                `Chapter ${chapter.number || ""}`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="p-2 text-gray-400 hover:text-white rounded-lg transition-colors"
            title="Home"
          >
            <Home size={18} />
          </Link>
          <Link
            href={`/series/${seriesSlug}`}
            className="p-2 text-gray-400 hover:text-white rounded-lg transition-colors"
            title="Chapters List"
          >
            <List size={18} />
          </Link>
        </div>
      </header>

      {/* 2. MAIN READER IMAGES CONTAINER */}
      <main className="flex-1 max-w-3xl w-full mx-auto flex flex-col items-center my-2 sm:my-4">
        {pagesList.length > 0 ? (
          pagesList.map((imgUrl, index) => (
            <div key={index} className="w-full relative bg-[#000000]">
              <img
                src={
                  typeof imgUrl === "string"
                    ? imgUrl
                    : imgUrl.url || imgUrl.image
                }
                alt={`Page ${index + 1}`}
                className="w-full h-auto block object-contain"
                loading={index < 3 ? "eager" : "lazy"}
              />
            </div>
          ))
        ) : (
          <div className="py-20 text-center text-gray-500">
            <BookOpen size={40} className="mx-auto mb-3 opacity-40" />
            <p className="text-sm">No images found for this chapter.</p>
          </div>
        )}
      </main>

      {/* 3. BOTTOM NAVIGATION BAR */}
      <footer className="sticky bottom-0 z-50 bg-[#0c0e12]/95 backdrop-blur-md border-t border-gray-800/80 p-3 sm:p-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          {/* Previous Chapter Button */}
          {chapter.prevChapterSlug ? (
            <button
              onClick={() =>
                router.push(
                  `/series/${seriesSlug}/chapter/${chapter.prevChapterSlug}`,
                )
              }
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#161a22] hover:bg-[#202632] border border-gray-800 rounded-xl text-xs sm:text-sm font-semibold text-gray-200 transition-colors"
            >
              <ChevronLeft size={16} />
              <span className="hidden sm:inline">Prev</span>
            </button>
          ) : (
            <div className="w-[70px] sm:w-[90px]" />
          )}

          {/* Quick Chapter Switcher / Go back button */}
          <Link
            href={`/series/${seriesSlug}`}
            className="flex items-center gap-1.5 px-4 py-2 bg-rose-500 hover:bg-rose-400 text-white rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wide transition-all shadow-md shadow-rose-500/10"
          >
            <List size={16} />
            <span>All Chapters</span>
          </Link>

          {/* Next Chapter Button */}

          {/* PREVIOUS CHAPTER BUTTON */}
          <button
            disabled={Number(chapter?.index) <= 1}
            onClick={() => {
              const prevChapterIndex = Math.max(
                1,
                Math.round(Number(chapter?.index) - 1),
              );
              router.push(
                `/series/${seriesSlug}/chapter/chapter-${prevChapterIndex}`,
              );
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 border border-gray-800 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
              Number(chapter?.index) <= 1
                ? "bg-gray-900/50 text-gray-600 border-gray-900 cursor-not-allowed"
                : "bg-[#161a22] hover:bg-[#202632] text-gray-200"
            }`}
          >
            <ChevronLeft size={16} />
            <span className="hidden sm:inline">Prev</span>
          </button>

          {/* NEXT CHAPTER BUTTON */}
          <button
            onClick={() => {
              const nextChapterIndex = Math.round(
                Number(chapter?.index || 0) + 1,
              );
              router.push(
                `/series/${seriesSlug}/chapter/chapter-${nextChapterIndex}`,
              );
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#161a22] hover:bg-[#202632] border border-gray-800 rounded-xl text-xs sm:text-sm font-semibold text-gray-200 transition-colors"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight size={16} />
          </button>

          {/* Floating Scroll-To-Top Button */}
          <button
            onClick={scrollToTop}
            className="p-2.5 bg-gray-800/80 hover:bg-gray-700 border border-gray-700/80 rounded-xl text-gray-300 hover:text-white transition-colors"
            title="Scroll to Top"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </footer>
    </div>
  );
}
