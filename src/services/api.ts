import { parseErrorMessage } from '../utils/errorUtils'
import { ShortenedUrl } from './../state/context'

// ApiResponse interface represents the response coming from the shrtco.de API
interface ApiResponse {
  ok: boolean
  error_code?: number
  error?: string
  result?: {
    code: string
    short_link: string
    full_short_link: string
    short_link2: string
    full_short_link2: string
    short_link3: string
    full_short_link3: string
    share_link: string
    full_share_link: string
    original_link: string
  }
}

/**
 * Shortens the given URL using the shrtco.de API.
 *
 * @param url - The URL to be shortened.
 * @returns A Promise that resolves to a ShortenedUrl object.
 * @throws An Error if there's a network issue, API error, or missing result data.
 */

export async function shortenUrl(url: string): Promise<ShortenedUrl> {
  try {
    const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`)
    const data: ApiResponse = await response.json()

    if (!data.ok) {
      throw new Error(`Error code: ${data.error_code}`)
    }

    if (data.result) {
      const { result } = data
      return {
        code: result.code,
        fullShortLink: result.full_short_link,
        shortLink: result.short_link,
        originalLink: result.original_link,
        timestamp: Date.now(),
      }
    } else {
      throw new Error('API response missing result data')
    }
  } catch (error) {
    // Ensure the error message is a string, falling back to a generic message
    const errorMessage = parseErrorMessage(error)
    throw new Error(`Error while shortening URL. ${errorMessage}`)
  }
}
