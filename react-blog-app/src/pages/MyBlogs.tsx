import React, { useEffect, useState } from 'react'
import { useAuthor } from '../Provider/AuthorProvider'
import BlogMainCard from '../components/BlogMainCard'
import LoadingComponent from '../components/Loading'
import { usePagination } from '../Provider/PaginationProvider'
import useAuthLoaderWithBlog from '../helper/hooks/useAuthorLoaderBlog'
import LoadMoreButton from '../components/LoadMoreButton'
import { useParams } from 'react-router-dom'

const MyBlogs = () => {
    const { authorWithBlogs, loading, ftechTotalAuthorBlogs, totalBlogs } = useAuthor()
    const { setItemsPerPage, setTotalItemLength, currentPage } = usePagination()
    const [limit, setLimit] = useState(3)
    const { author_id } = useParams()

    useAuthLoaderWithBlog({
        authorId: author_id!,
        limit,
        page: currentPage, // use from context
        fetchBlogsOnly: true,
        shouldSetLoading: true
    })

    useEffect(() => {
        ftechTotalAuthorBlogs()
        setItemsPerPage(limit)
    }, [])

    useEffect(() => {
        setTotalItemLength(totalBlogs)
        console.log("total items", totalBlogs)
    }, [totalBlogs])
    useEffect(() => {
        setItemsPerPage(limit)
    }, [limit])

    if (loading && authorWithBlogs?.blogs == null) {
        return <LoadingComponent message="Loading blogs..." />
    }

    if (!loading && authorWithBlogs?.blogs == null) {
        return (
            <div className="my-10 sm:my-16 flex flex-col items-center">
                <h1 className="text-center text-gray-500 text-lg font-semibold mb-4">
                    No Blogs to Show
                </h1>
                <p className="text-sm text-gray-400">You haven't published any blogs yet.</p>
            </div>
        )
    }


    return (
        <div className="my-6 space-y-6 mx-auto max-w-7xl">
            <div className="sticky top-14 sm:top-16 md:top-20 lg:top-24 z-40 bg-white dark:bg-gray-900 shadow-sm border-y border-gray-200 dark:border-gray-700 px-6 py-3 flex justify-between items-center  mx-auto rounded-md">
                <div className="flex items-center gap-3">
                    <label
                        htmlFor="perPage"
                        className="text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                        Items per page:
                    </label>
                    <select
                        id="perPage"
                        defaultValue={3}
                        onChange={(e) => setLimit(parseInt(e.target.value))}
                        className="text-sm border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    >
                        <option value={3}>3</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </div>
            </div>


            <BlogMainCard isCardDisplay={true} items={authorWithBlogs?.blogs!} loading={loading} />
            <LoadMoreButton
                limit={limit}
                author_id={author_id!}
            />
        </div>
    )
}

export default MyBlogs
