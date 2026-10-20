import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import axios from "axios";

export async function GET() {
  const url = "https://hentaidb.xyz/comics";

  const siteHTML = await axios.get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (X11; Linux aarch64) AppleWebKit/537.36 (KHTML, like Gecko) Edg/155.0.0.0 Safari/537.36 CrKey/1.54.250320",
    },
  });
  const $ = cheerio.load(siteHTML.data);
  const comic = [];
  $("li.card.cx").each((idx, element) => {
    const poster = $(element).find("span.cv img").attr("srcset").replaceAll('2x', '');
    const title = $(element).find("span.ct").text().trim();
    const details = $(element).find("span.cm").text().trim();
    const pages = $(element).find("span.fig").text().trim();

    comic.push({
      poster: 'https://hentaidb.xyz'+ poster.replaceAll(' ', ''),
      title,
      details,
      pages,
    });
  });

  return NextResponse.json({
    success: true,
    comic: comic,
  });
}
