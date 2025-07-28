import React from 'react'

const NoAuthorIdFallbackUI = () => {
    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-100 text-gray-700 rounded shadow text-center">
            <h2 className="text-2xl font-semibold mb-2">Invalid Author</h2>
            <p className="text-base">No author ID was provided in the URL.</p>
        </div>
    )
}

export default NoAuthorIdFallbackUI
