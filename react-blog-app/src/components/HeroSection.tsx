import React from 'react'
import { Link } from 'react-router-dom'

const HeroSection = () => {
  return (
     <section className="bg-blue-600 dark:bg-blue-800 text-white text-center py-16">
        <h1 className="text-4xl font-bold mb-4">Welcome to React Blog</h1>
        <p className="max-w-2xl mx-auto text-lg">
          Thoughts on tech, lifestyle, business, and more.
        </p>
        <Link
          to="/blogs"
          className="inline-block mt-6 bg-white text-blue-600 dark:text-blue-800 px-6 py-2 rounded shadow hover:bg-gray-100 transition"
        >
          Browse Posts
        </Link>
      </section>
  )
}

export default HeroSection
