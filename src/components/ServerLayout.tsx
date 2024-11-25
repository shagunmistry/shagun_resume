// components/ServerLayout.tsx
import { SimpleLayout } from '@/components/SimpleLayout'

export function ServerLayout({
  children,
  title,
  intro,
}: {
  children: React.ReactNode
  title: string
  intro: string
}) {
  return (
    <SimpleLayout title={title} intro={intro}>
      {children}
    </SimpleLayout>
  )
}