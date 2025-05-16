import { ReactNode } from 'react'

interface AsideContainerProps {
  children: ReactNode
}

export const AsideContainer = ({children}: AsideContainerProps) => {
  return (
  <aside className='sm:px-5 py-2 sm:my-0 flex border-b-2 border-b-gray-400 sm:border-b-0 sm:justify-center sm:w-[10%] sm:h-[200px] order-1 sm:order-none'>
    <div className='flex sm:flex-col flex-row  items-center gap-5 font-medium sm:fixed'>
      {children}
    </div>
  </aside>)
}