
import type { BlogType } from "../types/blog";
import type { LocalStorageBlogType } from "../types/localStorageBlogType";

const STORAGE_KEY_PREFIX = "saved_blogs_";

class SaveToLocalStorage {
  private blog: LocalStorageBlogType | undefined;
  private key: string;

  constructor(user_id: string, initialBlog?: LocalStorageBlogType) {
    this.key = `${STORAGE_KEY_PREFIX}${user_id}`;
    this.blog=initialBlog
  }

  save(blog: LocalStorageBlogType) {
    this.blog = blog;
    localStorage.setItem(this.key, JSON.stringify(this.blog));
  }

  delete() {
    localStorage.removeItem(this.key);
  }

  get(): LocalStorageBlogType | undefined {
    const raw = localStorage.getItem(this.key);
    return raw ? (JSON.parse(raw) as LocalStorageBlogType) : undefined;
  }

  static getBlog(user_id: string): LocalStorageBlogType | undefined {
    const raw = localStorage.getItem(`${STORAGE_KEY_PREFIX}${user_id}`);
    return raw ? (JSON.parse(raw) as LocalStorageBlogType) : undefined;
  }
}

export default SaveToLocalStorage;
