import { FC } from 'react'

// Header component displays the app header with an emoji and title
export const Header: FC = () => {
  return (
    <header>
      <h1 className="text-2xl font-bold text-slate-50 uppercase tracking-widest">
        <span role="img" aria-label="label" className="mr-2">
          🏷️
        </span>{' '}
        Shortly
      </h1>
    </header>
  )
}
