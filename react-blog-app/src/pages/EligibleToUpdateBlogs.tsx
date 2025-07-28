import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useAuthor } from '../Provider/AuthorProvider'
import { useParams } from 'react-router-dom'
import LoadingComponent from '../components/Loading'
import BlogMainCard from '../components/BlogMainCard'
import PostCard from '../components/PostCard'

const EligibleToUpdateBlogs = () => {
    const { loadEligibleToUpdateBlogs, blogEligibleToUpdate, loading } = useAuthor()
    const { user_id } = useParams()

    useEffect(() => {
        if (user_id) {
            loadEligibleToUpdateBlogs(user_id)
        }

    }, [user_id])
    return (
        <div className='max-w-7xl max-auto py-6 px-4 sm:mx-auto my-12 bg-gray-300 dark:bg-gray-800 rounded shadow-lg'>
            <Helmet>
                <title>Edit blogs-editor</title>
            </Helmet>
            {
                loading ? <LoadingComponent /> : (
                    <>
                        <h1 className='my-4 text-lg font-bold'>You are editor of these blogs</h1>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                            {
                                blogEligibleToUpdate?.map((blog, index) => {
                                    return <PostCard key={index} isCardDisplay={true} post={blog} isEditorMode={true}/>
                                })
                            }
                        </div>
                    </>
                )
            }

        </div>
    )
}

export default EligibleToUpdateBlogs
