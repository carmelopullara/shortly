import { useContext } from 'react'
import { ShortenedUrlContext } from '../context'
import { render, screen, act } from '@testing-library/react'

describe('ShortenedUrlContext', () => {
  it('should have the correct default values', () => {
    const TestComponent = () => {
      const context = useContext(ShortenedUrlContext)

      return (
        <>
          <ul>
            {context.shortenedUrls.map((url, index) => (
              <li key={index}>{url.shortLink}</li>
            ))}
          </ul>
          <button
            onClick={() =>
              context.addShortenedUrl({
                code: 'test',
                fullShortLink: 'https://test.com',
                shortLink: 'test.com',
                originalLink: 'example.com',
                timestamp: Date.now(),
              })
            }
          >
            Add URL
          </button>
        </>
      )
    }

    // Suppress console.warn for this test
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})

    render(<TestComponent />)

    const addButton = screen.getByText('Add URL')
    expect(screen.queryByText('test.com')).toBeNull()

    act(() => {
      addButton.click()
    })

    // Check if the warning is logged when addShortenedUrl is called without a valid UrlDataProvider
    expect(warnSpy).toHaveBeenCalled()

    // Check if the shortenedUrls list is still empty
    expect(screen.queryByText('test.com')).toBeNull()

    // Restore the console.warn function
    warnSpy.mockRestore()
  })
})
