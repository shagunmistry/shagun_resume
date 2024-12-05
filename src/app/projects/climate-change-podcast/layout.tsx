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
    <div className="min-h-screen">
      <PodcastNavigation />
      <div className="ml-72 min-h-screen px-8 pb-20 pt-24">
        <div className="mx-auto max-w-4xl">{children}</div>
      </div>
    </div>
  )
}
