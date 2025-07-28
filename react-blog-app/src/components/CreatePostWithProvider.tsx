import React from 'react'
import CreatePost from '../pages/CreatePost'
import CreatePostProvider from '../Provider/CreatePostProvider'

const CreatePostWithProvider = () => {
  return (
    <CreatePostProvider>
        <CreatePost/>
    </CreatePostProvider>
  )
}

export default CreatePostWithProvider
