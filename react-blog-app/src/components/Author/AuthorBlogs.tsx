import React, { useState } from 'react'
import { useAuthor } from '../../Provider/AuthorProvider'
import RenderPosts from '../RenderPosts'
import LoadMoreButton from '../LoadMoreButton'



const AuthorBlogs = () => {
  const { authorWithBlogs } = useAuthor()
  const blogs = authorWithBlogs?.blogs
  if (!blogs || blogs.length === 0) return null




  return (
    <div className="max-w-7xl mx-auto   my-12">
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          Blogs by {authorWithBlogs.author.name}
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <RenderPosts posts={blogs} isCardDisplay={true} />
        </div>

      <LoadMoreButton author_id={authorWithBlogs!.author!.author_id!}/>
      </div>
    </div>
  )
}

export default AuthorBlogs
