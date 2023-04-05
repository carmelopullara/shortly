import { isError } from './typeGuards'

/**
 * Parses an error object and returns the error message.
 * If the error object is not an instance of Error, it returns a default message.
 *
 * @param error - The error object to parse.
 * @returns The error message as a string.
 */
export const parseErrorMessage = (error: unknown): string => {
  // If the error object is an instance of Error, return its message property
  if (isError(error)) {
    return error.message
  }

  // If the error object is not an instance of Error, return a default message
  return 'An unknown error occurred.'
}
