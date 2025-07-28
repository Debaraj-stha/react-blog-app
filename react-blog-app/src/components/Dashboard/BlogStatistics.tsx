
import StatCard from './StatCard'
import { FcStatistics } from 'react-icons/fc'
import DashboardSectionWrapper from './DashboardSectionWrapper'
import { useAuthor } from '../../Provider/AuthorProvider'
import LoadingComponent from '../Loading'

const BlogStatistics = () => {
  const { dashboardCounts } = useAuthor()
  const totalFeedback = dashboardCounts?.totalFeedbacks
  const totalViews = dashboardCounts?.totalViews
  const engagementRate = totalViews === 0 ? 0 : ((totalFeedback! / totalViews!) / 100).toFixed(2)
  return (
    <DashboardSectionWrapper sectionHeader=' Author Statistics' Icon={FcStatistics} iconBG='text-red-500'>
      <div className='bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md'>
        {
          !dashboardCounts ? <LoadingComponent /> : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <StatCard value={dashboardCounts!.totalBlogs!.toString()} stat='Total Blogs' />
                <StatCard value={dashboardCounts!.totalPublished!.toString()} stat='Published' />
                <StatCard value={dashboardCounts!.totalUnpublished!.toString()} stat='Drafts' />
                <StatCard value={dashboardCounts!.totalViews!.toString()} stat='Total Views' />
                <StatCard value={dashboardCounts!.totalReader!.toString()} stat='Reader Count' />
                <StatCard value={dashboardCounts!.totalFeedbacks!.toString()} stat='Total Comments' />
                <StatCard value={"27"} stat='Total Likes' />
                <StatCard value={dashboardCounts!.scheduledBlosCount!.toString()} stat='Scheduled Posts' />
                <StatCard
                  value={
                    dashboardCounts?.popularBlog?.[0]?.title
                      ? dashboardCounts.popularBlog[0].title.length > 40
                        ? `${dashboardCounts.popularBlog[0].title.slice(0, 20)}...`
                        : dashboardCounts.popularBlog[0].title
                      : "No blog available"
                  }
                  stat={
                    dashboardCounts?.popularBlog?.[0]
                      ? `Most Popular Blog\nTotal views ${dashboardCounts.popularBlog[0].views}`
                      : "No popular blog data"
                  }
                />

                <StatCard value={dashboardCounts!.mostUsedTag!} stat='Most Used Tag' />
                <StatCard value={engagementRate.toString()} stat='Engagement Rate' />
              </div>
            </>
          )
        }
      </div>
    </DashboardSectionWrapper>
  )
}

export default BlogStatistics
