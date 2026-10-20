"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import HotCard from "./HotCard";
import { FaFire, FaPepperHot } from "react-icons/fa";
import NewCard from "./NewCard";
import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/navigation";
import { MdIncompleteCircle } from "react-icons/md";

export default function Completed() {
  const [allData, setAlldata] = useState([]);
  const [hot, setHot] = useState([]);
  const router = useRouter();

  const filterHot = (data) => {
    let result = [];

    const findHot = (value) => {
      if (Array.isArray(value)) {
        value.forEach(findHot);
      } else if (value && typeof value === "object") {
        if (
          typeof value.badge === "string" &&
          value.badge.toLowerCase() === "completed"
        ) {
          result.push(value);
        }

        Object.values(value).forEach(findHot);
      }
    };

    findHot(data);
    setHot(result.slice(0, 12));
  };

  const getAllData = async () => {
    let page = 15;
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
    router.push("/completed");
  };

  console.log(hot);
  useEffect(() => {
    getAllData();
  }, []);
  return (
    <div className="bg-[#0b1622] px-3 mb-3 py-3">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <MdIncompleteCircle
            size={24}
            color="white"
            className="drop-shadow-md drop-shadow-white"
          />
          <h1 className="text-white text-xl sm:text-2xl pt-2 font-black">
            <span className="border-b-3 border-rose-500">COMPLETED</span>
          </h1>
        </div>
        <div className="flex items-center gap-1" onClick={() => redirect()}>
          <h1 className="font-black text-md sm:text-lg pt-2 text-[#b8b8b8]">
            View All
          </h1>
          <IoIosArrowForward size={18} color="#b8b8b8" className="mt-2" />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 mt-5">
        {hot.map((hotItem, idx) => (
          <div key={idx} className="shrink-0">
            <NewCard hotItem={hotItem} idx={idx} />
          </div>
        ))}
      </div>
    </div>
  );
}
