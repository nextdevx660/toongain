import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  const base = "https://toonverse.net";

  try {
    const html = (await axios.get(base)).data;

    const mainPath = "/assets/index-BlkljYhj.js";
    const mainJS = (await axios.get(base + mainPath)).data;

    // Main bundle se relevant JavaScript chunks find karo
    const paths = [
      ...new Set(
        [
          ...html.matchAll(/(?:src|href)="([^"]+\.js)"/g),
          ...mainJS.matchAll(/["'`]((?:\/)?assets\/[^"'` ]+\.js)["'`]/g),
        ].map((m) => m[1].startsWith("/") ? m[1] : `/${m[1]}`)
      ),
    ];

    const relevant = paths.filter((path) =>
      /home|series|trending|recommendation|top|feed|reading|browse/i.test(path)
    );

    const files = await Promise.all(
      relevant.slice(0, 20).map(async (path) => {
        try {
          const js = (await axios.get(base + path, {
            timeout: 15000,
          })).data;

          const terms = [
            "/api/",
            "supabase",
            "top-ten",
            "recommendationFeed",
            "useSeries",
            "fetch(",
            "trending",
            "rating",
          ];

          const matches = {};

          for (const term of terms) {
            const index = js.toLowerCase().indexOf(term.toLowerCase());

            if (index !== -1) {
              matches[term] = js.slice(
                Math.max(0, index - 150),
                Math.min(js.length, index + 350)
              );
            }
          }

          return {
            file: path,
            length: js.length,
            matches,
          };
        } catch {
          return { file: path, error: "Could not download chunk" };
        }
      })
    );

    return NextResponse.json({
      chunksFound: paths.length,
      chunksChecked: files.length,
      files,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}