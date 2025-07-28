import React, { type ReactNode } from 'react'

const CardWrapper = ({children}:{children:ReactNode}) => {
  return (
    <div className='max-w-7xl py-6 px-4 sm:mx-auto my-12 bg-gray-300 dark:bg-gray-800 rounded shadow-lg'>
      {children}
    </div>
  )
}

export default CardWrapper
