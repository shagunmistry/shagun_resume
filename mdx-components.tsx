import type { MDXComponents } from 'mdx/types'
import Image, { type ImageProps } from 'next/image'
import { Step, Steps } from '@/components/Steps'
import { Card } from '@/components/Card'
import Callout from '@/components/Callout'

// Alert Components
interface AlertProps {
  children: React.ReactNode
  type?: 'default' | 'warning' | 'error' | 'success'
}

const Alert = ({ children, type = 'default' }: AlertProps) => {
  const styles = {
    default: 'bg-blue-50 border-blue-200',
    warning: 'bg-yellow-50 border-yellow-200',
    error: 'bg-red-50 border-red-200',
    success: 'bg-green-50 border-green-200',
  }

  return <div className={`rounded-lg p-4 ${styles[type]} my-4`}>{children}</div>
}

const AlertTitle = ({ children }: { children: React.ReactNode }) => (
  <h4 className="mb-2 font-semibold">{children}</h4>
)

const AlertDescription = ({ children }: { children: React.ReactNode }) => (
  <div className="text-sm">{children}</div>
)

// Callout Component
// const Callout = ({ children }: { children: React.ReactNode }) => (
//   <div className="my-4 border-l-4 border-blue-500 bg-gray-50 p-4">
//     {children}
//   </div>
// )

// Code Block Component
interface CodeBlockProps {
  children: string
  language?: string
}

const CodeBlock = ({ children, language }: CodeBlockProps) => (
  <pre
    className={`language-${language} overflow-x-auto rounded-lg bg-gray-800 p-4 text-white`}
  >
    <code>{children}</code>
  </pre>
)

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Image: (props: ImageProps) => <Image {...props} />,
    Alert,
    AlertTitle,
    AlertDescription,
    Card,
    Callout,
    CodeBlock,
    Steps,
    Step,
  }
}
