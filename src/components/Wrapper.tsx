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
    <section className="py-24">
      <div className="flex flex-1 lg:w-2/3 xl:w-2/5 w-full px-7 mx-auto gap-4 flex-col">{children}</div>
    </section>
  )
}
