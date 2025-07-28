import React from 'react'
import { Link } from 'react-router-dom';
import { blogCategories } from '../static/blog-categories';


const CategoriesLink = () => {
  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Browse by Categories</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {blogCategories.map((cat) => (
            <Link
              key={cat.label}
              to={`/blogs?category=${encodeURIComponent(cat.label)}`}
              className="bg-white border border-gray-300 px-6 py-3 rounded shadow hover:bg-blue-50 transition  hover:animate-pulse"
            >
              <span className='mr-3'>{cat.icon}</span>
              {cat.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoriesLink
