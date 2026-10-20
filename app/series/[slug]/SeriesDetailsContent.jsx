'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { 
  Star, 
  BookOpen, 
  Eye, 
  Bookmark, 
  ChevronDown, 
  ChevronUp, 
  Play, 
  Heart, 
  MoreHorizontal, 
  ArrowLeft,
  Calendar,
  Layers
} from 'lucide-react'

export default function SeriesDetailsContent({ slug }) {
  const [series, setSeries] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showFullSynopsis, setShowFullSynopsis] = useState(false)

  useEffect(() => {
    const getDetails = async () => {
      try {
        setLoading(true)
        const resp = await axios.get(`https://omegaapi8746754.vercel.app/api/v1/series/${slug}?include=chapters`)
        const data = resp.data.data
        setSeries(data)
        // console.log(data);
        
      } catch (err) {
        console.error('Error fetching series details:', err)
        setError('Series details load nahi ho payi.')
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      getDetails()
    }
  }, [slug])

  const formatNumber = (num) => {
    if (!num) return '0'
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b1622] text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-rose-500"></div>
      </div>
    )
  }

  if (error || !series) {
    return (
      <div className="min-h-screen bg-[#0b1622] text-white flex flex-col items-center justify-center p-4">
        <p className="text-red-400 mb-4">{error || 'Series nahi mili.'}</p>
        <button 
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white"
        >
          <ArrowLeft size={16} /> Go Back
        </button>
      </div>
    )
  }

  const posterImage = series.thumbnail || series.cover || 'https://via.placeholder.com/300x450'
  const firstChapter = series.chapters && series.chapters.length > 0 ? series.chapters[series.chapters.length - 1] : null

  return (
    <div className="min-h-screen bg-[#0b1622] text-[#e0e2e6] relative overflow-hidden font-sans">
      
      {/* 1. BLURRED BACKGROUND HERO CONTAINER */}
      <div className="absolute top-0 left-0 right-0 h-[520px] overflow-hidden pointer-events-none z-0">
        <img 
          src={posterImage} 
          alt="Backdrop Blur" 
          className="w-full h-full object-cover scale-125 blur-[1px] opacity-25 filter brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1622]/40 via-[#0b1622]/80 to-[#0b1622]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1622] via-transparent to-[#0b1622]" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-12">
        
        {/* Back Button */}
        <button 
          onClick={() => window.history.back()} 
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Cover Image */}
          <div className="md:col-span-4 lg:col-span-3 flex justify-center md:justify-start">
            <div className="relative w-[230px] h-[340px] md:w-full md:h-[400px] rounded-xl overflow-hidden shadow-2xl border border-gray-800/80 group">
              <img 
                src={posterImage} 
                alt={series.title} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Right Column: Series Info */}
          <div className="md:col-span-8 lg:col-span-9 space-y-5">
            
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider">
              {series.type && (
                <span className="bg-[#181c24] text-gray-300 px-3 py-1 rounded-md border border-gray-700/60 shadow-sm">
                  {series.type}
                </span>
              )}
              {series.status && (
                <span className="bg-[#0f2e24] text-[#00e6a8] px-3 py-1 rounded-md border border-[#00523f] shadow-sm">
                  {series.status}
                </span>
              )}
              {series.studio && (
                <span className="bg-[#1c1824] text-purple-400 px-3 py-1 rounded-md border border-purple-900/50">
                  {series.studio}
                </span>
              )}
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                {series.title}
              </h1>
              {series.alternativeNames && (
                <p className="text-xs text-gray-400 mt-1 font-medium">
                  {series.alternativeNames}
                </p>
              )}
            </div>

            <div className="flex items-center gap-4 text-xs text-gray-400">
              {series.author && (
                <p>by <span className="text-gray-200 font-semibold">{series.author}</span></p>
              )}
              {series.releaseYear && (
                <span className="flex items-center gap-1 text-gray-400">
                  <Calendar size={13} />
                  {series.releaseYear}
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-xs font-semibold text-gray-300 bg-[#12151b]/60 backdrop-blur-md p-3.5 rounded-xl border border-gray-800/60 w-fit">
              <div className="flex items-center gap-1.5 text-rose-400">
                <Star size={15} fill="currentColor" />
                <span className="text-white font-bold">{series.rating || '0.0'}</span>
              </div>
              <span className="text-gray-700">|</span>
              <div className="flex items-center gap-1.5">
                <BookOpen size={15} className="text-gray-400" />
                <span>{series.chaptersCount || series.chapters?.length || 0} chapters</span>
              </div>
              <span className="text-gray-700">|</span>
              <div className="flex items-center gap-1.5">
                <Eye size={15} className="text-gray-400" />
                <span>{formatNumber(series.totalViews)} reads</span>
              </div>
              <span className="text-gray-700">|</span>
              <div className="flex items-center gap-1.5 text-pink-400">
                <Bookmark size={15} className="text-pink-400" />
                <span>{formatNumber(series.bookmarksCount)} saved</span>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">THE STORY</h3>
              <p className={`text-sm text-gray-300 leading-relaxed font-normal ${!showFullSynopsis ? 'line-clamp-3' : ''}`}>
                {series.description || 'No description provided.'}
              </p>
              <button 
                onClick={() => setShowFullSynopsis(!showFullSynopsis)}
                className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-rose-500 hover:text-rose-400 transition-colors pt-0.5"
              >
                {showFullSynopsis ? (
                  <>HIDE SYNOPSIS <ChevronUp size={14} /></>
                ) : (
                  <>READ SYNOPSIS <ChevronDown size={14} /></>
                )}
              </button>
            </div>

            <div className="flex items-center gap-3 pt-3">
              <Link 
                href={firstChapter ? `/series/${slug}/chapter/${firstChapter.slug}` : '#'}
                className="flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-400 text-white font-extrabold px-6 py-3 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-rose-500/10 transition-all active:scale-95"
              >
                <Play size={16} fill="white" />
                Start Reading
              </Link>
            </div>

          </div>
        </div>

        {/* Chapters Section */}
        {series.chapters && series.chapters.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-800/80">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Layers size={20} className="text-rose-500" />
                <h2 className="text-xl font-bold text-white">Chapters ({series.chapters.length})</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {series.chapters.map((ch) => (
                <Link 
                  key={ch.id} 
                  href={`/series/${slug}/chapter/${ch.slug}`}
                  className="flex items-center justify-between p-3.5 bg-black/0 hover:bg-[#1c222e] border border-gray-800/70 rounded-xl transition-all group shadow-sm hover:border-rose-500/40"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {ch.thumbnail && (
                      <img 
                        src={ch.thumbnail} 
                        alt={ch.name} 
                        className="w-10 h-10 object-cover rounded-md flex-shrink-0 border border-gray-800"
                      />
                    )}
                    <span className="text-sm font-semibold text-gray-200 group-hover:text-rose-400 truncate">
                      {ch.name || ch.title}
                    </span>
                  </div>
                  {ch.createdAt && (
                    <span className="text-[11px] font-medium text-gray-500 ml-2 whitespace-nowrap">
                      {formatDate(ch.createdAt)}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}