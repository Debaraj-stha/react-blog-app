import React, { useState } from 'react'
import ItemPerPageSelectBox from './ItemPerPageSelectBox'
import CategorySelectBox from './CategorySelectBox'
import SearchBox from './SearchBox'
import SortBySelectBox from './SortBySelectBox'
import { BsChevronDown } from 'react-icons/bs'
import FilterByTags from './FilterByTags'


const BlogHeader = () => {
    const [showMoreFilters, setShowMoreFilters] = useState(false)
    return (
        <div className="max-w-7xl mx-auto my-12 px-4 py-6 bg-gray-900 rounded-lg shadow-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

                {/* Search Input – spans 2 cols on large screens */}
                <SearchBox />
                {/* Category Filter */}
                <CategorySelectBox />
                 <ItemPerPageSelectBox />
                {
                    showMoreFilters && <SortBySelectBox />
                }

            </div>
            {showMoreFilters && <FilterByTags />}
            {/* toggle/collapse button  */}
            <div className='flex flex-row '>
                <div className='flex items-center my-3'>
                    <span className='text-sm sm:text-md text-gray-300'>Show {showMoreFilters ? 'Less' :'More'}</span>
                    <button className=" bg-gray-800 text-white px-4 mx-3 py-2 rounded-md" onClick={() => setShowMoreFilters((prev) => !prev)}>
                        <BsChevronDown className={`text-blue-400   ${showMoreFilters ? 'rotate-180 text-gray-300 ':''}`} size={20}/>
                    </button>

                </div>
            </div>

        </div>
    )
}

export default BlogHeader
