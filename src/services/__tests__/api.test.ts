// Import the necessary modules and components
import fetchMock from 'jest-fetch-mock'
import { ShortenedUrl } from '../../state/context'
import { shortenUrl } from '../api'

// Enable fetch mocking for this test suite
fetchMock.enableMocks()

// Test suite for the shortenUrl function
describe('shortenUrl', () => {
  // Reset fetch mocks before each test case
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  // Test case: should shorten a given URL and return a ShortenedUrl object
  it('should shorten a given URL and return a ShortenedUrl object', async () => {
    // Mock a successful API response
    fetchMock.mockResponseOnce(
      JSON.stringify({
        ok: true,
        result: {
          code: 'test_code',
          short_link: 'https://shrtco.de/test',
          original_link: 'https://example.com',
          full_short_link: 'https://shrtco.de/test',
        },
      })
    )

    // Define the input URL and the expected result object
    const testUrl = 'https://example.com'
    const expectedResult: ShortenedUrl = {
      code: 'test_code',
      fullShortLink: 'https://shrtco.de/test',
      shortLink: 'https://shrtco.de/test',
      originalLink: 'https://example.com',
      timestamp: expect.any(Number),
    }

    // Call the shortenUrl function and check if the result matches the expected result
    const result = await shortenUrl(testUrl)
    expect(result).toEqual(expectedResult)
  })

  // Test case: should throw an error when the network response is not ok
  it('should throw an error when the network response is not ok', async () => {
    // Mock a failed network response with a 400 status and an error message
    fetchMock.mockResponseOnce(
      JSON.stringify({
        ok: false,
        error_code: 2,
        error: 'Error: This is not a valid URL',
      }),
      { status: 400 }
    )

    // Define the input URL that will cause a failed network response
    const invalidApiUrl = 'invalid-api-url'

    // Call the shortenUrl function and check if it throws the expected error
    await expect(shortenUrl(invalidApiUrl)).rejects.toThrowError(
      'Error while shortening URL. Error code: 2'
    )
  })
})
