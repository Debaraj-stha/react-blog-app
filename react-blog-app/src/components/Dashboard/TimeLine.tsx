import React from 'react';
import { useAuthor } from '../../Provider/AuthorProvider';
import getIcon from './dahboard-helper';
import DashboardSectionWrapper from './DashboardSectionWrapper';
import { GrAction } from 'react-icons/gr';


const TimeLine = () => {
  const { recentActivities } = useAuthor()
  return (
    <DashboardSectionWrapper sectionHeader='Your Activity Timeline' Icon={GrAction}>
      <div className="space-y-6 border-l-2 border-blue-500 pl-4">
        {recentActivities?.map((event, index) => (
          <div key={index} className="relative pl-6">
            <div className="absolute left-[-10px] top-1 text-blue-600">
              {getIcon(event.type)}
            </div>
            <p className="text-sm text-gray-400">{new Date(event.createdAt).toDateString()}</p>
            <h3 className="font-semibold text-gray-800 dark:text-white">{event.type}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: event.message }}></p>
          </div>
        ))}
      </div>
    </DashboardSectionWrapper>
  );
};

export default TimeLine;
