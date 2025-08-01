
import { useBlogContext } from '../Provider/BlogProvider'

import FeedbackCard from './FeedbackCard'
import { usePagination } from '../Provider/PaginationProvider'

const Feedback = () => {
  const { loading,feedbacks} = useBlogContext()
  const {  paginationButton } = usePagination()



  return (
    <>
      <h1 className='my-5 font-bold text-2xl text-gray-100  dark:text-gray-300 '>Feedback</h1>
      {
        loading && <div className='text-center text-gray-500'>Loading feedbacks...</div>
      }
      {
        feedbacks.length > 0 ?
          <div>
            {feedbacks.map((feedback, index) => (
              <FeedbackCard
                key={index}

                message={feedback.message}
                name={feedback.name}
                profile={feedback.profile}
                createdAt={feedback.createdAt}
                email={feedback.email} blog_id={''}
              />
            ))}
            {paginationButton}
          </div>
          :
          <div>
            <h1 className='text-2xl font-bold'>No feedbacks yet</h1>
          </div>
      }
    </>
  )
}

export default Feedback
