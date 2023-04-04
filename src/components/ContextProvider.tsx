import React, { ReactNode, useCallback } from 'react'
import { ShortenedUrl, ShortenedUrlContext } from '../state/context'
import { useLocalStorage } from '../hooks/useLocalStorage'

// Define the interface for ContextProviderProps to include children prop
interface ContextProviderProps {
  children: ReactNode
}

/**
 * The ContextProvider component is responsible for providing the ShortenedUrlContext to its children.
 * It uses the useLocalStorage hook to store and manage the list of shortened URLs.
 */
export const ContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  const [shortenedUrls, setShortenedUrls] = useLocalStorage<ShortenedUrl[]>(
    'shortenedUrls',
    []
  )

  /**
   * Adds a new shortened URL to the list and updates the local storage.
   * useCallback is used to prevent unnecessary re-renders and improve performance.
   */
  const addShortenedUrl = useCallback(
    (newUrl: ShortenedUrl) => {
      setShortenedUrls((prevUrls) => [...prevUrls, newUrl])
    },
    [setShortenedUrls]
  )

  return (
    <ShortenedUrlContext.Provider value={{ shortenedUrls, addShortenedUrl }}>
      {children}
    </ShortenedUrlContext.Provider>
  )
}
