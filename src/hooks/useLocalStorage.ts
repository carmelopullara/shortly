import { Dispatch, SetStateAction, useEffect, useState } from 'react'

/**
 * Custom hook to manage state with local storage persistence.
 *
 * @param {string} key - The key to use in local storage.
 * @param {T} initialValue - The initial state value.
 * @returns {[T, Dispatch<SetStateAction<T>>]} A tuple with the state value and a setter function.
 */

export function useLocalStorage<T extends any>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const getValueFromStorage = (): T => {
    try {
      const storedValue = window.localStorage.getItem(key)
      return storedValue !== null ? JSON.parse(storedValue) : initialValue
    } catch (error) {
      console.error(
        `Error getting value from local storage for key "${key}":`,
        error
      )
      return initialValue
    }
  }

  const [value, setValue] = useState<T>(getValueFromStorage)

  // Update local storage when the value changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(
        `Error setting value in local storage for key "${key}":`,
        error
      )
    }
  }, [key, value])

  return [value, setValue]
}
