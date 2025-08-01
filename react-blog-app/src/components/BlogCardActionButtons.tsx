import React, { useState } from 'react'
import ToolTip from './ToolTip'
import { RiBookMarkedFill } from 'react-icons/ri'
import { BiBookmark, BiShare } from 'react-icons/bi'
import Bookmark from '../helper/bookmarkedBlogHelper'
import type { BlogType } from '../types/blog'
import { useMessageContext } from '../Provider/MessageProviders'
import { useAuth } from '../Provider/AuthProvider'
import ShareBlogModal from './ShareBlogModal'

type Props = {
    post: BlogType,
    onBookmarkChange?: () => void,
    showShareIcon?: boolean
}

const BlogCardActionButtons = ({ post, onBookmarkChange, showShareIcon = false }: Props) => {
    const [isModalOpen,setIsModalOpen] = useState<boolean>(false)
    const { user } = useAuth()
    const user_id = user?.user_id || "guest"
    const bookmark = Bookmark.loadFromLocalStorage(user_id)
    const { addMessage } = useMessageContext()


    const handleBookmark = () => {
        bookmark.isAlreadyBookmarked(post._id) ? removeBookmark() : addBookmark()
    }

    const addBookmark = () => {
        bookmark.add(post)
        addMessage({ message: "Bookmarked  successfully", type: "info" })

    }
    const removeBookmark = () => {
        bookmark.remove(post._id)
        onBookmarkChange?.(); //call this function to reflect change on localstorage on UI after removal of bookmark
        addMessage({ message: "Bookmarked remove  successfully", type: "info" })
    }

    return (
        <>
            <div className='flex gap-4'>
                <ToolTip message='Bookmark'>
                    <button
                        onClick={handleBookmark}
                        className="hover:animate-pulse text-blue-600 hover:underline flex items-center gap-3
                     transition-colors duration-300 group-hover:text-blue-800  dark:text-gray-200 dark:hover:text-gray-400"
                    >
                        {bookmark.isAlreadyBookmarked(post._id) ? <RiBookMarkedFill /> : <BiBookmark />}
                    </button>
                </ToolTip>
                {
                    // show share button only for single blog
                    showShareIcon && <ToolTip message='Share'>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="hover:animate-pulse text-blue-600 hover:underline flex items-center gap-3
                     transition-colors duration-300 group-hover:text-blue-800 dark:text-gray-200 dark:hover:text-gray-400"
                        >
                            <BiShare />

                        </button>
                    </ToolTip>
                }

            </div>
            {isModalOpen && (
                <ShareBlogModal
                    onClose={() => setIsModalOpen(false)}
                    postId={post._id}
                    title={post.title}
                />
            )}

        </>
    )
}

export default BlogCardActionButtons
