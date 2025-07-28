import React, { memo, useState } from 'react'
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa'
import { useAuthor } from '../../Provider/AuthorProvider'
import EditableInputField from './EditableInputField'
import { BiCamera } from 'react-icons/bi'
import NameAvatar from '../NameAvatar'
import mockAuthor from '../../static/author'

type AuthorCardHeaderProps = {
    name: string,
    profile?: string,
    bio?: string,
    username?: string,
    joined?: string,
    location?: string
}
export const    profileHolder="http://www.arcticcoolingservices.com/wp-content/uploads/2018/02/profile-holder.jpg"
const AuthorCardHeader = memo(({ name, profile, location, username, joined, bio }: AuthorCardHeaderProps) => {
    const { isUpdate, state, dispatch, handleFileUpload } = useAuthor()
  

    return (
        <div className="flex flex-col sm:flex-row items-center gap-6">
            {
                isUpdate ? (
                    <div className='relative w-32 h-32'>
                        <img src={state.profile || profileHolder} alt={name} className="w-32 h-32 rounded-full object-cover shadow" />
                        <label htmlFor='profile' className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full cursor-pointer">
                            <BiCamera />
                        </label>
                        <input type='file' id='profile' name='profile' className='hidden' accept='image/*' onChange={handleFileUpload} />

                    </div>
                ) :
                    <img src={profile||profileHolder} alt={name || "Profile image"} className="w-32 h-32 rounded-full object-cover shadow" />


            }


            <div className="text-center sm:text-left">
                {isUpdate ? (
                    <EditableInputField
                        extraClass="text-3xl font-bold  text-gray-600 dark:text-gray-100  "
                        value={state.name || ""}
                        placeholder={`${mockAuthor.name}`}
                        onChange={(e) => dispatch({
                            type: "UPDATE_NAME"
                            , payload: e.target.value
                        })}
                    />

                ) : (
                    <h1 className="text-3xl font-bold">{name}</h1>
                )}

                {isUpdate ? (
                    <p><EditableInputField
                        extraClass="text-gray-500 dark:text-gray-100"
                        placeholder={`${mockAuthor.username}`}
                        value={state.details.username || ''}
                        onChange={(e) => dispatch({
                            type: "UPDATE_DETAILS_USERNAME"
                            , payload: e.target.value
                        })}
                    />
                    </p>
                ) : (
                    username && <p className="text-gray-500 dark:text-gray-100">@{username}</p>
                )}

                {isUpdate ? (
                    <textarea
                        className="mt-2 text-gray-700 dark:text-gray-100 focus:outline-none rounded p-1 w-full"
                        value={state.details.bio || ''}
                        placeholder={`${mockAuthor.bio}`}
                        onChange={(e) => dispatch({
                            type: "UPDATE_DETAILS_BIO"
                            , payload: e.target.value
                        })}
                    />
                ) : (
                    bio && <p className="mt-2 text-gray-700 dark:text-gray-100">{bio}</p>
                )}

                <div className="flex items-center text-sm text-gray-600 dark:text-gray-100 gap-2 mt-2">
                    {isUpdate ? (
                        <>
                            <FaMapMarkerAlt />
                            <EditableInputField
                                value={state.details.location || ''}
                                placeholder={`${mockAuthor.location}`}
                                onChange={(e) => dispatch({
                                    type: "UPDATE_DETAILS_LOCATION"
                                    , payload: e.target.value
                                })}
                            />
                        </>
                    ) : (
                        location && <>
                            <FaMapMarkerAlt /> {location}
                        </>
                    )}
                    {joined && (
                        <>
                            <FaCalendarAlt className="ml-4" /> Joined {new Date(joined).toLocaleDateString()}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
})

export default AuthorCardHeader
