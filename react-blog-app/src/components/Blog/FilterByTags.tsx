import React, { memo, useCallback, useEffect, useState } from 'react';
import { useBlogContext } from '../../Provider/BlogProvider';

type ItemProps = {
  tag: string;
  selected: boolean;
  onClick: () => void;
};

const RenderTagItem = memo(({ tag, selected, onClick }: ItemProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        text-sm sm:text-base px-4 py-1.5 sm:py-2 rounded-full font-medium transition
        border shadow-sm duration-150
        ${selected ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-800 border-gray-300 hover:bg-blue-100 hover:border-blue-400'}
      `}
    >
      {tag}
    </button>
  );
});

const FilterByTags = () => {
  const [viewMore, setViewMore] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const { filterBlogsBy, loadTags, tags, resetBlogs } = useBlogContext()
  const handleClick = useCallback(async (tag: string) => {
    setSelectedTag(prev => {
      const isUnselecting = prev === tag;

      if (isUnselecting) {
        resetBlogs(); // Show all blogs again
      } else {
        filterBlogsBy({ value: tag, field: "tags" }); // Filter by selected tag
      }

      return isUnselecting ? null : tag;
    });
  }, [filterBlogsBy, resetBlogs]);


  useEffect(() => {
    loadTags()
  }, [])

  return (
    <div className="my-6">
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-gray-300 font-semibold">Filter By Tags:</p>

        {(viewMore ? tags! : tags!.slice(0, 6)).map((tag) => (
          <RenderTagItem
            key={tag}
            tag={tag}
            selected={selectedTag === tag}
            onClick={() => handleClick(tag)}
          />
        ))}

        {tags!.length > 6 && (
          <button
            onClick={() => setViewMore(prev => !prev)}
            className="text-blue-600 text-sm underline underline-offset-2 hover:text-blue-800 ml-2"
          >
            {viewMore ? 'Show Less' : 'View More'}
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterByTags;
