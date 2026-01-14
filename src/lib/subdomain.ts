/**
 * Valid tool slugs that can be accessed via subdomains
 */
export const VALID_TOOLS = [
  'log-viewer',
  'fixed-length-file-parser',
  'on-call-scheduler',
  'vegan-macro-calculator',
] as const

export type ToolSlug = (typeof VALID_TOOLS)[number]

/**
 * Extract subdomain from hostname for different environments
 *
 * @param hostname - The hostname from the request (e.g., "log-viewer.localhost", "log-viewer.shagunmistry.com")
 * @param rootDomain - The root domain (e.g., "localhost", "shagunmistry.com")
 * @returns The subdomain or null if no valid subdomain found
 *
 * @example
 * extractSubdomain("log-viewer.localhost", "localhost") // "log-viewer"
 * extractSubdomain("log-viewer.shagunmistry.com", "shagunmistry.com") // "log-viewer"
 * extractSubdomain("shagunmistry.com", "shagunmistry.com") // null
 * extractSubdomain("www.shagunmistry.com", "shagunmistry.com") // null (www is treated as main site)
 */
export function extractSubdomain(
  hostname: string,
  rootDomain: string
): string | null {
  // Remove port if present (e.g., "localhost:3000" -> "localhost")
  const cleanHostname = hostname.split(':')[0]
  const cleanRootDomain = rootDomain.split(':')[0]

  // Handle localhost pattern: {subdomain}.localhost
  if (cleanRootDomain === 'localhost') {
    if (cleanHostname === 'localhost') {
      return null // No subdomain
    }
    const parts = cleanHostname.split('.')
    if (parts.length === 2 && parts[1] === 'localhost') {
      return parts[0]
    }
    return null
  }

  // Handle Vercel preview deployments: {subdomain}-{hash}.vercel.app
  if (cleanHostname.includes('.vercel.app')) {
    // Extract subdomain from preview URLs like "log-viewer-abc123.vercel.app"
    const match = cleanHostname.match(/^([^-]+)-.+\.vercel\.app$/)
    if (match) {
      return match[1]
    }
    return null
  }

  // Handle production: {subdomain}.shagunmistry.com
  if (cleanHostname === cleanRootDomain) {
    return null // No subdomain (e.g., "shagunmistry.com")
  }

  if (cleanHostname === `www.${cleanRootDomain}`) {
    return null // www is treated as main site
  }

  // Extract subdomain
  const subdomain = cleanHostname.replace(`.${cleanRootDomain}`, '')

  // Ensure it's a valid subdomain (no dots remaining)
  if (subdomain.includes('.')) {
    return null
  }

  return subdomain
}

/**
 * Check if a subdomain corresponds to a valid tool
 *
 * @param subdomain - The subdomain to validate
 * @returns True if the subdomain is a valid tool slug
 *
 * @example
 * isValidToolSubdomain("log-viewer") // true
 * isValidToolSubdomain("invalid-tool") // false
 */
export function isValidToolSubdomain(subdomain: string): boolean {
  return VALID_TOOLS.includes(subdomain as ToolSlug)
}

/**
 * Get the tool name from a subdomain
 * Same as the subdomain for now, but exists for potential future mapping
 *
 * @param subdomain - The subdomain slug
 * @returns The tool slug for routing
 *
 * @example
 * getToolNameFromSubdomain("log-viewer") // "log-viewer"
 */
export function getToolNameFromSubdomain(subdomain: string): string {
  return subdomain
}

/**
 * Format a tool slug into a human-readable name
 *
 * @param slug - The tool slug (e.g., "log-viewer")
 * @returns Formatted tool name (e.g., "Log Viewer")
 *
 * @example
 * formatToolName("log-viewer") // "Log Viewer"
 * formatToolName("fixed-length-file-parser") // "Fixed-Length File Parser"
 */
export function formatToolName(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Get the main site URL from environment variables
 *
 * @returns The main site URL (e.g., "https://shagunmistry.com")
 */
export function getMainSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://shagunmistry.com'
}

/**
 * Get the root domain from environment variables
 *
 * @returns The root domain (e.g., "shagunmistry.com")
 */
export function getRootDomain(): string {
  return process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'shagunmistry.com'
}
