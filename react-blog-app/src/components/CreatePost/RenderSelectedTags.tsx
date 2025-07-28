import React, { memo } from 'react'
import { useCreateContext } from '../../Provider/CreatePostProvider'
import { CgClose } from 'react-icons/cg';

const RenderSelectedTags =memo(() => {
    const { selectedTags,setSelectedTags } = useCreateContext()
    const removeTag = (tag: string) => {
        setSelectedTags((prev) => prev.filter((t) => t !== tag))
    };
    return (
        <div className="flex flex-wrap gap-2 mb-4">
            {selectedTags.map((tag) => (
                <span
                    key={tag}
                    className="flex items-center bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-white px-3 py-1 font-medium rounded-full text-sm"
                >
                    {tag}
                    <button onClick={() => removeTag(tag)} className="ml-2 text-red-500 hover:text-red-700">
                        <CgClose />
                    </button>
                </span>
            ))}
        </div>
    )
})

export default RenderSelectedTags
