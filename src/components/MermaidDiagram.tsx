'use client'

import React, { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'
import { useTheme } from 'next-themes'
import { motion } from 'motion/react'
import { Skeleton } from '@/components/Skeleton'
import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from 'react-zoom-pan-pinch'
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'

function Controls() {
  const { zoomIn, zoomOut, resetTransform } = useControls()

  return (
    <div className="absolute bottom-4 right-4 flex gap-2">
      <button
        onClick={() => zoomIn(0.2)}
        className="rounded-full bg-white/90 p-2 text-gray-700 shadow-lg transition hover:bg-white dark:bg-gray-800/90 dark:text-gray-300 dark:hover:bg-gray-800 z-20"
        aria-label="Zoom in"
      >
        <ZoomIn className="h-5 w-5" />
      </button>
      <button
        onClick={() => zoomOut(0.2)}
        className="rounded-full bg-white/90 p-2 text-gray-700 shadow-lg transition hover:bg-white dark:bg-gray-800/90 dark:text-gray-300 dark:hover:bg-gray-800 z-20"
        aria-label="Zoom out"
      >
        <ZoomOut className="h-5 w-5" />
      </button>
      <button
        onClick={() => resetTransform()}
        className="rounded-full bg-white/90 p-2 text-gray-700 shadow-lg transition hover:bg-white dark:bg-gray-800/90 dark:text-gray-300 dark:hover:bg-gray-800 z-20"
        aria-label="Reset zoom"
      >
        <RotateCcw className="h-5 w-5" />
      </button>
    </div>
  )
}

interface MermaidProps {
  diagram: string
  title?: string
  className?: string
}

// Configure mermaid
mermaid.initialize({
  startOnLoad: true,
  theme: 'default',
  securityLevel: 'loose',
  themeVariables: {
    fontFamily: 'ui-sans-serif, system-ui, -apple-system, sans-serif',
  },
})

export function MermaidDiagram({
  diagram,
  title,
  className = '',
}: MermaidProps) {
  const { resolvedTheme } = useTheme()
  const [svg, setSvg] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const uniqueId = useRef(`mermaid-${Math.random().toString(36).substr(2, 9)}`)

  useEffect(() => {
    const renderDiagram = async () => {
      try {
        setLoading(true)
        setError(null)

        // Update mermaid config based on theme
        mermaid.initialize({
          theme: resolvedTheme === 'dark' ? 'dark' : 'default',
          themeVariables: {
            primaryColor: resolvedTheme === 'dark' ? '#818cf8' : '#4f46e5',
            primaryTextColor: resolvedTheme === 'dark' ? '#e2e8f0' : '#1e293b',
            primaryBorderColor:
              resolvedTheme === 'dark' ? '#475569' : '#cbd5e1',
            lineColor: resolvedTheme === 'dark' ? '#475569' : '#cbd5e1',
            secondaryColor: resolvedTheme === 'dark' ? '#1e293b' : '#f8fafc',
            tertiaryColor: resolvedTheme === 'dark' ? '#2d3748' : '#f1f5f9',
          },
        })

        const { svg: renderedSvg } = await mermaid.render(
          uniqueId.current,
          diagram,
        )
        setSvg(renderedSvg)
        setLoading(false)
      } catch (err) {
        console.error('Mermaid rendering error:', err)
        setError('Failed to render diagram')
        setLoading(false)
      }
    }

    renderDiagram()
  }, [diagram, resolvedTheme])

  if (loading) {
    return (
      <div className={`space-y-4 rounded-xl border p-6 ${className}`}>
        {title && <Skeleton className="h-6 w-1/3" />}
        <Skeleton className="h-[400px] w-full" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/50">
        <p className="text-red-600 dark:text-red-400">{error}</p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative rounded-xl border bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 ${className}`}
    >
      {title && (
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
      )}
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={4}
        centerOnInit
        smooth
      >
        {(utils) => (
          <>
            <Controls />
            <TransformComponent
              wrapperClass="!w-full !h-full"
              contentClass="!w-full !h-full"
            >
              <div
                className="mermaid-diagram w-full"
                dangerouslySetInnerHTML={{ __html: svg }}
              />
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </motion.div>
  )
}
