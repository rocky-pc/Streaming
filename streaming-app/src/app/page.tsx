'use client'

import { useState, useEffect, useCallback } from 'react'
import { SearchBar } from '@/components/video/SearchBar'
import { VideoGrid } from '@/components/video/VideoGrid'
import { getVideos } from '@/lib/api'
import type { Video, PaginatedResponse } from '@/types'

export default function HomePage() {
  const [videos, setVideos] = useState<Video[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [total, setTotal] = useState(0)

  const fetchVideos = useCallback(async (query: string, pageNum: number = 1) => {
    setIsLoading(true)
    try {
      const result: PaginatedResponse<Video> = await getVideos({ query, page: pageNum, limit: 20 })
      if (pageNum === 1) {
        setVideos(result.data)
      } else {
        setVideos(prev => [...prev, ...result.data])
      }
      setHasMore(result.hasMore)
      setTotal(result.total)
      setPage(result.page)
    } catch (error) {
      console.error('Failed to fetch videos:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchVideos(searchQuery, 1)
  }, [searchQuery, fetchVideos])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setPage(1)
  }

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      fetchVideos(searchQuery, page + 1)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Videos</h1>
          <p className="text-gray-400">Discover and watch amazing content</p>
        </div>

        <div className="mb-8">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSearch={handleSearch}
            placeholder="Search videos by title..."
          />
        </div>

        <VideoGrid
          videos={videos}
          isLoading={isLoading}
          emptyMessage={searchQuery ? `No videos found for "${searchQuery}"` : 'No videos uploaded yet. Be the first to upload!'}
        />

        {hasMore && (
          <div className="mt-8 text-center">
            <button
              onClick={handleLoadMore}
              disabled={isLoading}
              className="px-6 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth="4" />
                    <path className="opacity-75" d="M12 2a10 10 0 0 1 10 10" />
                  </svg>
                  Loading...
                </>
              ) : (
                'Load More'
              )}
            </button>
            {total > 0 && <p className="mt-2 text-sm text-gray-500">Showing {videos.length} of {total} videos</p>}
          </div>
        )}
      </div>
    </div>
  )
}