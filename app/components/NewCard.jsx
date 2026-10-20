'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function NewCard({ hotItem }) {
  const router = useRouter()
  const redirect = () => {
    router.push("/series/" + hotItem?.slug);
  };
  return (
    <div className="py-2 shadow-md shadow-black" onClick={() => redirect()}>
      <Image
        src={hotItem?.thumbnail}
        alt={hotItem?.title}
        width={5000}
        height={5000}
        className="aspect-3/4 w-70"
        loading="eager"
      />
      <h1 className="text-white text-md italic font-bold hover:text-rose-500 cursor-pointer px-0.5">
        {hotItem?.title.length > 15
          ? hotItem?.title.slice(0, 15) + "..."
          : hotItem?.title}
      </h1>
      <p className="text-sm text-[#d4d4d4]">
        <span>{hotItem?.type}</span> ● <span>{hotItem?.status}</span>{" "}
      </p>
    </div>
  );
}
