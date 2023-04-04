import { FC, ReactNode } from 'react'

interface WrapperProps {
  children?: ReactNode
}

/**
 * Wrapper component provides a container for wrapping its children components
 * with a centered layout and responsive design
 */
export const Wrapper: FC<WrapperProps> = ({ children }) => {
  return (
    <section className="min-w-full min-h-screen grid place-content-center">
      <div className="container mx-auto px-4">
        <div className="md:min-w-[640px] sm:min-w-full max-w-full grid gap-8">
          {children}
        </div>
      </div>
    </section>
  )
}
