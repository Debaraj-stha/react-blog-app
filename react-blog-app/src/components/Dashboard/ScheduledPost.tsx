import React, { useEffect, useRef, useState } from 'react'
import { FaClock } from 'react-icons/fa'
import DashboardSectionWrapper from './DashboardSectionWrapper'
import { useAuthor } from '../../Provider/AuthorProvider'
import ListItem from './ListItem'
import VerticalMoreIcon from '../VerticalMoreIcon'
import PopupWrapper from './PopupWrapper'
import DateTimePickerModal from '../DateTimePicker'
import type { handleBlogActionType } from '../../types/author'
import { useNavigate } from 'react-router-dom'



const ScheduledPost = () => {
  const {     deleteBlog,
    handleBlogAction,
    isTimePickerOpen,
    selectedBlogId,
    setSelectedBlogId,
    setTimePickerOpen,
    scheduledBlog

  } = useAuthor()
  const [openPopupIndex, setOpenPopupIndex] = useState<number | null>(null)
  const popupRef = useRef<HTMLDivElement>(null)
const navigate=useNavigate()

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setOpenPopupIndex(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  const handleDelete = (e: React.MouseEvent<HTMLElement>, blog_id: string) => {
    deleteBlog(blog_id, true)
  }
  const handlePublish = (blog_id: string) => {
    handleBlogAction(blog_id, "publish", {
      isScheduledBlogPublish: true
    })
    setOpenPopupIndex(null)
  }
  const handleReschedule = (blog_id: string, scheduledAt: string) => {
    const data: handleBlogActionType = {
      scheduledAt: scheduledAt
    }
    handleBlogAction(blog_id, "reschedule", data)

  }

  return (
    <DashboardSectionWrapper sectionHeader="Scheduled Posts" Icon={FaClock} iconBG="text-yellow-500">
      {scheduledBlog?.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No scheduled posts.</p>
      ) : (
        <ul className="space-y-2">
          {scheduledBlog?.map((blog, index) => (
            <ListItem
              key={index}
              title={blog.title}
              subTitle={`Scheduled on ${new Date(blog.scheduledAt!).toDateString()}`}
            >
              <div className='relative' ref={popupRef}>
                <VerticalMoreIcon onClick={() => setOpenPopupIndex(index)} iconSize={20} />
                {
                  openPopupIndex === index && (
                    <PopupWrapper>
                      <p onClick={() => navigate(`/author/blog/${blog._id}/edit`)} className="text-sm text-gray-700 dark:text-gray-200 hover:text-blue-600 cursor-pointer">
                        Edit
                      </p>
                      <p onClick={(e) => handleDelete(e, blog._id)} className="text-sm text-gray-700 dark:text-gray-200 hover:text-red-500 cursor-pointer mt-1">
                        Delete
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-200 hover:text-green-500 cursor-pointer mt-1"
                        onClick={() => handlePublish(blog._id)}>
                        Publish
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-200 hover:text-green-500 cursor-pointer mt-1"
                        onClick={(e) => {
                          setSelectedBlogId(blog._id);
                          setTimePickerOpen(true)
                        }}>
                        Reschedule
                      </p>
                    </PopupWrapper>
                  )
                }
              </div>
            </ListItem>
          ))
          }
        </ul >
      )}
      <DateTimePickerModal
        isOpen={isTimePickerOpen}
        onClose={() => setTimePickerOpen(false)}
        onSubmit={(date) => {
          handleReschedule(selectedBlogId!, date)
          setTimePickerOpen(false)
        }}
        initialValue={""}
        ref={popupRef}

      />
    </DashboardSectionWrapper >
  )
}

export default ScheduledPost

