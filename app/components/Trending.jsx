"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaPlay,
  FaCalendarAlt,
  FaFilm,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { FaCirclePlay } from "react-icons/fa6";
import { BiLoaderCircle } from "react-icons/bi";
import { IoStar } from "react-icons/io5";
import { MdIncompleteCircle } from "react-icons/md";

export default function series({ series }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Touch swipe handling for mobile
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const items = Array.isArray(series) ? series : [];
  const totalItems = items.length;

  const nextSlide = useCallback(() => {
    if (totalItems > 0) {
      setCurrentIndex((prev) => (prev + 1) % totalItems);
    }
  }, [totalItems]);

  const prevSlide = useCallback(() => {
    if (totalItems > 0) {
      setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
    }
  }, [totalItems]);

  // Autoplay (5s cycle, pauses on hover)
  useEffect(() => {
    if (totalItems <= 1 || isPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [totalItems, isPaused, nextSlide]);

  // Touch event handlers for mobile gestures
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;

    // Minimum swipe threshold (50px)
    if (diff > 50) {
      nextSlide(); // Swiped left -> next
    } else if (diff < -50) {
      prevSlide(); // Swiped right -> prev
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  if (!items || totalItems === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-[#0b1622] text-gray-400">
        <BiLoaderCircle className="animate-spin" size={30} />
      </div>
    );
  }

  const current = items[currentIndex];

  return (
    <div
      className="relative w-full h-[440px] sm:h-[480px] md:h-[560px] lg:h-[600px] bg-[#0b1622] overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Poster Image */}
      <div className="absolute inset-0">
        <Image
          key={current?.id || currentIndex}
          src={current?.thumbnail}
          alt={current?.title || "series"}
          fill
          priority
          sizes=""
          className="object-cover object-center sm:object-center transition-opacity duration-700 ease-in-out opacity-80"
        />
      </div>

      {/* Mobile Gradient (Bottom to Top) & Desktop Gradient (Left to Right) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b1622] via-[#0b1622]/80 via-45% to-transparent pointer-events-none md:hidden" />
      <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-[#0b1622] via-[#0b1622]/60 via-45% to-transparent pointer-events-none" />
      <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-[#0b1622] via-transparent to-black/20 pointer-events-none" />

      {/* Main Content Info */}
      <div className="relative z-10 h-full flex flex-col justify-end md:justify-center px-4 sm:px-8 md:px-14 lg:px-20 pb-7 md:pb-0 max-w-full md:max-w-2xl lg:max-w-3xl space-y-2.5 sm:space-y-3 md:space-y-4">
        {/* Spotlight Badge */}
        <span className="text-rose-500 font-semibold text-xs sm:text-sm md:text-base tracking-wide">
          #{currentIndex + 1} Spotlight
        </span>

        {/* Title */}
        <h1 className="text-xl italic sm:text-2xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-snug line-clamp-2 drop-shadow-sm">
          {current?.title}
        </h1>

        <h2 className="text-xs sm:text-sm md:text-md lg:text-lg text-white tracking-tight leading-snug line-clamp-2 drop-shadow-sm">
          {current?.alternativeNames}
        </h2>

        {/* Metadata Details (Icons matching mobile screenshot) */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm  font-medium text-white">
          {/* Media Type */}
          {current?.type && (
            <div className="flex items-center gap-1.5">
              <FaCirclePlay className="text-sm" />
              <span>{current.type}</span>
            </div>
          )}

          {/* Release Date / Season or Japanese Title Fallback */}
          <div className="flex items-center gap-1.5 text-white">
            <FaCalendarAlt className=" text-xs sm:text-sm" />
            <span className="line-clamp-1 max-w-[150px] sm:max-w-[200px]">
              {current?.status || "TV Series"}
            </span>
          </div>

          {/* Episode Count */}
          {(current?.total || current?.sub) && (
            <div className="flex items-center gap-1.5">
              <FaFilm className=" text-xs sm:text-sm" />
              <span>{current?.total ?? current?.sub} eps</span>
            </div>
          )}
        </div>

        {/* Desktop Synopsis (Hidden on small mobile screens to keep it compact) */}
        {current?.japaneseTitle && (
          <p className="hidden md:block text-gray-300/80 text-xs sm:text-sm line-clamp-2 max-w-xl">
            {current.japaneseTitle}
          </p>
        )}

        {/* "Watch now" Button */}
        <div className="pt-1.5 sm:pt-2">
          <Link
            href={'/series/'+current?.slug}
            className="inline-flex items-center gap-2 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-medium text-xs sm:text-sm md:text-base px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg shadow-md transition-all duration-200"
          >
            <FaPlay className="text-[10px] sm:text-xs fill-white" />
            <span>Read now</span>
          </Link>
        </div>
      </div>

      {/* Navigation Arrows (Desktop Right-Side Stack) */}
      <div className="hidden md:flex items-end absolute bottom-8 right-6 lg:right-12 z-20 flex-col gap-2">
        <div>
          <Image
            src={current?.cover}
            alt="poster"
            width={500}
            height={500}
            className="aspect-2/3 w-50 hidden sm:block"
          />
        </div>
        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="w-10 h-10 rounded-lg bg-[#182332]/80 hover:bg-rose-500 text-gray-200 hover:text-white flex items-center justify-center transition-all duration-200 border border-white/10 backdrop-blur-sm active:scale-95"
        >
          <FaChevronRight className="text-sm" />
        </button>

        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="w-10 h-10 rounded-lg bg-[#182332]/80 hover:bg-rose-500 text-gray-200 hover:text-white flex items-center justify-center transition-all duration-200 border border-white/10 backdrop-blur-sm active:scale-95"
        >
          <FaChevronLeft className="text-sm" />
        </button>
      </div>
    </div>
  );
}
