import React, { useEffect } from 'react'
import Modal from './Modal'
import { BiCopy, BiX } from 'react-icons/bi'
import { BsTwitterX } from 'react-icons/bs'
import { FaFacebookF } from 'react-icons/fa'
import { LiaLinkedinIn } from 'react-icons/lia'
import { useMessageContext } from '../Provider/MessageProviders'

type Props = {
    onClose: () => void
    postId: string
    title?: string

}

const ShareBlogModal = ({ onClose, postId, title }: Props) => {
    const fullUrl = `${window.location.origin}/blogs/${postId}`
    const encodedURL = encodeURIComponent(fullUrl)
    const encodedTitle = encodeURIComponent(title ?? "Check out this blog!")
    const { addMessage } = useMessageContext()
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [onClose])

    const handleCopy = () => {
        navigator.clipboard.writeText(fullUrl)
            .then(() => addMessage({ message: "🔗 Link copied to clipboard!", type: "info" }))
            .catch(() => addMessage({ message: "❌ Failed to copy link.", type: "error" }))
        onClose()
    }

    return (
        <Modal extraClassName="fixed inset-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-70 p-4">
            <div className="bg-white dark:bg-gray-300 p-6 rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-auto relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
                    aria-label="Close modal"
                >
                    <BiX size={24} />
                </button>

                <h2 className="text-xl font-bold mb-4 text-center">🔗 Share this blog</h2>

                <div className="flex flex-col gap-3 max-w-xs mx-auto">
                    <button
                        onClick={handleCopy}
                        className="bg-gray-100 iconLink  hover:bg-gray-200 rounded px-4 py-2 flex items-center gap-2 justify-center"
                    >
                        <BiCopy /> Copy Link
                    </button>

                    <a
                        href={`https://twitter.com/intent/tweet?url=${encodedURL}&text=${encodedTitle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-500  iconLink flex items-center gap-2 text-white text-center py-2 rounded hover:bg-blue-600 justify-center"
                    >
                        Share on <BsTwitterX size={20} />
                    </a>

                    <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-700 flex iconLink  items-center gap-2 text-white text-center py-2 rounded hover:bg-blue-800 justify-center"
                    >
                        Share on <FaFacebookF size={20} />
                    </a>

                    <a
                        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedURL}&title=${encodedTitle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 flex iconLink  items-center gap-2 text-white text-center py-2 rounded hover:bg-blue-700 justify-center"
                    >
                        Share on <LiaLinkedinIn size={20} />
                    </a>
                </div>
            </div>
        </Modal>
    )
}

export default ShareBlogModal
