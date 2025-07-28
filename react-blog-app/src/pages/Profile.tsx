import React, { useEffect } from 'react'
import AuthorCard from '../components/Author/AuthorCard'
import useAuthLoader from '../helper/hooks/useAuthorLoaderBlog'
import { useAuthor } from '../Provider/AuthorProvider'
import { useParams } from 'react-router-dom'

const Profile = () => {
    const{loadAuthor}=useAuthor()
    const {author_id}=useParams()
    useEffect(()=>{
        loadAuthor(author_id || "")
    },[author_id])
    return (
        <div className='max-w-7xl sm:my-6 md:my-8 lg:my-12 mx-auto'>
            <AuthorCard isEditable={true}  />
        </div>
    )
}

export default Profile
