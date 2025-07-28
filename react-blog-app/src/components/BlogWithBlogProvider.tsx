import React from 'react'
import BlogProvider from '../Provider/BlogProvider'
import Blog from '../pages/Blog'
import { PaginationProvider } from '../Provider/PaginationProvider'

const BlogWithBlogProvider = () => {
  return (
   <PaginationProvider>
     <BlogProvider>
      <Blog/>
    </BlogProvider>
   </PaginationProvider>
  )
}

export default BlogWithBlogProvider
