import React, { useEffect } from 'react'
import RenderBlog from '../components/Blog/RenderBlog'
import BlogHeader from '../components/Blog/BlogHeader'
import { usePagination } from '../Provider/PaginationProvider'
import { posts } from '../static/static_posts'
import { Helmet } from 'react-helmet'
import { useBlogContext } from '../Provider/BlogProvider'
import apiHelper from '../helper/api-helper'
import { BASE_URL } from '../constraints'

const Blogs = () => {
  const { setItems, paginationButton, itemsPerPage, currentPage, setItemsPerPage } = usePagination()
  const { loadBlogs, blogs, fetchTotalBlogsLength } = useBlogContext()
  //loading total blogs
  useEffect(() => {
    setItemsPerPage(6)
    fetchTotalBlogsLength()
  }, [])

  useEffect(() => {

    setItems(blogs)

  }, [blogs, itemsPerPage])

  useEffect(() => {
    loadBlogs(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);





  return (
    <main className='mb-10'>
      <Helmet>
        <title>Blog - React Blog App</title>
        <meta name='keywords' content='react, blog, articles, posts' />
      </Helmet>
      <BlogHeader />
      <RenderBlog isCardDisplay={true} />
      {paginationButton}
    </main>
  )
}

export default Blogs
