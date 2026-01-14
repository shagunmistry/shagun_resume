import { headers } from 'next/headers'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { ToolHeader } from '@/components/ToolHeader'

export function Layout({ children }: { children: React.ReactNode }) {
  // Read headers from middleware to detect subdomain context
  const headersList = headers()
  const isToolSubdomain = headersList.get('x-tool-subdomain') === 'true'
  const toolDisplayName = headersList.get('x-tool-display-name') || 'Tool'

  return (
    <>
      <div className="fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-zinc-50 dark:bg-zinc-900" />
        </div>
      </div>
      <div className="relative flex w-full flex-col">
        {isToolSubdomain ? (
          <ToolHeader toolName={toolDisplayName} />
        ) : (
          <Header />
        )}
        <main className="flex-auto mt-20">{children}</main>
        {!isToolSubdomain && <Footer />}
      </div>
    </>
  )
}
