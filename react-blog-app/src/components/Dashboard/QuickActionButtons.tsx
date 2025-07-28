import React from 'react'
import LogoutButton from '../LogoutButton'
import DashboardSectionWrapper from './DashboardSectionWrapper';

import { GiQuickSlash } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import { useAuthor } from '../../Provider/AuthorProvider';
type CreateButtonType = {
  text: string;
  extraClass?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
};

const CreateButton = ({ text, extraClass = "", onClick }: CreateButtonType) => {
  return (
    <button
      onClick={onClick}
      className={`text-white bg-blue-600 px-4 py-2 rounded-md hover:rounded-full transition-all duration-300 ease-in-out hover:ring-2 hover:ring-blue-400 ${extraClass}`}
    >
      {text}
    </button>
  );
};


const QuickActionButtons = () => {
  const navigate = useNavigate()
  const { setIsUpdate, authorWithBlogs, dispatch, setProfileEditable } = useAuthor()
  const handleEditClick = () => {
    setIsUpdate(true)
    setProfileEditable(true)
    dispatch({ type: "RESET", payload: authorWithBlogs?.author! })
  }
  return (
    <DashboardSectionWrapper sectionHeader='Quick Actions' Icon={GiQuickSlash} iconBG='text-orange-500'>
      {/* <GiQuickSlash */}
      <div className='flex gap-4 sm:gap-9 flex-wrap'>
        <CreateButton text='Edit Profile' extraClass='bg-green-500  hover:ring-green-600 hover:bg-green-600' onClick={handleEditClick} />
        <CreateButton text='Crete New Blog' extraClass='bg-blue-500 hover:ring-blue-600 hover:bg-blue-600' onClick={() => navigate("/create-post")} />
        <LogoutButton />
        <CreateButton text='Setting' extraClass='bg-gray-500 hover:ring-gray-600 hover:bg-gray-600' />
      </div>
    </DashboardSectionWrapper>

  )
}

export default QuickActionButtons
