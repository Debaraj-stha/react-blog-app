import React from 'react'
import PostCard from './PostCard'
import type { BlogType } from '../types/blog'
import { Link } from 'react-router-dom'
/**
 * Render the posts
 * @param posts - array of posts to render
 * @returns 
 */
type RenderPostsProps = {
  posts: BlogType[],
  isCardDisplay?: boolean,
  isEditable?: boolean
}
const RenderPosts = React.memo(({ posts, isCardDisplay = false, isEditable = false }: RenderPostsProps) => {


  return (
    <>
      {posts.map((post,index:number) => {
        if (isEditable) {
           return  <PostCard key={`${post._id} -${index}` } post={post} isCardDisplay={isCardDisplay} isEditable={isEditable} />
        }
        else if (isCardDisplay) {
          return <div key={`${post._id} -${index}`}>
            <PostCard post={post} isCardDisplay={isCardDisplay} isEditable={isEditable}/>
          </div>
        }
        else {
          return <PostCard key={`${post._id} -${index}`} post={post} isCardDisplay={isCardDisplay} />
        }

      })}
    </>
  )
})

export default RenderPosts
