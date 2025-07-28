import React from 'react'
import { useAuthor } from '../Provider/AuthorProvider'

const LoadMoreButton = ({ author_id ,limit}: { author_id: string ,limit?:number}) => {
    const { hasMore, loadingMore, loading, loadMore } = useAuthor()
    return (
        <>
            {hasMore && (
                <div className="text-center mt-8">
                    <button
                        onClick={() => loadMore(author_id,limit!)}
                        disabled={loadingMore || loading}
                        className='mt-6 px-4 py-2 text-white dark:bg-amber-600 bg-blue-500 dark:text-gray-200 rounded dark:hover:bg-amber-700 hover:bg-blue-600 transition-all'
                    >
                        {loadingMore ? 'Loading More...' : 'Load More'}
                    </button>
                </div>
            )}
        </>
    )
}

export default LoadMoreButton
