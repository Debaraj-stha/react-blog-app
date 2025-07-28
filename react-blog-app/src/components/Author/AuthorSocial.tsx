import React, { memo } from 'react'
import {
    FaGithub,
    FaLinkedin,
    FaTwitter,
    FaInstagram,
    FaGlobe,
    FaEnvelope
} from 'react-icons/fa'
import { useAuthor } from '../../Provider/AuthorProvider'

import SocialUpdateCard from './SocialUpdateCard'

type SocialType = {
    github?: string
    linkedin?: string
    twitter?: string
    instagram?: string
}

type AuthorSocialProps = {
    details?: {
        social?: SocialType
        website?: string
        email?: string
    }
}

const AuthorSocial = memo(({ details }: AuthorSocialProps) => {
    // if (!details?.social && !details?.website && !details?.email) return null
    const { isUpdate, dispatch, state } = useAuthor()

    return (
        <div>
            <h2 className="text-lg font-semibold mb-2">🔗 Contact & Social</h2>
            <div className="flex flex-wrap gap-4 text-xl text-gray-700">
                {
                    isUpdate ?
                        (
                           <SocialUpdateCard/>
                        ) :
                        details?.social?.github && (
                            <a href={details.social.github} target="_blank" rel="noreferrer">
                                <FaGithub />
                            </a>
                        )}
                {details?.social?.linkedin && (
                    <a href={details.social.linkedin} target="_blank" rel="noreferrer">
                        <FaLinkedin />
                    </a>
                )}
                {details?.social?.twitter && (
                    <a href={details.social.twitter} target="_blank" rel="noreferrer">
                        <FaTwitter />
                    </a>
                )}
                {details?.social?.instagram && (
                    <a href={details.social.instagram} target="_blank" rel="noreferrer">
                        <FaInstagram />
                    </a>
                )}
                {details?.website && (
                    <a href={details.website} target="_blank" rel="noreferrer">
                        <FaGlobe />
                    </a>
                )}
                {details?.email && (
                    <a href={`mailto:${details.email}`} target="_blank" rel="noreferrer">
                        <FaEnvelope />
                    </a>
                )}

            </div>
        </div>
    )
})

export default AuthorSocial
