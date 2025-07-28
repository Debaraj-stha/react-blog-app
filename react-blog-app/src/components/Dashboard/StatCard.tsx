import React from 'react'
type StatCartType = {
    stat: string
    value: string
}
const StatCard = ({ stat, value }: StatCartType) => {
    return (
        <div className="p-4 bg-gray-200 dark:bg-gray-800 rounded shadow">
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{value}</p>
            <p className="text-sm text-gray-500">{stat}</p>
        </div>
    )
}

export default StatCard
