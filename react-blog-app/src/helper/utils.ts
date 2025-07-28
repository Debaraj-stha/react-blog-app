import type { BlogType, ContentNode } from "../types/blog"

export const getQueryParams = (key: string) => {
  const params = new URLSearchParams(window.location.search)
  const value = params.get(key) || "/"
  return value
}

export const removeLocalStorageItem = (key: string) => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    throw error
  }
}

export function contentHasImage(content: ContentNode[]) {
  console.log("checking image", content)
  if (!Array.isArray(content)) return false;

  return content.some(block => {
    // 1) top‐level image node?
    if (block.type === "image") {
      return true;
    }

    // 2) nested image inside children?
    if (Array.isArray(block.children)) {
      return block.children.some((child: any) => child.type === "image");
    }

    return false;
  });
}
type Block = {
  type?: string;
  children?: Block[];
  [key: string]: any;//this object can have additional keys (of type string), and their values can be anything (any)."
};

export const findFirstImageBlock = (nodes: Block[]): Block | undefined => {
  for (const block of nodes) {
    if (block.type == "image")
      return block
    if (Array.isArray(block.children)) {
      const found = findFirstImageBlock(block.children)
      if (found) return found
    }
  }

  return undefined;
};






export const capitalizeFirstLetter = (str: string) => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}