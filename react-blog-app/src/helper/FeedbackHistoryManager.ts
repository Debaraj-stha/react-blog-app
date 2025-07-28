import type { BlogType } from "../types/blog";

const STORAGE_KEY_PREFIX = "feedback-history";

class FeedbackHistoryManager {
  private feedbackBlogs: BlogType[] = [];
  private storageKey: string;
  
  constructor(userId: string="guest", initialBlogs: BlogType[] = []) {
    this.storageKey = `${STORAGE_KEY_PREFIX}-${userId}`;
    this.feedbackBlogs = initialBlogs;
  }

  add(blog: BlogType) {
    if (!this.feedbackBlogs.some(b => b._id === blog._id)) {
      this.feedbackBlogs.push(blog);
      this.saveToLocalStorage();
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.feedbackBlogs));
  }

  getAll(): BlogType[] {
    return [...this.feedbackBlogs];
  }

  static loadLocalStorage(userId: string="guest"): FeedbackHistoryManager {
    const storageKey = `${STORAGE_KEY_PREFIX}-${userId}`;
    try {
      const data = localStorage.getItem(storageKey);
      const parsedData = data ? JSON.parse(data) as BlogType[] : [];
      return new FeedbackHistoryManager(userId, parsedData);
    } catch (e) {
      console.error("Error loading feedback history", e);
      return new FeedbackHistoryManager(userId);
    }
  }
}

export default FeedbackHistoryManager