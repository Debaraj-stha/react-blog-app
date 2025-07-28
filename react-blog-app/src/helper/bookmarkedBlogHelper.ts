import type { BlogType } from "../types/blog";

const STORAGE_KEY_PREFIX = "bookmarkedBlogs";

class Bookmark {
  private bookmarks: BlogType[] = [];
  private storageKey: string;

  constructor(userId: string = "guest", initialBookmark: BlogType[] = []) {
    this.storageKey = `${STORAGE_KEY_PREFIX}-${userId}`;
    this.bookmarks = initialBookmark;
  }

  add(bookmark: BlogType) {
    if (!this.bookmarks.some(b => b._id === bookmark._id)) {
      this.bookmarks.push(bookmark);
      this.saveToLocalStorage();
    }
  }

  remove(blog_id: string) {
    this.bookmarks = this.bookmarks.filter(b => b._id !== blog_id);
    this.saveToLocalStorage();
  }

  getAll(): BlogType[] {
    return [...this.bookmarks];
  }

  isAlreadyBookmarked(blog_id:string): boolean {
    return this.bookmarks.some(b => b._id === blog_id);
  }

  private saveToLocalStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.bookmarks));
  }

  static loadFromLocalStorage(userId: string = "guest"): Bookmark {
    const storageKey = `${STORAGE_KEY_PREFIX}-${userId}`;
    try {
      const data = localStorage.getItem(storageKey);
      const parsed = data ? JSON.parse(data) as BlogType[] : [];
      return new Bookmark(userId, parsed);
    } catch (e) {
      console.error("Failed to load bookmarks:", e);
      return new Bookmark(userId);
    }
  }
}

export default Bookmark;
