import { FC } from 'react'

// Header component displays the app header with an emoji and title
export const Header: FC = () => {
  return (
    <header>
      <h1 className="text-center text-2xl font-bold">
        <span role="img" aria-label="label">
          🏷️
        </span>{' '}
        Shortly
      </h1>
    </header>
  )
}
