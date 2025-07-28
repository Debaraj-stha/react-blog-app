import React from 'react'

import DashboardSectionWrapper from './DashboardSectionWrapper'
import { useAuthor } from '../../Provider/AuthorProvider'
import getIcon from './dahboard-helper'
import { BsActivity } from 'react-icons/bs'

const RecentActivity = () => {
  const { recentActivities } = useAuthor()


  return (
    <DashboardSectionWrapper sectionHeader=' Recent Activity' Icon={BsActivity} iconBG="text-red-500">
      <ul className="mt-2 space-y-3">
        {recentActivities?.map((activity, index) => {
          const Icon = getIcon(activity.type)
          return (
            <li key={index} className="flex items-start gap-3 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg shadow-sm">
              <span>{Icon}</span>
              <div>
                <p
                  className="text-sm text-gray-700 dark:text-gray-300"
                  dangerouslySetInnerHTML={{ __html: activity.message }}
                />

                <span className="text-xs text-gray-500">{new Date(activity.createdAt).toLocaleString()}</span>
              </div>
            </li>
          )
        })}
      </ul>
    </DashboardSectionWrapper>
  )
}

export default RecentActivity
