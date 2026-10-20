"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Trending from "./components/Trending";
import ComicSection from "./components/ComicSection";
import Hot from "./components/Hot";
import New from "./components/New";
import Footer from "./components/Footer";
import Pornhwa from "./components/Pornhwa";
import Completed from "./components/Completed";

export default function Home() {
  const [trending, setTrending] = useState([]);
  const [comicData, setComicData] = useState([]);
  const [series, setSeries] = useState([]);
  const [page, setPage] = useState(1);

  const getAllSeries = async () => {
    const resp = await axios.get(
      "https://omegaapi8746754.vercel.app/api/v1/series?page=" + { page },
    );
    const series = resp?.data?.data;
    // console.log(series);
    setSeries(series);
  };

  useEffect(() => {
    getAllSeries();
  }, []);
  return (
    <div className="bg-[#0b1622]">
      <Trending series={series} />
      <Hot />
      <New />
      <Pornhwa />
      <Completed />
    </div>
  );
}
