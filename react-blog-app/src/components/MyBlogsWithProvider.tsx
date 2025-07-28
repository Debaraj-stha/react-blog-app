import React from 'react'
import MyBlogs from '../pages/MyBlogs'
import AuthorProvider from '../Provider/AuthorProvider'
import { PaginationProvider } from '../Provider/PaginationProvider'

const MyBlogsWithProvider = () => {
    return (
        <PaginationProvider>
            <AuthorProvider>
                <MyBlogs />
            </AuthorProvider>
        </PaginationProvider>
    )
}

export default MyBlogsWithProvider
