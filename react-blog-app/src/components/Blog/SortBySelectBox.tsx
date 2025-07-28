import React from 'react'
import { useBlogContext } from '../../Provider/BlogProvider'

const SortBySelectBox = () => {
  const { filterBlogsBy } = useBlogContext();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    // Determine sort field and order based on value
    if (value === "asc" || value === "desc") {
      filterBlogsBy({
        isSort: true,
        sortField: "createdAt",
        sortOrder: value,
      });
    } else if (value === "popular") {
      filterBlogsBy({
        isSort: true,
        sortField: "view", // example field
        sortOrder: "desc",  // most popular = highest views
      });
    }
  };

  return (
    <select
      name="sortBy"
      className="w-full text-white bg-gray-800 px-4 py-2 rounded-md border-none outline-none focus:ring-0 transition"
      defaultValue=""
      onChange={handleChange}
    >
      <option value="" disabled>Sort By</option>
      <option value="desc">Latest</option>
      <option value="asc">Oldest</option>
      <option value="popular">Most Popular</option>
    </select>
  );
};

export default SortBySelectBox;
