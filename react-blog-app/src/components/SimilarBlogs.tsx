import React, {  } from 'react'
import type { similarBlogType } from '../types/blog'
import { Link } from 'react-router-dom'

type SimilarBlogsProps = {
    similarBlogs: similarBlogType[] | undefined
}

const SimilarBlogs = React.memo(({ similarBlogs }: SimilarBlogsProps) => {
    if (!similarBlogs || similarBlogs.length === 0) return (
        <div className='my-5 bg-gray-100 px-10 py-8 rounded text-gray-600 font-semibold shadow'>
            <h1>No similar blogs available.</h1>
        </div>
    )

    return (
        <div className='my-5 bg-blue-700 px-10 py-8 rounded-lg text-white font-semibold shadow-lg'>
            <h1 className='text-2xl mb-4'>Similar Blogs</h1>
            <ol className='list-decimal list-inside space-y-2'>
                {similarBlogs.map((blog) => (
                    <Link
                        to={`/blogs/${blog.id}`}
                        key={blog.id}
                        className='text-white hover:text-blue-200 hover:underline transition duration-300 iconLink'
                    >
                        <li className='cursor-pointer'>
                            {blog.title}
                        </li>
                    </Link>
                ))}
            </ol>
        </div>
    )
})

export default SimilarBlogs
