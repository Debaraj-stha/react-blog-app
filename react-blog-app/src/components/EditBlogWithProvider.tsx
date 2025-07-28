import React from 'react'
import CreatePostProvider from '../Provider/CreatePostProvider'
import EditBlog from '../pages/EditBlog'
import BlogProvider from '../Provider/BlogProvider'

const EditBlogWithProvider = () => {
  
  return (
    <>
      <CreatePostProvider>
        <EditBlog />
      </CreatePostProvider>
    </>
  )
}

export default EditBlogWithProvider
