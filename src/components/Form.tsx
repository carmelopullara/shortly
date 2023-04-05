import cx from 'classnames'
import { useState } from 'react'
import { Aperture, ArrowRightCircle } from 'react-feather'
import { RegisterOptions, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useShortenedUrlContext } from '../hooks/useShortenedUrlContext'
import { shortenUrl } from '../services/api'
import { parseErrorMessage } from '../utils/errorUtils'

interface FormValues {
  url: string
}

// Define the regular expression for validating URLs. Both http and https are optional, as in the shrtco.de API
const URL_REGEX =
  /^(?:https?:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/

// Validation schema for the URL input field.
const urlValidationSchema: RegisterOptions = {
  required: { value: true, message: 'Please fill out this field' },
  pattern: { value: URL_REGEX, message: 'Please enter a valid URL' },
}

export const Form = () => {
  const [errorMessage, setErrorMessage] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)
  const { addShortenedUrl } = useShortenedUrlContext()

  // Initialize the useForm hook with the form values.
  const {
    handleSubmit,
    register,
    formState: { errors },
    resetField,
  } = useForm<FormValues>()

  // The submit handler for the form.
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      setIsLoading(true)
      const url = await shortenUrl(data.url)
      addShortenedUrl(url)
      resetField('url')

      // Show a success toast when the URL is shortened.
      toast('Your shortened link is ready to use', {
        icon: '🎉',
        className: 'bg-slate-800 text-slate-100 text-sm',
      })
    } catch (error) {
      const message = parseErrorMessage(error)
      setErrorMessage(message)
    } finally {
      setIsLoading(false)
    }
  }

  // Check if the URL input field has an error.
  const urlFieldHasError = errors.url?.message && errors.url.message.length > 0

  // Compute the CSS classes for the input field based on its error state.
  const inputClasses = cx(
    'block bg-gray-800 relative w-full text-gray-100 p-4 rounded-l-sm placeholder:text-slate-400 text-sm border outline-1 focus:outline focus:outline-dotted',
    {
      'border-gray-800': !urlFieldHasError,
      'border-rose-500': urlFieldHasError,
      'outline-blue-500': !urlFieldHasError,
      'outline-rose-500': urlFieldHasError,
    }
  )

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col flex-1 gap-2"
    >
      <div className="flex">
        <input
          type="text" // Use text input instead of URL to show custom errors
          className={inputClasses}
          placeholder="Enter the URL you want to shorten"
          {...register('url', urlValidationSchema)}
        />
        <button
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 active:bg-blue-900 p-4 rounded-r-sm text-white font-semibold text-sm shadow-lg"
        >
          {isLoading ? (
            <Aperture className="animate-spin" />
          ) : (
            <ArrowRightCircle />
          )}
        </button>
      </div>
      <p className="text-sm text-rose-500">
        {errorMessage || errors.url?.message}
      </p>
    </form>
  )
}
