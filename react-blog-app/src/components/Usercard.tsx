import { BsChevronDown } from 'react-icons/bs'
import { useAuth } from '../Provider/AuthProvider'
import { useState } from 'react'
import UserProfileCard from './UserProfileCard'
import NameAvatar from './NameAvatar'

const Usercard = () => {
  const { user } = useAuth()
  const [show, setShow] = useState(false)
  const toggleShow = () => {
    setShow((prev)=>!prev)
    //hide after 4 seconds
    setTimeout(() => {
      setShow(false)
    }, 4000)
  }

  return (
    <div className="flex justify-between items-center gap-2 pt-5 sm:pt-0">
      <div>
        {
          user && (
            user?.image ? <img
            src={`${user?.image}`}
            alt=" profile"
            loading="lazy"
            lang="en"
            className="w-12 h-12 rounded-full object-cover object-center"
          /> :
          <NameAvatar name={user?.email}/>
          )
        }
      </div>

      <div className="relative flex flex-col items-start">
        <div className="flex items-center">
          {
            user?.name? <h2 className="text-sm font-bold text-white ">{user?.name}</h2>
            :
            <h2 className="text-sm font-bold text-white ">{user?.email}</h2>
          }
          <button
            onClick={toggleShow}
            className="ml-2 text-sm 
            text-blue-400 hover:text-blue-600 transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
            hover:scale-105 group
            "
            aria-label="Toggle Submenu"
          >
            <BsChevronDown
              className={`${show ? 'rotate-180' : ''} transition-all duration-300 text-blue-400 group-hover:animate-pulse`}
            />
          </button>
        </div>

        {show && <UserProfileCard />}
      </div>
    </div>
  )
}

export default Usercard
