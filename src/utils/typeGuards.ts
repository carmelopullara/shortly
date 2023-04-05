/**
 * Type guard function to check if an unknown value is an instance of Error.
 *
 * @param err - The value to be checked.
 * @returns A boolean indicating if the given value is an instance of Error.
 */
export const isError = (err: unknown): err is Error => {
  return err instanceof Error
}
