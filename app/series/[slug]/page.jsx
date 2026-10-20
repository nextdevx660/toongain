import React, { Suspense } from "react";
import SeriesDetailsContent from "./SeriesDetailsContent";

async function SeriesPageContent({ params }) {
  const { slug } = await params;

  return <SeriesDetailsContent slug={slug} />;
}

export default function Page({ params }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0b0d10] text-white flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-rose-500" />
        </div>
      }
    >
      <SeriesPageContent params={params} />
    </Suspense>
  );
}
