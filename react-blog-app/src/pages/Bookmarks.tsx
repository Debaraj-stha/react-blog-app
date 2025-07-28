import React, { useEffect, useState } from 'react';
import Bookmark from '../helper/bookmarkedBlogHelper';
import PostCard from '../components/PostCard';
import CardWrapper from '../components/CardWrapper';
import { useAuth } from '../Provider/AuthProvider';
import type { BlogType } from '../types/blog';

const Bookmarks = () => {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState<BlogType[]>([]);
  // Load bookmarks whenever user changes
  useEffect(() => {
    const userId = user?.user_id || "guest";
    const loaded = Bookmark.loadFromLocalStorage(userId).getAll();
    setBookmarks(loaded);
  }, [user?.user_id]); //call on user change

  const refreshBookmarks = () => {
    const userId = user?.user_id || "guest";
    const updated = Bookmark.loadFromLocalStorage(userId).getAll();
    setBookmarks(updated);
  };

  return (
    <CardWrapper>
      <h1 className="my-5 text-gray-800 dark:text-gray-200 font-semibold text-lg">Bookmarks</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {bookmarks.length > 0 ? (
          bookmarks.map((bookmark) => (
            <PostCard
              key={bookmark._id}
              post={bookmark}
              isCardDisplay={true}
              onBookmarkChange={refreshBookmarks}
            />
          ))
        ) : (
          <p className="text-gray-700 dark:text-gray-300 col-span-full text-center">
            No bookmarks yet.
          </p>
        )}
      </div>
    </CardWrapper>
  );
};

export default Bookmarks;
