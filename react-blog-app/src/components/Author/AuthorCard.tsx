import React, { } from 'react'
import AuthorCaredHeader from './AuthorCaredHeader'
import AuthorEducationAndProfession from './AuthorEducationAndProfession'
import AuthorSkillsAndHobbies from './AuthorSkillsAndHobbies'
import AuthorExperience from './AuthorExperience'
import AuthorSocial from './AuthorSocial'
import { useAuthor } from '../../Provider/AuthorProvider'
import NoAuthorIdFallbackUI from '../NoAuthorIdFallbackUI'
import LoadingComponent from '../Loading'
import UpdateAuthorExperienceCard from './UpdateAuthorExperienceCard'
import AUthorLanguge from './AUthorLanguge'

import AuthorSubscribeButton from '../AuthorSubscribeButton'
type AuthCardType = {
    isEditable?: boolean,
    isAuthorMode?:boolean

}
const AuthorCard = ({ isEditable = false,isAuthorMode=true }: AuthCardType) => {
    const { authorWithBlogs, setIsUpdate, isUpdate, loading, dispatch, updateAuthor, author } = useAuthor()
    if (loading) return <LoadingComponent message='Loading Author' />
    const blogAuthor = authorWithBlogs === null ? author : authorWithBlogs.author
    if (!blogAuthor) return <NoAuthorIdFallbackUI />
    const { details, name, profile } = blogAuthor

    const handleUpdateClick = () => {
        setIsUpdate(true);
        const normalizedAuthor = {
            author_id: blogAuthor.author_id || blogAuthor._id || "",
            name: blogAuthor.name || "",
            profile: blogAuthor.profile || "",
            email: blogAuthor.email || "",
            details: {
                username: blogAuthor.details?.username || "",

                bio: blogAuthor.details?.bio || "",
                location: blogAuthor.details?.location || "",
                education: blogAuthor.details?.education || "",
                profession: blogAuthor.details?.profession || "",
                website: blogAuthor.details?.website || "",
                social: blogAuthor.details?.social || {},
                experience: blogAuthor.details?.experience || [],
                skills: blogAuthor.details?.skills || [],
                hobbies: blogAuthor.details?.hobbies || [],
                languages: blogAuthor.details?.languages || [],
            }
        };
        dispatch({ type: "RESET", payload: normalizedAuthor });


    }
    const handleSaveClick = () => {
        updateAuthor()
    }

    return (

        <div className="max-w-7xl mx-auto p-5 sm:px-6 lg:px-8 bg-gray-200  dark:bg-gray-800 rounded shadow-md space-y-6 text-black dark:text-white">
            <AuthorCaredHeader
                name={name}
                profile={profile}
                joined={details?.joined}
                bio={details?.bio}
                location={details?.location}
                username={details?.username}
            />

            <AuthorEducationAndProfession
                education={details?.education}
                profession={details?.profession}
            />
            {
                isUpdate ? <UpdateAuthorExperienceCard /> : <AuthorExperience experience={details?.experience} />
            }


            <AuthorSkillsAndHobbies skills={details?.skills} hobbies={details?.hobbies} />

            <AUthorLanguge languages={details.languages!} />

            <AuthorSocial
                details={{   // </form>
                    website: blogAuthor.details?.website,
                    email: blogAuthor?.email!,
                    social: blogAuthor.details?.social
                }}
            />
            {
                isEditable && !isUpdate && (
                    <button type='button' onClick={handleUpdateClick} className='bg-blue-700 text-white'>Update</button>
                )

            }
            {
                isEditable && isUpdate && (
                    <button type='button' className='bg-blue-700 text-white' onClick={handleSaveClick}>Save</button>
                )
            }
            {
                !isAuthorMode && <AuthorSubscribeButton 
                author_id={author?._id||blogAuthor._id} 
               
                />
            }
        </div>

    
    )
}

export default AuthorCard
