import React, { useState, useRef, useEffect } from 'react'
import DashboardSectionWrapper from './DashboardSectionWrapper'
import { MdUnpublished } from 'react-icons/md'
import { useAuthor } from '../../Provider/AuthorProvider'

import ListItem from './ListItem'
import DateTimePickerModal from '../DateTimePicker'
import VerticalMoreIcon from '../VerticalMoreIcon'
import PopupWrapper from './PopupWrapper'
import type { handleBlogActionType } from '../../types/author'
import { useNavigate } from 'react-router-dom'

const DraftBlogs = () => {
  const { deleteBlog,
    handleBlogAction,
    isTimePickerOpen,
    selectedBlogId,
    setSelectedBlogId,
    setTimePickerOpen,
    draftBlogs
  } = useAuthor()
  const [openPopupIndex, setOpenPopupIndex] = useState<number | null>(null)
  const popupRef = useRef<HTMLDivElement | null>(null)
  const navigate = useNavigate()




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
    deleteBlog(blog_id)
  }

 

  const handlePublish = (e: React.MouseEvent<HTMLElement>, blog_id: string) => {
    handleBlogAction(blog_id, "publish")
    setOpenPopupIndex(null)
  }
  const handleSchedule = (blog_id: string, scheduledAt: string) => {
    const data: handleBlogActionType = {
      scheduledAt: scheduledAt
    }
    handleBlogAction(blog_id, "schedule", data)
  }

  return (
    <DashboardSectionWrapper
      sectionHeader="Draft Blogs"
      Icon={MdUnpublished}
      iconBG="text-blue-500"
    >
      {draftBlogs?.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No draft blogs yet.</p>
      ) : (
        <ul className="space-y-3">
          {draftBlogs?.map((blog, index) => (
            <ListItem key={index} title={blog.title}
              subTitle={`Last Edited On ${new Date(blog!.updatedAt!).toDateString()}`}
            >
              <div className='relative' ref={popupRef}>
                <VerticalMoreIcon onClick={() => setOpenPopupIndex(index)} iconSize={20} />
                {
                  openPopupIndex === index && (
                    <PopupWrapper>
                      <p onClick={()=>navigate(`/author/blog/${blog._id}/edit`)} className="text-sm text-gray-700 dark:text-gray-200 hover:text-blue-600 cursor-pointer">
                        Edit
                      </p>
                      <p onClick={(e) => handleDelete(e, blog._id)} className="text-sm text-gray-700 dark:text-gray-200 hover:text-red-500 cursor-pointer mt-1">
                        Delete
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-200 hover:text-green-500 cursor-pointer mt-1"
                        onClick={(e: React.MouseEvent<HTMLElement>) => handlePublish(e, blog._id)}>
                        Publish
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-200 hover:text-green-500 cursor-pointer mt-1"
                        onClick={(e) => {
                          setSelectedBlogId(blog._id);
                          setTimePickerOpen(true)
                        }}>
                        Schedule
                      </p>
                    </PopupWrapper>
                  )
                }
              </div>

            </ListItem>
          ))}
        </ul>
      )}

      <DateTimePickerModal
        isOpen={isTimePickerOpen}
        onClose={() => setTimePickerOpen(false)}
        onSubmit={(dateTime) => {
          handleSchedule(selectedBlogId!, dateTime)
          setTimePickerOpen(false)
        }}
        initialValue={new Date().toLocaleDateString()}
        ref={popupRef}
      />



    </DashboardSectionWrapper>
  )
}

export default DraftBlogs
