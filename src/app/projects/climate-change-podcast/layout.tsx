import { Metadata } from 'next'
import { PodcastNavigation } from '@/components/climate-podcast/PodcastPageNavigation'

export const metadata: Metadata = {
  title: 'Climate Change Podcast',
  description: 'Resources and analysis for climate change podcast development',
}

export default function PodcastLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 px-4 pb-20 dark:from-gray-900 dark:to-gray-800">
      <PodcastNavigation />
      <div className="mx-auto max-w-4xl pt-8">{children}</div>
    </div>
  )
}
