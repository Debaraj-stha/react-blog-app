import React from 'react'
import { PaginationProvider } from '../Provider/PaginationProvider'
import BlogProvider from '../Provider/BlogProvider'
import RecentPosts from './RecentPosts'

const RecentPostWithProviders = () => {
    return (
        <PaginationProvider>
            <BlogProvider>
                <RecentPosts />
            </BlogProvider>

        </PaginationProvider>
    )
}

export default RecentPostWithProviders
