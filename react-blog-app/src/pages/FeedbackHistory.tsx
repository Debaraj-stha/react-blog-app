import React, { useEffect, useState } from 'react';

import CardWrapper from '../components/CardWrapper';
import PostCard from '../components/PostCard';
import type { BlogType } from '../types/blog';
import FeedbackHistoryManager from '../helper/FeedbackHistoryManager';
import { useAuth } from '../Provider/AuthProvider';

const FeedbackHistory = () => {
  const[feedbacksHistory,setFeedbackHistory]=useState<BlogType[]>([])
  const{user}=useAuth()
  useEffect(()=>{
    const userId=user?.user_id||"guest"
    const fetchedFeedback=FeedbackHistoryManager.loadLocalStorage(userId).getAll()
    setFeedbackHistory(fetchedFeedback)
  },[user?.user_id])
 
  
  

  return (
    <CardWrapper>
      <h1 className="my-5 text-gray-800 dark:text-gray-200 font-semibold text-lg">
        Feedback History
      </h1>

      {feedbacksHistory.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {feedbacksHistory.map((blog:BlogType) => (
            <PostCard key={blog._id} isCardDisplay={true} post={blog} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400">You haven’t given feedback on any blog yet.</p>
      )}
    </CardWrapper>
  );
};

export default FeedbackHistory;
