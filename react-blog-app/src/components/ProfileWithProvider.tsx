import React from 'react'
import Profile from '../pages/Profile'
import AuthorProvider from '../Provider/AuthorProvider'

const ProfileWithProvider = () => {
  return (
    <AuthorProvider>
      <Profile/>
    </AuthorProvider>
  )
}

export default ProfileWithProvider
