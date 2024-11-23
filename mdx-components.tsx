import { type MDXComponents } from 'mdx/types'
import Image, { type ImageProps } from 'next/image'
import React from 'react'

// Layout Component
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <main className="prose prose-blue">{children}</main>
    </div>
  )
}

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
    success: 'bg-green-50 border-green-200'
  }

  return (
    <div className={`p-4 rounded-lg ${styles[type]} my-4`}>
      {children}
    </div>
  )
}

const AlertTitle = ({ children }: { children: React.ReactNode }) => (
  <h4 className="font-semibold mb-2">{children}</h4>
)

const AlertDescription = ({ children }: { children: React.ReactNode }) => (
  <div className="text-sm">{children}</div>
)

// Card Components
interface CardProps {
  children: React.ReactNode
  className?: string
}

const Card = ({ children, className = '' }: CardProps) => (
  <div className={`rounded-lg ${className}`}>
    {children}
  </div>
)

const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-lg font-semibold p-4 border-b border-gray-200">{children}</h3>
)

const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div className="p-4">{children}</div>
)

// Callout Component
const Callout = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-gray-50 border-l-4 border-blue-500 p-4 my-4">
    {children}
  </div>
)

// Code Block Component
interface CodeBlockProps {
  children: string
  language?: string
}

const CodeBlock = ({ children, language }: CodeBlockProps) => (
  <pre className={`language-${language} rounded-lg p-4 bg-gray-800 text-white overflow-x-auto`}>
    <code>{children}</code>
  </pre>
)

// Export the useMDXComponents function
export function useMDXComponents(components: MDXComponents) {
  return {
    ...components,
    Image: (props: ImageProps) => <Image {...props} />,
    Alert,
    AlertTitle,
    AlertDescription,
    Card,
    CardTitle,
    CardContent,
    Callout,
    pre: CodeBlock,
    Layout
  }
}

// Export individual components for direct usage
export {
  Layout,
  Alert,
  AlertTitle,
  AlertDescription,
  Card,
  CardTitle,
  CardContent,
  Callout,
  CodeBlock
}