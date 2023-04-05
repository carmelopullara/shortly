import { FC } from 'react'
import { Clipboard, Link } from 'react-feather'
import { toast } from 'react-hot-toast'
import { ShortenedUrl } from '../state/context'

interface UrlItemProps {
  url: ShortenedUrl
}

/**
 * UrlItem component displays the original and shortened URLs.
 * It also allows copying the shortened URL to the clipboard.
 */
export const UrlItem: FC<UrlItemProps> = ({ url }) => {
  const { originalLink, fullShortLink, shortLink } = url

  /**
   * Copies the shortened URL to the user's clipboard and shows a toast message.
   */
  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullShortLink).then(
      () => {
        /* clipboard successfully set */
        toast('URL successfully copied to clipboard', {
          icon: '✅',
          className: 'bg-slate-800 text-slate-100 text-sm',
        })
      },
      () => {
        /* clipboard write failed */
        toast('An error occurred while copying the URL ', {
          icon: '🚫',
          className: 'bg-red-800 text-slate-100 text-sm',
        })
      }
    )
  }

  return (
    <div className="flex flex-col-reverse sm:flex-row justify-between gap-2 sm:gap-0 p-4 rounded-sm shadow-sm bg-slate-800">
      <div className="flex items-center gap-2 min-w-0">
        <Link width={16} height={16} className="text-slate-200" />
        <p className="text-sm text-slate-300 text-ellipsis overflow-hidden">
          {originalLink}
        </p>
      </div>
      <div className="flex justify-between sm:justify-normal items-center gap-4">
        <a
          href={fullShortLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:text-blue-500"
        >
          {shortLink}
        </a>
        <button
          title="Copy to clipboard"
          className="bg-slate-600 p-1 sm:p-2 rounded-sm hover:bg-blue-600 active:bg-blue-800"
          onClick={copyToClipboard}
        >
          <Clipboard className="text-slate-100" width={16} height={16} />
        </button>
      </div>
    </div>
  )
}
