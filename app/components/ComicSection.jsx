import Image from "next/image";
import React from "react";

export default function ComicSection({ comicData }) {
  return (
    <div className="grid items center grid-cols-5 gap-2 px-10 bg-[#0b1622] py-5">
      {comicData.map((item, idx) => (
        <div key={idx}>
          <Image
            src={item?.poster}
            alt={item?.title}
            width={500}
            height={500}
            className="aspect-[2/3] rounded-xl"
          />
        </div>
      ))}
    </div>
  );
}
