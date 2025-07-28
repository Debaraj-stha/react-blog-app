import React from 'react'
import { PaginationProvider } from '../Provider/PaginationProvider'
import Blogs from '../pages/Blogs'
import BlogProvider from '../Provider/BlogProvider'


const BlogWithPagination = () => {
  return (
        <PaginationProvider>
          <BlogProvider>
            <Blogs />
            </BlogProvider>
          </PaginationProvider>
  )
}

export default BlogWithPagination
