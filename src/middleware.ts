import { NextRequest, NextResponse } from 'next/server'
import {
  extractSubdomain,
  getRootDomain,
  isValidToolSubdomain,
  getToolNameFromSubdomain,
  formatToolName,
} from './lib/subdomain'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const url = request.nextUrl

  // Get root domain from environment variable
  const rootDomain = getRootDomain()

  // Extract subdomain from hostname
  const subdomain = extractSubdomain(hostname, rootDomain)

  // If no subdomain, continue normally (main site)
  if (!subdomain) {
    return NextResponse.next()
  }

  // Check if subdomain is a valid tool
  if (!isValidToolSubdomain(subdomain)) {
    // Invalid subdomain - redirect to tools page with error parameter
    url.pathname = '/tools'
    url.searchParams.set('invalid', subdomain)
    return NextResponse.redirect(url)
  }

  // Get the tool name for routing
  const toolName = getToolNameFromSubdomain(subdomain)

  // Rewrite the request to the tool page
  // Example: log-viewer.shagunmistry.com → /tools/log-viewer (internal)
  const toolPath = `/tools/${toolName}`

  // Clone the URL and update the pathname
  url.pathname = toolPath

  // Create response with rewrite
  const response = NextResponse.rewrite(url)

  // Add custom headers to indicate this is a subdomain request
  // This allows components to conditionally render based on context
  response.headers.set('x-tool-subdomain', 'true')
  response.headers.set('x-tool-name', toolName)
  response.headers.set('x-tool-display-name', formatToolName(toolName))

  return response
}

/**
 * Matcher configuration
 * Exclude:
 * - /api routes
 * - /_next (Next.js internal files)
 * - /favicon.ico and other static files
 * - Image files (.svg, .png, .jpg, etc.)
 */
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)',
  ],
}
