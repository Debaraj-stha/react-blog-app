import React, { use, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthor } from '../../Provider/AuthorProvider'
import RenderPosts from '../RenderPosts'
import useAuthLoaderWithBlog from '../../helper/hooks/useAuthorLoaderBlog'
import LoadingComponent from '../Loading'
import LoadMoreButton from '../LoadMoreButton'
import SectionHeading from './SectionHeading'
import { BiBook } from 'react-icons/bi'
import DashboardSectionWrapper from './DashboardSectionWrapper'

const DashboardBlogs = () => {
  const { author_id } = useParams()
  const { authorWithBlogs, loading, totalBlogs, ftechTotalAuthorBlogs } = useAuthor()
  // useAuthLoaderWithBlog({})
  useEffect(() => {
    if (author_id) {
      ftechTotalAuthorBlogs();
    }

  }, [author_id])
  return (
    <>
      <DashboardSectionWrapper sectionHeader='Blogs' Icon={BiBook} iconBG='text-yellow-500'>
        {
          loading ?
            <LoadingComponent message='Loading Blogs...' width='100%' />
            :
            !authorWithBlogs ?
            
              <p className="text-gray-500 dark:text-gray-400">No author found.</p>
              : null
        }

        {authorWithBlogs && authorWithBlogs.blogs.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400">No blogs found.</p>
        )}
        {authorWithBlogs?.blogs && authorWithBlogs.blogs.length > 0 && (
          <>
            <h1 className='my-5 text-lg font-bold'>{authorWithBlogs.blogs.length} of {totalBlogs} blogs </h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
              <RenderPosts posts={authorWithBlogs.blogs} isCardDisplay={true} isEditable={true} />
            </div>
          </>

        )}

        <LoadMoreButton
          author_id={author_id!}
        />
      </DashboardSectionWrapper>
    </>

  )
}

export default DashboardBlogs
