import React from 'react'
import { useBlogContext } from '../../Provider/BlogProvider'



const SearchBox = () => {
  const { setSearchQuery, searchQuery,submitQuery } = useBlogContext()
  return (
      <input
        value={searchQuery}
        onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>)=>submitQuery(e)}
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        placeholder="Search Blog Here..."
        className="col-span-1 md:col-span-2 w-full bg-gray-800 text-white px-4 py-2 rounded-md  border-none outline-none focus:ring-0 focus:outline-none transition"
      />
      

  )
}

export default SearchBox

