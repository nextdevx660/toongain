import React, { Suspense } from 'react'
import ChapterReaderContent from './ChapterReaderContent'

export default async function ChapterPage({ params }) {
  const { slug, chapterSlug } = await params

  return (
    <Suspense 
      fallback={
        <div className="min-h-screen bg-[#0b0d10] text-white flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-rose-500"></div>
        </div>
      }
    >
      <ChapterReaderContent seriesSlug={slug} chapterSlug={chapterSlug} />
    </Suspense>
  )
}