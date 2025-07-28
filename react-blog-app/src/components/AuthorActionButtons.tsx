import React, { useState } from 'react'
import { BiEdit, BiTrash } from 'react-icons/bi'
import { MdFeedback, MdMoreVert, MdUnpublished } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { useAuthor } from '../Provider/AuthorProvider'

const AuthorActionButtons = ({ id }: { id: string }) => {
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { handleBlogAction } = useAuthor()


    return (
        <div className="flex items-center gap-2 relative">
            {/* Edit */}
            <button
                className="px-3 py-1 rounded bg-yellow-500 dark:bg-yellow-600 text-white hover:bg-yellow-600
         dark:hover:bg-yellow-700 transition duration-200 hover:animate-pulse"
                onClick={() => navigate(`/author/blog/${id}/edit`)}
            >
                <BiEdit />
            </button>

            {/* Delete */}
            <button
                onClick={() => console.log(`Delete post with id: ${id}`)}
                className="hover:animate-pulse px-3 py-1 rounded bg-red-500 text-white dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700 transition duration-200"
            >
                <BiTrash />
            </button>

            {/* More */}
            <div
                className="relative"
                onMouseEnter={() => setIsMenuOpen(true)}
                onMouseLeave={() => setIsMenuOpen(false)}
            >
                <div className=" rounded transition">
                    <MdMoreVert size={20} className="text-black hover:animate-bounce" />
                </div>
                {isMenuOpen && (
                    <div className="absolute -top-20 left-4 mt-2 w-44 bg-gray-800 text-gray-800 dark:text-white border dark:border-gray-700 rounded shadow-md z-20 animate-fade-in">
                        <p
                            onClick={() => navigate(`/author/blog/${id}/feedback/`)}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 border border-transparent hover:border-blue-400"
                        >
                            <MdFeedback size={18} />
                            <span>Feedbacks</span>
                        </p>
                        <p
                            onClick={() => handleBlogAction(id, "unpublish")}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 border border-transparent hover:border-blue-400"
                        >
                            <MdUnpublished size={18} />
                            <span>Unpublish</span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AuthorActionButtons
