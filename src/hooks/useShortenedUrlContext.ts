import { useContext } from 'react'
import { ShortenedUrlContext } from './../state/context'

export const useShortenedUrlContext = () => useContext(ShortenedUrlContext)
