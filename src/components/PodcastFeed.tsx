'use client'
import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  Play,
  Pause,
  Clock,
  Calendar,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'

interface Episode {
  title: string
  description: string
  pubDate: string
  duration: string
  audioUrl: string
  category: string
  gradient: string
  applePodcastsUrl?: string
  spotifyUrl?: string
}

const ListenButton = ({
  href,
  platform,
}: {
  href?: string
  platform: 'apple' | 'spotify'
}) => {
  const bgColor = platform === 'apple' ? 'bg-black/90' : 'bg-green-600/90'
  const icon = platform === 'apple' ? '🎧' : '🎵'
  const text =
    platform === 'apple' ? 'Listen on Apple Podcasts' : 'Listen on Spotify'

  if (!href) return null

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-center gap-2 rounded-full ${bgColor} px-4 py-2 text-sm font-medium text-white transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 active:scale-95`}
    >
      <span className="sm:inline">{icon}</span>
      <span className="text-xs sm:text-sm">{text}</span>
    </a>
  )
}

const DEFAULT_GRADIENTS = [
  'from-purple-500 to-indigo-500',
  'from-pink-500 to-rose-500',
  'from-blue-500 to-cyan-500',
  'from-emerald-500 to-teal-500',
]

const PodcastFeed = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [playing, setPlaying] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const fetchRSS = async () => {
      try {
        const response = await fetch('/api/podcast-rss-feed')
        const data = await response.json()
        const episodesWithGradients = data.episodes.map(
          (episode: Episode, index: number) => ({
            ...episode,
            gradient:
              episode.gradient ||
              DEFAULT_GRADIENTS[index % DEFAULT_GRADIENTS.length],
            category: episode.category || 'Podcast',
          }),
        )
        setEpisodes(episodesWithGradients)
      } catch (error) {
        console.error('Error fetching podcast RSS:', error)
      }
    }
    fetchRSS()
  }, [])

  useEffect(() => {
    if (playing) {
      audioRef.current = new Audio(playing)
      audioRef.current.play()
      audioRef.current.addEventListener('ended', () => setPlaying(null))
    } else {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.removeEventListener('ended', () => setPlaying(null))
      }
    }
  }, [playing])

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const toggleExpand = (audioUrl: string) => {
    setExpanded(expanded === audioUrl ? null : audioUrl)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="space-y-6 px-4 sm:space-y-8 sm:px-6"
    >
      <h2 className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-xl font-bold text-transparent sm:text-2xl dark:from-purple-400 dark:to-indigo-400">
        Latest Episodes
      </h2>

      <div className="mx-auto grid gap-4 sm:gap-6">
        {episodes.map((episode, index) => (
          <motion.div
            key={episode.audioUrl}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="group relative"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-r ${episode.gradient} rounded-2xl opacity-75 blur-xl transition-all duration-300 group-hover:opacity-100 sm:rounded-3xl`}
            />
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md sm:rounded-3xl dark:bg-gray-900/50">
              <div className="flex h-full flex-col p-4 sm:p-6">
                {/* Category Tag */}
                <div className="inline-flex w-fit items-center rounded-full bg-white/10 px-2 py-1 text-xs font-medium text-gray-800 backdrop-blur-sm sm:px-3 dark:text-gray-200">
                  {episode.category}
                </div>

                {/* Title and Description */}
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <h3 className="mt-3 line-clamp-2 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-lg font-semibold text-transparent sm:mt-4 sm:text-xl dark:from-white dark:to-gray-400">
                      {episode.title}
                    </h3>
                    <p
                      className={`mt-2 text-xs text-gray-600 sm:text-sm dark:text-gray-300 ${
                        expanded === episode.audioUrl ? '' : 'line-clamp-3'
                      }`}
                    >
                      {episode.description}
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      setPlaying(
                        playing === episode.audioUrl ? null : episode.audioUrl,
                      )
                    }
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-colors hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 sm:h-12 sm:w-12"
                  >
                    {playing === episode.audioUrl ? (
                      <Pause className="h-4 w-4 text-gray-900 sm:h-5 sm:w-5 dark:text-white" />
                    ) : (
                      <Play className="h-4 w-4 text-gray-900 sm:h-5 sm:w-5 dark:text-white" />
                    )}
                  </motion.button>
                </div>

                {/* Meta Information */}
                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-gray-500 sm:gap-4 sm:text-sm dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>{episode.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>{formatDate(episode.pubDate)}</span>
                  </div>
                  <button
                    onClick={() => toggleExpand(episode.audioUrl)}
                    className="flex items-center gap-1 rounded-lg text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-white/50 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    {expanded === episode.audioUrl ? (
                      <>
                        <ChevronUp className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="text-xs sm:text-sm">Show less</span>
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="text-xs sm:text-sm">Read more</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Listen Buttons */}
                <div className="mt-4 flex flex-col gap-2 sm:mt-6 sm:flex-row sm:gap-3">
                  <ListenButton
                    href={episode.applePodcastsUrl}
                    platform="apple"
                  />
                  <ListenButton href={episode.spotifyUrl} platform="spotify" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default PodcastFeed
