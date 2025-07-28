import React from 'react'
import { useBlogContext } from '../../Provider/BlogProvider'
import { blogCategories } from '../../static/blog-categories'

const CategorySelectBox = () => {
  const { filterBlogsBy, selectedSctegory, setSelectedCategory

  }
    = useBlogContext()
  return (
    <select
      name="categories"
      className="w-full text-white px-4 py-2 bg-gray-800 rounded-md border-none outline-none focus:ring-0 focus:outline-none focus:border-none"
     value={selectedSctegory}
      onChange={(e) => {
        setSelectedCategory(e.target.value)
        filterBlogsBy({ value: e.target.value })
      }}
    >
      <option value="" disabled>Filter Blog By Categories</option>
      {
        blogCategories.map((category, index) => (
          <option key={`${category.label}-${index}`} value={category.label.toLocaleLowerCase()}>{category.label}</option>
        ))
      }
    </select>

  )
}

export default CategorySelectBox
