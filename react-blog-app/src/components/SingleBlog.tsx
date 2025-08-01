import React, { useEffect } from 'react'
import type { BlogType } from '../types/blog'
import { LiaHandPointer } from 'react-icons/lia'
import RenderBlogContent from './RenderBlogContent'
import { Link, useParams } from 'react-router-dom'
import SimilarBlogs from './SimilarBlogs'
import FeedbackOfBlogForm from './FeedbackOfBlogForm'
import Feedback from './Feedback'
import { useBlogContext } from '../Provider/BlogProvider'
import { usePagination } from '../Provider/PaginationProvider'
import BlogCardActionButtons from './BlogCardActionButtons'
import '../css/animation/blog-animation.css'



type SingleBlogProps = {
    blog: BlogType,
    showAuthor?: boolean,
    showSimilarBlogs?: boolean,
    showFeedbackForm?: boolean,
    isAuthorView?: boolean;
}
const SingleBlog = React.memo(({
    blog,
    showAuthor = true,
    showFeedbackForm = true,
    showSimilarBlogs = true,
    isAuthorView = false,
}: SingleBlogProps) => {
    const { content, author_id, title, createdAt, similarBlogs,author_name } = blog;
    const {
        feedbacks,
        fetchBlogFeedbaks, getFeedbackCount,
    } = useBlogContext()

    const { currentPage, setTotalItemLength } = usePagination()
    const { blog_id } = useParams()
    useEffect(() => {
        if (blog_id) {
            fetchBlogFeedbaks({ blog_id, page: currentPage })
        }
    }, [blog_id, currentPage, fetchBlogFeedbaks])

    useEffect(() => {
        const fetchFeedbackCount = async () => {
            if (blog_id) {
                const totalFeedback = await getFeedbackCount(blog_id)
                setTotalItemLength(totalFeedback)

            }

        }
        fetchFeedbackCount()
    }, [blog_id, getFeedbackCount])


    return (
        <div className="max-w-7xl mx-auto px-4 py-10 text-black dark:text-gray-200">
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Blog Content */}
                <div className={`${isAuthorView ? 'lg:col-span-2' : 'lg:col-span-3'
                    } bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 sm:p-10`}>
                    <header className="mb-8">
                        <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 dark:text-gray-200 mb-4">{title}</h1>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-gray-600 text-sm sm:text-base">
                            {showAuthor && (
                                <div className="flex items-center gap-2">
                                    <LiaHandPointer className="rotate-90 text-blue-600  dark:text-gray-200 dark:hover:text-gray-400" size={20} />
                                    <Link
                                        to={`/author/${author_id}`}
                                        className="font-medium hover:text-blue-500 transition-colors"
                                    >
                                       {author_name}
                                    </Link>
                                </div>
                            )}
                            <p className="text-gray-500 dark:text-gray-200  font-medium">{new Date(createdAt!).toDateString()}</p>
                        </div>
                    </header>

                    <RenderBlogContent content={content!} />

                    <div className='my-4'>
                        <BlogCardActionButtons post={blog} showShareIcon={true} />
                    </div>
                </div>
                {/* Sidebar: Similar Blogs & Feedback */}
                <div className="space-y-6">

                    {/* Feedback Summary (author view) */}
                    {isAuthorView && (
                        <div className="p-5 rounded-xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-semibold mb-3 text-gray-800">Reader Feedback</h2>
                            <Feedback />
                        </div>
                    )}
                </div>
            </div>
            {showSimilarBlogs && similarBlogs && similarBlogs.length > 0 && (
                <>
                    <SimilarBlogs similarBlogs={similarBlogs} />
                </>
            )}


            <div className='grid lg:grid-cols-3 gap-8'>
                {/* Feedback (if exists) */}
                {feedbacks.length > 0 && (
                    <div className='lg:col-span-2'>
                        {!isAuthorView && (
                            <div className="mt-8 max-w-4xl mx-auto">
                                <Feedback />
                            </div>
                        )}
                    </div>
                )}

                {/* Feedback Form */}
                {showFeedbackForm && (
                    <div className={`${feedbacks.length > 0 ? 'lg:col-span-1' : 'lg:col-span-3'}`}>
                        <div className="mt-12 w-full">
                            <FeedbackOfBlogForm />
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
});

export default SingleBlog
