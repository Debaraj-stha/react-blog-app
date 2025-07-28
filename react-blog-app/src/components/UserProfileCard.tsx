import React from 'react'
import LogoutButton from './LogoutButton'
import IconNavLink from './IconNavLink'
import {
    BiSolidDashboard,
    BiUser,
    BiBook,
    BiBookmark,
    BiCommentDetail,
    BiCog,
    BiEditAlt
} from 'react-icons/bi'
import { useAuth } from '../Provider/AuthProvider'

const UserProfileCard = () => {
    const { user } = useAuth()
    return (
        <div className="absolute top-full mt-2 bg-white shadow-md rounded-md py-2 pl-2 w-60 -left-15">
            {/* only for login user and author */}
            {
                user && user.author_id && (
                    <>
                        <IconNavLink text="Profile" link={`/author/profile/${user?.author_id}`} Icon={BiUser} padding='0' hoverBg='white' />
                        <IconNavLink text="Dashboard" link={`/author/${user.author_id}/dashboard/`} Icon={BiSolidDashboard} />
                        <IconNavLink text="My Blogs" link={`/author/blogs/${user.author_id}`} Icon={BiBook}  />
                    </>
                )
            }
            {
                user && <IconNavLink text="Edit Blogs" link={`author/blog/${user?.user_id}/eligible/edit/`} Icon={BiEditAlt}  />
            }
            <IconNavLink text="Feedback History" link={`/user/feedbacks-history/`} Icon={BiCommentDetail} />
            <IconNavLink text="Bookmarks" link={`/user/bookmarks/`} Icon={BiBookmark} />
            <IconNavLink text="Settings" link="/settings" Icon={BiCog} />
            {
                user && <LogoutButton />
            }
        </div>
    )
}

export default UserProfileCard
