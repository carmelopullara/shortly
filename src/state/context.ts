import { createContext } from 'react'

// ShortenedUrl interface represents the structure of a single shortened URL object.
export interface ShortenedUrl {
  code: string
  shortLink: string
  originalLink: string
  timestamp: number
}

/**
 * ShortenedUrlContextType interface represents the structure of the context value,
 * containing the list of shortened URLs and the function to add a new shortened URL.
 */
interface ShortenedUrlContextType {
  shortenedUrls: ShortenedUrl[]
  addShortenedUrl: (url: ShortenedUrl) => void
}

/**
 * ShortenedUrlContext is a React context for managing shortened URLs.
 * It has a value of type ShortenedUrlContextType or null.
 */
export const ShortenedUrlContext =
  createContext<ShortenedUrlContextType | null>(null)
