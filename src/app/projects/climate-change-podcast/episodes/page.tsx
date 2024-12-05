'use client'
import { motion } from 'framer-motion'
import { Clock, Calendar, ArrowUpRight } from 'lucide-react'

const episodes = [
  {
    id: 1,
    title: 'How Starbucks can make you rich',
    description:
      'Starbucks serves about 5 MILLION drinks daily in the US alone, and the company is on a mission to make a positive impact on the environment. Learn how you can leverage this growth to build wealth.',
    duration: '12:00',
    date: 'Dec 5, 2024',
    image:
      'https://firebasestorage.googleapis.com/v0/b/coauthor-5a141.appspot.com/o/The%20Money%20Planet%20Logo.jpg?alt=media&token=35649656-7bde-403a-8d83-0a1be5eeaa89',
    category: 'Entrepreneurship',
    gradient: 'from-emerald-400 via-teal-500 to-cyan-600',
    applePodcastsUrl: 'https://podcasts.apple.com/us/podcast/the-money-plant/id1782918762?i=1000679095999',
    spotifyUrl: 'https://open.spotify.com/episode/24PPPl5QEqpz33wHNUNWoO?si=HWcfQPXjSw6t0TiO--wq_A',
  },
]

function ListenButton({
  href,
  platform,
}: {
  href: string
  platform: 'apple' | 'spotify'
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm transition-all duration-200 hover:bg-white/20 dark:bg-gray-800/50 dark:hover:bg-gray-800/70"
    >
      {platform === 'apple' ? (
        <>
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
          </svg>
          <span>Apple Podcasts</span>
        </>
      ) : (
        <>
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
          <span>Spotify</span>
        </>
      )}
      <ArrowUpRight className="h-4 w-4" />
    </motion.a>
  )
}

function EpisodeCard({ episode }: { episode: any }) {
  return (
    <motion.div whileHover={{ y: -5 }} className="group relative">
      <div
        className={`absolute inset-0 bg-gradient-to-r ${episode.gradient} rounded-3xl opacity-75 blur-xl transition-all duration-300 group-hover:opacity-100`}
      />
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 backdrop-blur-md dark:bg-gray-900/50">
        <div className="flex h-full flex-col p-6">
          {/* Category Tag */}
          <div className="inline-flex w-fit items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-gray-800 backdrop-blur-sm dark:text-gray-200">
            {episode.category}
          </div>

          {/* Title and Description */}
          <h3 className="mt-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-xl font-semibold text-transparent dark:from-white dark:to-gray-400">
            {episode.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
            {episode.description}
          </p>

          {/* Meta Information */}
          <div className="mt-4 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{episode.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{episode.date}</span>
            </div>
          </div>

          {/* Listen Buttons */}
          <div className="mt-6 flex flex-col gap-3">
            <ListenButton href={episode.applePodcastsUrl} platform="apple" />
            <ListenButton href={episode.spotifyUrl} platform="spotify" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function FeaturedEpisode({ episode }: { episode: any }) {
  return (
    <motion.div whileHover={{ y: -5 }} className="group relative col-span-2">
      <div
        className={`absolute inset-0 bg-gradient-to-r ${episode.gradient} rounded-3xl opacity-75 blur-xl transition-all duration-300 group-hover:opacity-100`}
      />
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 backdrop-blur-md dark:bg-gray-900/50">
        <div className="flex flex-col gap-8 p-8 md:flex-row">
          {/* Image */}
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl md:w-2/5">
            <img
              src={episode.image}
              alt={episode.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-gray-800 backdrop-blur-sm dark:text-gray-200">
              {episode.category}
            </div>

            <h2 className="mt-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-2xl font-bold text-transparent dark:from-white dark:to-gray-400">
              {episode.title}
            </h2>

            <p className="mt-4 text-gray-600 dark:text-gray-300">
              {episode.description}
            </p>

            <div className="mt-6 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{episode.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{episode.date}</span>
              </div>
            </div>

            {/* Listen Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ListenButton href={episode.applePodcastsUrl} platform="apple" />
              <ListenButton href={episode.spotifyUrl} platform="spotify" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Page() {
  const featuredEpisode = episodes[0]
  const regularEpisodes = episodes.slice(1)

  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-4xl font-bold text-transparent dark:from-white dark:to-gray-400">
            Latest Episodes
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Exploring the intersection of climate change, finance, and
            entrepreneurship
          </p>
        </div>

        {/* Episodes Grid */}
        <div className="space-y-12">
          {/* Featured Episode */}
          <FeaturedEpisode episode={featuredEpisode} />

          {/* Regular Episodes */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {regularEpisodes.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
