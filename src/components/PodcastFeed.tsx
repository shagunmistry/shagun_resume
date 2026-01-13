'use client'
import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'motion/react'
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
  const borderColor =
    platform === 'apple'
      ? 'border-zinc-900 dark:border-zinc-100'
      : 'border-zinc-500 dark:border-zinc-400'
  const text = platform === 'apple' ? 'Apple Podcasts' : 'Spotify'

  if (!href) return null

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-center gap-2 rounded-none border ${borderColor} px-4 py-2 text-xs font-light uppercase tracking-wider text-zinc-900 transition-all hover:bg-zinc-900 hover:text-white dark:text-zinc-100 dark:hover:bg-zinc-100 dark:hover:text-zinc-900`}
    >
      <span>{text}</span>
    </a>
  )
}

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
        const episodesWithCategories = data.episodes.map(
          (episode: Episode) => ({
            ...episode,
            category: episode.category || 'Podcast',
          }),
        )
        setEpisodes(episodesWithCategories)
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
    <div className="space-y-12">
      {episodes.map((episode, index) => (
        <motion.div
          key={episode.audioUrl}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group"
        >
          <div className="space-y-4">
            {/* Category */}
            <div className="text-xs font-light uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              {episode.category}
            </div>

            {/* Title and Play Button */}
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg font-light text-zinc-900 dark:text-zinc-100">
                {episode.title}
              </h3>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  setPlaying(
                    playing === episode.audioUrl ? null : episode.audioUrl,
                  )
                }
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-700"
              >
                {playing === episode.audioUrl ? (
                  <Pause className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                ) : (
                  <Play className="h-4 w-4 text-zinc-600 dark:text-zinc-400" />
                )}
              </motion.button>
            </div>

            {/* Description */}
            <p
              className={`text-sm font-light text-zinc-500 dark:text-zinc-400 ${
                expanded === episode.audioUrl ? '' : 'line-clamp-3'
              }`}
            >
              {episode.description}
            </p>

            {/* Meta Information and Expand Button */}
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex items-center gap-6 text-xs text-zinc-400 dark:text-zinc-500">
                <div className="flex items-center gap-2">
                  <Clock className="h-3 w-3" />
                  <span>{episode.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(episode.pubDate)}</span>
                </div>
              </div>

              <button
                onClick={() => toggleExpand(episode.audioUrl)}
                className="text-xs font-light uppercase tracking-wider text-zinc-500 hover:text-zinc-900 focus:outline-none dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                {expanded === episode.audioUrl ? 'Show less' : 'Read more'}
              </button>
            </div>

            {/* Listen Buttons */}
            <div className="mt-6 flex gap-4">
              <ListenButton href={episode.applePodcastsUrl} platform="apple" />
              <ListenButton href={episode.spotifyUrl} platform="spotify" />
            </div>
          </div>

          {/* Subtle divider */}
          {index < episodes.length - 1 && (
            <div className="mt-12 h-px w-full bg-zinc-100 dark:bg-zinc-800"></div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

export default PodcastFeed
