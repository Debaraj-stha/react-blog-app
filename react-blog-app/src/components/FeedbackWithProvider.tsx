import React from 'react'
import SingleBlog from './SingleBlog'
import BlogProvider from '../Provider/BlogProvider'
import { PaginationProvider } from '../Provider/PaginationProvider'

import Blog from '../pages/Blog'

const FeedbackWithProvider = () => {
  return (
    <PaginationProvider>
      <BlogProvider>
   <Blog showAuthor={false} showFeedbackForm={false} showSimilarBlogs={false} />
      </BlogProvider>
    </PaginationProvider>
  )
}

export default FeedbackWithProvider
