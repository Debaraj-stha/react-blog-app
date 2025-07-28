import React, { memo } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import type { BlogType } from '../types/blog';

import BlogImage from './BlogImage';
import { Link, useNavigate } from 'react-router-dom';
import AuthorActionButtons from './AuthorActionButtons';
import BlogCardActionButtons from './BlogCardActionButtons';
import { BiEdit } from 'react-icons/bi';

type PostCardType = {
  post: BlogType,
  isCardDisplay?: boolean,
  isEditable?: boolean,
  isEditorMode?: boolean,
  onBookmarkChange?: () => void

}
const PostCard = memo(({ post, isCardDisplay = true, isEditable = false, isEditorMode = false, onBookmarkChange }: PostCardType) => {
  const { _id: id, content, createdAt, readerCount } = post;
  const navigate = useNavigate();
  const rawTitle = post.title;
  const title =
    isCardDisplay && rawTitle.length > 50
      ? `${rawTitle.slice(0, 50)}...`
      : rawTitle;

  let firstParagraph = content![0]?.children?.[0]?.text || "";
  firstParagraph =
    isCardDisplay && firstParagraph.length > 70
      ? `${firstParagraph.slice(0, 70)}...`
      : firstParagraph;





  return (
    <div className="overflow-hidden relative">
      <div className={`z-10   bg-white rounded shadow-lg 
      hover:shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 h-full`}>

        {/* Show blog image if one exists */}
        <BlogImage content={content!} />

        <div className="p-4">
          {
            // for editor assigned by author
            isEditorMode ?
              <Link to={`/author/blog/${id}/edit`} state={{ from: "eligible" }}>
                <h2 className="text-xl font-semibold text-blue-600 hover:underline hover:animate-pulse">
                  {title}
                </h2>
              </Link>
              :
              <Link to={`/blogs/${post._id}`}>
                <h2 className="text-xl font-semibold text-blue-600 hover:underline hover:animate-pulse">
                  {title}
                </h2>
              </Link>
          }
          <p className='text-black'>
            {firstParagraph}
          </p>
         <div className='flex items-center justify-between'>
           {
            isEditable && <p className='text-black my-4 text-sm font-medium'>Reader Count:{readerCount}</p>
          }
          <p className="text-black font-medium text-sm my-3">{new Date(createdAt!).toDateString()}</p>
         </div>
          <div className="flex justify-between items-center ">
            {isEditable ? (
              <AuthorActionButtons id={id} />
            ) :
              isEditorMode ?
                <button
                  onClick={() => navigate(`/author/blog/${id}/edit`)}
                  className="hover:animate-pulse text-blue-600 hover:underline flex items-center gap-3 transition-colors duration-300 group-hover:text-blue-800"
                >
                  Edit<BiEdit className="transition-transform duration-300 group-hover:translate-x-1 hover:animate-pulse" />
                </button>
                :
                (
                  <>
                    <button
                      onClick={() => navigate(`${id}`)}
                      className="hover:animate-pulse text-blue-600 hover:underline flex items-center gap-3
                     transition-colors duration-300 group-hover:text-blue-800 group"
                    >
                      Read More <BsArrowRight className="transition-transform duration-300 group-hover:-translate-x-1" />
                    </button>
                    <BlogCardActionButtons post={post} onBookmarkChange={onBookmarkChange} />
                  </>
                )
            }


          </div>


        </div>
      </div>
    </div>
  );
});

export default PostCard;
