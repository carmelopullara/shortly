import { useMemo } from 'react'
import { useShortenedUrlContext } from '../hooks/useShortenedUrlContext'
import { UrlItem } from './UrlItem'

/**
 * UrlList component displays a list of saved shortened URLs in descending order
 * based on their creation time.
 */
export const UrlList = () => {
  const { shortenedUrls } = useShortenedUrlContext()

  // Sort the shortened URLs by their creation timestamp in descending order
  const sortedUrls = useMemo(
    () => shortenedUrls.sort((a, b) => b.timestamp - a.timestamp),
    [shortenedUrls]
  )

  return (
    <div className="flex flex-col gap-4">
      <h5 className="text-slate-500 font-semibold text-sm">Saved URLs:</h5>
      {shortenedUrls.length === 0 ? (
        <p className="text-slate-400 text-sm">
          No shortened links found. Input a URL and click the arrow to start
          creating your own.
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {sortedUrls.map((url) => (
            <UrlItem url={url} key={url.code} />
          ))}
        </div>
      )}
    </div>
  )
}
