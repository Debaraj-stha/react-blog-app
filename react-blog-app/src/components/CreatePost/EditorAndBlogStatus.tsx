import React from 'react'
import EditorCard from './EditorCard';
import PostStatus from './PostStatus';

const EditorAndBlogStatus =React.memo(() => {
   
    return (
        <>
            <EditorCard />
            <PostStatus/>
            

        </>
    )
})

export default EditorAndBlogStatus
