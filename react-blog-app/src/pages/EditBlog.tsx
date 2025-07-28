import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

import { useLocation, useParams } from 'react-router-dom'

import apiHelper from '../helper/api-helper'
import { BASE_URL } from '../constraints'
import { useCreateContext } from '../Provider/CreatePostProvider'
import StepForm from '../components/CreatePost/StepForm'
import LoadingComponent from '../components/Loading'
import type { BlogStatusType } from '../types/CreatePostType'

const EditBlog = () => {
  const { setTitle, setContent, setSelectedCategory, setSelectedTags, setBlogIdToEdit, setBlog, setEditors, statusDispatch

  } = useCreateContext()
  const [loading, setLoading] = useState(true)
  const { blog_id } = useParams()
  const location = useLocation()
  const from = location.state?.from

  useEffect(() => {
    const fetchBlog = async () => {
      if (blog_id) {
        const res = await apiHelper({ url: `${BASE_URL}api/blog/${blog_id}?fetch_editors=${true}&fetch_similar=false`, })
        const blog = res.blog;
        setContent(blog.content)
        setTitle(blog?.title)
        setSelectedCategory(blog.category)
        setSelectedTags(blog.tags)
        setBlogIdToEdit(blog._id)
        setBlog(blog)
        const blogStatus: BlogStatusType = {
          isPublished: blog?.isPublished && !blog?.isScheduled,
          isScheduled: blog.isScheduled,
          isUnpublish: !blog?.isPublished,
          scheduledAt: blog?.scheduledAt ? new Date(blog.scheduledAt) : undefined
        }
        statusDispatch({ type: "RESET", payload: blogStatus })
        if (from !== 'eligible') {
          setEditors(res.blog.editors)
        }

        setLoading(false)
      }
    }
    fetchBlog()
  }, [blog_id])


  return (
    <div className='relative max-w-7xl mx-auto px-4 py-10 text-gray-800'>
      <Helmet>
        <title>Edit blog</title>
        <meta
          name="keywords"
          content="react, blog, articles, posts, create post"
        />
      </Helmet>

      {
        loading ? (
          <LoadingComponent />
        ) :
          (
            <StepForm isEdit={true} />
          )
      }

    </div>
  )
}

export default EditBlog
