import React from 'react'
import EligibleToUpdateBlogs from '../pages/EligibleToUpdateBlogs'
import AuthorProvider from '../Provider/AuthorProvider'

const EligibleToUpdateBlogsWithProvider = () => {
  return (
    <AuthorProvider>
      <EligibleToUpdateBlogs/>
    </AuthorProvider>
  )
}

export default EligibleToUpdateBlogsWithProvider
