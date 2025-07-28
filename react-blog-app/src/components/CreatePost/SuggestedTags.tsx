import React from 'react'
import { useCreateContext } from '../../Provider/CreatePostProvider'

const SuggestedTags = React.memo(() => {
    const { setSelectedTags } = useCreateContext()

    const suggestedTags = ["React", "JavaScript", "UI", "Tailwind", "Design", "Node", "AI", "CSS", 'LifeStyle', 'Blogging'];


    return (

        <>
            {/* Suggested Tags */}
            < div className="mb-6" >
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Suggested:</p>
                <div className="flex flex-wrap gap-2">
                    {suggestedTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => {
                                setSelectedTags((prev) =>
                                    prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
                                )
                            }}
                            className="px-3 py-1 border text-sm rounded-full hover:bg-blue-100 dark:hover:bg-blue-700 dark:text-white dark:border-gray-600"
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div >
        </>
    )

})

export default SuggestedTags
