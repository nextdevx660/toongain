"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import NewCard from "../components/NewCard";

export default function page() {
  const [series, setSeries] = useState([]);
  const [allData, setAlldata] = useState([]);
  const [hot, setHot] = useState([]);

  const getAllData = async () => {
    let page = 50;
    let allseries = [];
    for (let index = 1; index < page; index++) {
      const resp = await axios.get(
        "https://omegaapi8746754.vercel.app/api/v1/series?page=" + index,
      );
      const data = resp.data.data;
      allseries.push(...data);
      // console.log(data)
    }
    setAlldata(allseries);
    console.log(allseries);
    filterHot(allseries);
  };
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
    setHot(result);
  };

  useEffect(() => {
    getAllData();
  }, []);
  return (
    <div className="bg-[#0b1622] pt-5 px-2 sm:px-4">
      <h1 className="font-black text-2xl text-white">COMPLETED</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
        {hot.map((hotItem, idx) => (
          <div key={idx} className="shrink-0">
            <NewCard hotItem={hotItem} idx={idx} />
          </div>
        ))}
      </div>
    </div>
  );
}
