import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects',
  description: "Things I've made trying to put my dent in the universe.",
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
