import React, { Suspense } from "react";
import SearchContent from "./SearchContent";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0b0d10] text-white flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-amber-500"></div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
