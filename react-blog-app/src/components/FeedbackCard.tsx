import React, { memo } from 'react'
import type { FeedbackType } from '../types/feedbackType'
import { stringToColor } from '../helper/randomColorGenerator'

const FeedbackCard = memo(({ message, name, profile, createdAt, email }: FeedbackType) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow p-4 mb-4 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-4 mb-2">
        {
          profile != null ?
            <img
              src={profile}
              alt={name}
              className="w-12 h-12 rounded-full object-cover"
            />
            : <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-2xl"
            style={{ backgroundColor: stringToColor(name) }}
            >
              <span className="text-white text-4xl font-bold">{name
                .split(" ")
                .map((word) => word[0])
                .join("")
                .toUpperCase()}</span>
            </div>
        }

        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{email}</p>
        </div>
      </div>
      <p className="text-gray-700 dark:text-gray-300 mb-2">{message}</p>
      <p className="text-right text-xs text-gray-400">{new Date(createdAt).toLocaleString()}</p>
    </div>
  )
})

export default FeedbackCard
