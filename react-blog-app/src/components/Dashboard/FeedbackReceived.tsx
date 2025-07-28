import React, { useEffect, useState } from 'react'
import DashboardSectionWrapper from './DashboardSectionWrapper'
import { MdFeedback } from 'react-icons/md'
import { usePagination } from '../../Provider/PaginationProvider'
import { useAuthor } from '../../Provider/AuthorProvider'

const FeedbackReceived = () => {

  const { currentPage, setItemsPerPage, setTotalItemLength, itemsPerPage, totalPages, setPage } = usePagination()

  const { blogsWithFeedback, totalFeedbacks } = useAuthor()
  useEffect(() => {
    setTotalItemLength(totalFeedbacks)
    setItemsPerPage(5)
  }, [totalFeedbacks, blogsWithFeedback])

  useEffect(() => {
    const interval = setInterval(() => {
      setPage((currentPage + 1) % totalPages)
    }, 5000)

    return () => clearInterval(interval)
  }, [blogsWithFeedback.length, itemsPerPage, setPage])

  const start = currentPage * itemsPerPage;
  const end = start + itemsPerPage
  const feedbackToDisplay = blogsWithFeedback.slice(start, end)

  return (
    <DashboardSectionWrapper sectionHeader="Feedbacks" Icon={MdFeedback}>
      {blogsWithFeedback.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No feedback received yet.</p>
      ) : (
        <ul className="space-y-3">
          {feedbackToDisplay.map((fb, index) => (
            <li
              key={`${index}`}
              className="border border-gray-200 dark:border-gray-700 p-3 rounded-md"
            >
              <p className="text-sm text-gray-800 dark:text-white">
                <span className="font-semibold">{fb.name}</span>: {fb.message}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                <span className="italic">on ;"{fb.title}"; </span>{new Date(fb.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}

        </ul>
      )}
    </DashboardSectionWrapper>
  )
}

export default FeedbackReceived
