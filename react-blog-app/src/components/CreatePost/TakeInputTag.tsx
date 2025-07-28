import React, { useState } from 'react'
import { useCreateContext } from '../../Provider/CreatePostProvider';

const TakeInputTag =React.memo(() => {
    const [inputValue, setInputValue] = useState("");
    const { setSelectedTags } = useCreateContext()
    const addTag = () => {
        const newTag = inputValue.trim();
        if (newTag) {
            setSelectedTags((prev) => prev.includes(newTag) ? prev.filter((t) => t != newTag) : [...prev, newTag])
        }
        setInputValue("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addTag();
        }
    };
    return (
        <div className="flex items-center gap-2 mb-6">
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a tag and press Enter"
                className="flex-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white outline-0"
            />
            <button
                onClick={addTag}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
                Add
            </button>
        </div>
    )
})

export default TakeInputTag
