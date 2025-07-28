import React from 'react'
import { FaFire, FaEye, FaHeart } from 'react-icons/fa'
import DashboardSectionWrapper from './DashboardSectionWrapper'
import { useAuthor } from '../../Provider/AuthorProvider'
import { RiFeedbackFill } from 'react-icons/ri'

const TopPerformingBlogs = () => {
  // Example static data — replace with real analytics data later
 const{authorPopularBlogs}=useAuthor()
  return (
    <DashboardSectionWrapper Icon={FaFire} iconBG='text-red-500' sectionHeader='Top Performing Blogs'>
      {authorPopularBlogs!.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No top blogs to display.</p>
      ) : (
        <ul className="space-y-3">
          {authorPopularBlogs!.map((blog, index) => (
            <li
              key={index}
              className="border border-gray-200 dark:border-gray-700 p-3 rounded-md"
            >
              <p className="font-medium text-gray-800 dark:text-white">{blog.title}</p>
              <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <FaEye className="text-blue-500" /> {blog!.views} views
                </span>
                <span className="flex items-center gap-1">
                  <RiFeedbackFill className="text-pink-500" /> {blog.feedbackCount} feedbacks
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}

    </DashboardSectionWrapper>



  )
}

export default TopPerformingBlogs
