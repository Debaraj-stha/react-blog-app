
import React, { useEffect, useState } from 'react'
import AuthorCardHeader from '../components/Author/AuthorCaredHeader'
import { useAuthor } from '../Provider/AuthorProvider'
import AuthorEducationAndProfession from '../components/Author/AuthorEducationAndProfession'
import UpdateAuthorExperienceCard from '../components/Author/UpdateAuthorExperienceCard'
import AuthorSkillsAndHobbies from '../components/Author/AuthorSkillsAndHobbies'
import AuthorSocial from '../components/Author/AuthorSocial'
import { useAuth } from '../Provider/AuthProvider'
import { useNavigate } from 'react-router-dom'
import LoadingComponent from '../components/Loading'

const CreateAuthor = () => {
    const { user ,loading} = useAuth()
    const navigate = useNavigate()
    const { setIsUpdate, dispatch, createAuthor } = useAuthor()
    useEffect(() => {
        if (!loading && !user) {
            navigate("/login",{state:{from:"/create-post"}})
        }
    }, [user, loading])

    useEffect(() => {
        setIsUpdate(true)
        //add one empty experience input field
        dispatch({ type: "SET_DETAILS_EXPERIENCE", payload: [{ company: '', role: '', duration: '' }] })
    }, [])

    if (loading)
        return <LoadingComponent message='Loading...' />

    return (
        <div className='mx-auto max-w-7xl bg-gray-200  dark:bg-gray-800 rounded-xl my-6 space-y-5 px-6 py-8'>
            <h1 className='text-center my-5 text-gray-800 dark:text-gray-100 text-xl font-bold'>Create Author</h1>
            <AuthorCardHeader
                name=''
                location=''
                username=''
                joined={`${new Date().toLocaleDateString()}`}
                bio=''
            />
            <AuthorEducationAndProfession />
            <UpdateAuthorExperienceCard />
            <AuthorSkillsAndHobbies />
            <AuthorSocial />
            <button onClick={createAuthor} className='my-6 bg-blue-600 text-white  transition-all hover:bg-blue-700'>Create Account</button>
        </div>
    )
}

export default CreateAuthor
