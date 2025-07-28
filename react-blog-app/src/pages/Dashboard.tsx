
import DashboardBlogs from '../components/Dashboard/DashboardBlogs'
import AuthorCard from '../components/Author/AuthorCard'
import BlogStatistics from '../components/Dashboard/BlogStatistics'
import QuickActionButtons from '../components/Dashboard/QuickActionButtons'
import Hr from '../components/Dashboard/Hr'
import RecentActivity from '../components/Dashboard/RecentActivity'
import Subscriber from '../components/Dashboard/Subscriber'
import ScheduledPost from '../components/Dashboard/ScheduledPost'
import TopPerformingBlogs from '../components/Dashboard/TopPerformingBlogs'
import DraftBlogs from '../components/Dashboard/DraftBlogs'
import FeedbackReceived from '../components/Dashboard/FeedbackReceived'
import { PaginationProvider } from '../Provider/PaginationProvider'
import { useAuthor } from '../Provider/AuthorProvider'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import LoadingComponent from '../components/Loading'
import TimeLine from '../components/Dashboard/TimeLine'

const Dashboard = () => {
  const { loadDashboardData, loading,profileEditable } = useAuthor()
  const { author_id } = useParams()
  useEffect(() => {
    if (author_id) {
      loadDashboardData(author_id)
    }
  }, [author_id])

  return (
    <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto sm:my-6 md:my-8 lg:my-12">
      {
        loading ? <LoadingComponent /> :
          (
            <>
              <AuthorCard isEditable={profileEditable} />
              <Hr />
              <QuickActionButtons />
              <Hr />
              <BlogStatistics />
              <Hr />
              <RecentActivity />
              <Hr />
              <TimeLine/>
              <Hr/>
              <Subscriber />
              <Hr />
              <ScheduledPost />
              <Hr />
              <DraftBlogs />
              <Hr />
              <TopPerformingBlogs />
              <Hr />
              <PaginationProvider>
                <FeedbackReceived />
              </PaginationProvider>
              <Hr />
              <DashboardBlogs />
        
            </>
          )
      }

    </div>
  )
}

export default Dashboard
