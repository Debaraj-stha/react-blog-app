import React from 'react'
import { useAuthor } from '../../Provider/AuthorProvider'
import EditableInputField from './EditableInputField'
import {
    FaGithub,
    FaLinkedin,
    FaTwitter,
    FaInstagram,
    FaGlobe,
    FaEnvelope
} from 'react-icons/fa'
import mockAuthor from '../../static/author'

const SocialUpdateCard = () => {
    const { dispatch, state } = useAuthor()
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            <div className='flex gap-5 items-center'>
                <FaGithub />
                <EditableInputField
                    extraClass='text-sm'
                    onChange={(e) =>
                        dispatch({
                            type: "UPDATE_DETAILS_SOCIAL",
                            payload: {
                                'github': e.target.value
                            }
                        })
                    }
                    placeholder={`${mockAuthor.social.github}`}
                    value={`${state.details.social?.github || ""}`}

                />
            </div>
            <div className='flex gap-5 items-center'>
                <FaLinkedin />
                <EditableInputField
                    extraClass='text-sm'
                    onChange={(e) =>
                        dispatch({
                            type: "UPDATE_DETAILS_SOCIAL",
                            payload: {
                                'linkedin': e.target.value
                            }
                        })
                    }
                    placeholder={`${mockAuthor.social.linkedin}`}
                    value={`${state.details.social?.linkedin || ""}`}

                />
            </div>
            <div className='flex gap-5 items-center'>
                <FaTwitter />
                <EditableInputField
                    extraClass='text-sm'
                    onChange={(e) =>
                        dispatch({
                            type: "UPDATE_DETAILS_SOCIAL",
                            payload: {
                                'twitter': e.target.value
                            }
                        })
                    }
                    placeholder={`${mockAuthor.social.twitter}`}
                    value={`${state.details.social?.twitter || ""}`}

                />
            </div>
            <div className='flex gap-5 items-center'>
                <FaInstagram />
                <EditableInputField
                    extraClass='text-sm'
                    onChange={(e) =>
                        dispatch({
                            type: "UPDATE_DETAILS_SOCIAL",
                            payload: {
                                'instagram': e.target.value
                            }
                        })
                    }
                    placeholder={`${mockAuthor.social.instagram}`}
                    value={`${state.details.social?.instagram || ""}`}

                />
            </div>
            <div className='flex gap-5 items-center'>
                <FaGlobe />
                <EditableInputField
                    extraClass='text-sm'
                    onChange={(e) =>
                        dispatch({
                            type: "UPDATE_DETAILS_SOCIAL",
                            payload: {
                                'website': e.target.value
                            }
                        })
                    }
                    placeholder={`${mockAuthor.website}`}
                    value={`${state.details.website || ""}`}

                />
            </div>
            <div className='flex gap-5 items-center'>
                <FaEnvelope />
                <EditableInputField

                    onChange={(e) =>
                        dispatch({
                            type: "UPDATE_EMAIL",
                            payload: e.target.value
                        })
                    }
                    placeholder={`${mockAuthor.email}`}
                    extraClass='text-sm'
                    value={`${state.email || ""}`}

                />
            </div>
        </div>
    )
}

export default SocialUpdateCard
