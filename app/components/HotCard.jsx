'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FaStar } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";

export default function HotCard({ hotItem, idx }) {
  const router = useRouter()
  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      compactDisplay: "short",
    }).format(num);
  };


  const redirect = () => {
    router.push('/series/'+hotItem?.slug)
  }

  return (
    <div className="relative mb-3 shadow-md shadow-black" onClick={() => redirect()}>
      <div
        className={`text-7xl font-black absolute -top-9 sm:-top-9 z-40 -left-1
      ${
        idx === 0
          ? "text-[#FFD700] drop-shadow-[0_0_10px_rgba(255,215,0,0.9)]"
          : idx === 1
            ? "text-[#ececec] drop-shadow-[0_0_10px_rgba(192,192,192,0.9)]"
            : idx === 2
              ? "text-[#e38c36] drop-shadow-[0_0_10px_rgba(205,127,50,0.9)]"
              : "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.9)] opacity-30"
      }`}
      >
        {idx + 1}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b1622] via-[#0b1622]/30 via-45% to-transparent pointer-events-none" />
      <Image
        src={hotItem?.thumbnail}
        alt={hotItem.title}
        width={500}
        height={500}
        className="w-50 aspect-3/4 mt-9"
      />
      <h1 className="text-white absolute bottom-2 text-md px-2 font-bold">
        {hotItem?.title.length > 20
          ? hotItem?.title.slice(0, 20)
          : hotItem?.title}
      </h1>

      <div className="flex items-center rounded-xs gap-1 absolute bg-[#0b1622] top-1 right-1 px-1 py-0.5">
        <div className="flex items-center gap-1">
          <FaStar size={12} color="yellow" />
          <p className="text-yellow-300 font-black text-xs">
            {hotItem?.rating}
          </p>
          <p className="text-gray-400 text-xs">●</p>
        </div>
        <div className="flex items-center gap-1">
          <p className="text-white text-xs font-black">
            {hotItem?.chaptersCount} CH
          </p>
          <p className="text-gray-400 text-xs">●</p>
        </div>
        <div className="flex items-center gap-1">
          <MdOutlineRemoveRedEye size={12} color="white" />
          <p className="text-white text-xs font-black">{formatNumber(hotItem?.totalViews)}</p>
        </div>
      </div>
    </div>
  );
}
