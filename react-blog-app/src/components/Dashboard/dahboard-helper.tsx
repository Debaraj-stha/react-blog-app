  import { BsActivity } from 'react-icons/bs'
import { FaPen, FaCommentDots, FaHeart, FaUserPlus } from 'react-icons/fa'
import { MdFeedback, MdSchedule, MdCreate, MdDelete, MdMessage, MdPublish } from 'react-icons/md'
  const getIcon = (activityType: string) => {
    switch (activityType) {
      case 'BLOG_EDITED':
        return <FaPen className="text-blue-500 text-lg mt-1" />
      case 'BLOG_PUBLISHED':
        return <MdPublish className="text-green-500 text-lg mt-1" />
      case 'NEW_COMMENT':
        return <FaCommentDots className="text-purple-500 text-lg mt-1" />
      case 'NEW_LIKE':
        return <FaHeart className="text-pink-500 text-lg mt-1" />
      case 'NEW_SUBSCRIBER':
        return <FaUserPlus className="text-teal-500 text-lg mt-1" />
      case 'NEW_FEEDBACK':
        return <MdFeedback className="text-indigo-500 text-lg mt-1" />
      case 'BLOG_SCHEDULED':
        return <MdSchedule className="text-yellow-600 text-lg mt-1" />
      case 'BLOG_CREATED':
        return <MdCreate className="text-cyan-600 text-lg mt-1" />
      case 'BLOG_DELETED':
        return <MdDelete className="text-red-500 text-lg mt-1" />
      case 'NEW_MESSAGE':
        return <MdMessage className="text-orange-500 text-lg mt-1" />
      default:
        return <BsActivity className="text-gray-500 text-lg mt-1" />
    }
  }
  export default getIcon