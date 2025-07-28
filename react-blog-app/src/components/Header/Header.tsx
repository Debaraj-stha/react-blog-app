import React from 'react'
import NavBar from './NavBar'

const Header = () => {
  return (
    <div className='px-4 sm:py-4 md:py-5 lg:py-7 bg-gray-800 dark:bg-gray-900 pb-5 sm:pb-0 fixed top-0 w-screen z-50'>
      <NavBar/>
    </div>
  )
}

export default Header
