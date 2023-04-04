import { createContext } from 'react'

// ShortenedUrl interface represents the structure of a single shortened URL object.
export interface ShortenedUrl {
  code: string
  fullShortLink: string
  shortLink: string
  originalLink: string
  timestamp: number
}

/**
 * ShortenedUrlContextType interface represents the structure of the context value,
 * containing the list of shortened URLs and the function to add a new shortened URL.
 */
export interface ShortenedUrlContextType {
  shortenedUrls: ShortenedUrl[]
  addShortenedUrl: (url: ShortenedUrl) => void
}

// A default no-op function for addShortenedUrl that logs a warning
// when it's called without a valid UrlDataProvider in the component tree.
const defaultAddShortenedUrl = (newUrl: ShortenedUrl) => {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(
      'Warning: addShortenedUrl() was called without a valid UrlDataProvider in the component tree.',
      'Please ensure that your component is wrapped by a UrlDataProvider.'
    )
  }
}

// Define the default value for UrlDataContext based on UrlDataContextValue
const defaultState: ShortenedUrlContextType = {
  shortenedUrls: [],
  addShortenedUrl: defaultAddShortenedUrl,
}

/**
 * ShortenedUrlContext is a React context for managing shortened URLs.
 * It has a value of type ShortenedUrlContextType or null.
 */
export const ShortenedUrlContext =
  createContext<ShortenedUrlContextType>(defaultState)
