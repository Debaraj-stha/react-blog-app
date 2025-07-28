import React, { useEffect } from 'react'


import RenderPosts from './RenderPosts'
import { useBlogContext } from '../Provider/BlogProvider'
import  LoadingComponent from './Loading'

const RecentPosts = () => {
  const { getrecentBlogs, recentBlogs } = useBlogContext()
  useEffect(() => {
    getrecentBlogs()
  }, [])
  return (
    <section className="max-w-7xl sm:mx-auto py-12 px-3 sm:px-4 bg-gray-100 dark:bg-gray-800 my-14 rounded shadow-lg">
      <h2 className="text-3xl font-bold my-6 text-center text-gray-700 dark:text-white ">Recent Posts</h2>
      {
        recentBlogs?.length == 0 ?
          <LoadingComponent  message='Loading recent blogs...' />
          :
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 overflow-y-auto max-h-[50vh]">
            <RenderPosts posts={recentBlogs!} isCardDisplay={true} />
          </div>
      }
    </section>
  )
}

export default RecentPosts
