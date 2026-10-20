"use client";

import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import HotCard from "./HotCard";
import { FaFire, FaPepperHot } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/navigation";

export default function Hot() {
  const [allData, setAlldata] = useState([]);
  const [hot, setHot] = useState([]);
  const router = useRouter()

  const filterHot = (data) => {
    let result = [];

    const findHot = (value) => {
      if (Array.isArray(value)) {
        value.forEach(findHot);
      } else if (value && typeof value === "object") {
        if (
          typeof value.badge === "string" &&
          value.badge.toLowerCase() === "hot"
        ) {
          result.push(value);
        }

        Object.values(value).forEach(findHot);
      }
    };

    findHot(data);
    setHot(result.slice(0, 10));
  };

  const getAllData = async () => {
    let page = 20;
    let allseries = [];
    for (let index = 2; index < page; index++) {
      const resp = await axios.get(
        "https://omegaapi8746754.vercel.app/api/v1/series?page=" + index,
      );
      const data = resp.data.data;
      allseries.push(...data);
    }
    setAlldata(allseries);
    // console.log(allseries);
    filterHot(allseries);
  };

const redirect = () => {
  router.push('/trending')
}

  console.log(hot);
  useEffect(() => {
    getAllData();
  }, []);
  return (
    <div className="bg-[#0b1622] px-2 mb-3">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <FaFire
            size={24}
            color="orange"
            className="drop-shadow-[0_0_10px_rgba(255,215,0,0.9)]"
          />
          <h1 className="text-white text-xl sm:text-2xl pt-2 font-black">
            <span className="border-b-3 border-rose-500">HOT</span> NOW
          </h1>
        </div>
        <div className="flex items-center gap-1" onClick={() => redirect()}>
          <h1 className="font-black text-md sm:text-lg pt-2 text-[#b8b8b8]">
            View All
          </h1>
          <IoIosArrowForward size={18} color="#b8b8b8" className="mt-2" />
        </div>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto flex-nowrap hide-scrollbar">
        {hot.map((hotItem, idx) => (
          <div key={idx} className="shrink-0">
            <HotCard hotItem={hotItem} idx={idx} />
          </div>
        ))}
      </div>
    </div>
  );
}
