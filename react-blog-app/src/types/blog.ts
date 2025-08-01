import type React from "react";
import type { ReactNode } from "react"
import type { Descendant } from "slate";
import type { ContactFormState, ErrorTypes } from "./contact";
import type { FeedbackType } from "./feedbackType";

export type BlogProviderProps = {
    children: ReactNode
}
export type FilterParams = {
    value?: string;
    sortField?: string;
    sortOrder?: "asc" | "desc";
    isSort?: boolean;
    field?: string;
};
export type FetchBlogFeedbackType = {
    blog_id: string;
    page?: number;
    limit?: number;
};
export type BlogContextType = {
    blogs: BlogType[] | [];
    loading: boolean;
    loadBlogs: (page?: number, limit?: number) => void;
    loadBlog: (blogId: string) => Promise<BlogType | null>;
    searchQuery: string,
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    submitQuery: (e: React.KeyboardEvent<HTMLInputElement>) => Promise<void>;
    filterBlogsBy: ({ value, sortField, sortOrder, field }: FilterParams) => Promise<void>;
    tags: string[] | null;
    loadTags: () => void;
    resetBlogs: () => void;
    fetchTotalBlogsLength: () => void;
    state: ContactFormState;
    validateEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
    validateMessage: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    validateName: (e: React.ChangeEvent<HTMLInputElement>) => void
    errors: ErrorTypes;
    submitFeedback: (e: React.FormEvent<HTMLFormElement>) => void;
    feedbacks: FeedbackType[],
    fetchBlogFeedbaks: (params: FetchBlogFeedbackType) => Promise<void>;
    getFeedbackCount: (blog_id: string) => Promise<number>;
    getrecentBlogs: () => void
    recentBlogs: BlogType[] | undefined
    selectedSctegory: string
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
    setName: (name: string) => void
    setEmail: (name: string) => void

}
export type ContentNode = {
    type: string;
    url?: string,
    children: { text?: string; type?: string; url?: string;[key: string]: any }[];
}
type authorDetails = {
    _id?: string;
    name?: string;
    profile?: string,
    details: Record<string, any>
}
export type similarBlogType = {
    title: string;
    id: string;
}
export type BlogType = {
    title: string;
    author_id?: string;
    author_name?:string
    _id: string;
    createdAt?: Date;
    updatedAt?: Date;
    scheduledAt?: Date,
    isPublished?: boolean,
    isScheduled?: boolean,
    content?: ContentNode[];
    authorDetails?: authorDetails;
    category?: string;
    tags?: string[];
    similarBlogs?: similarBlogType[],
    readerCount?: number,
    views?: number,
    feedbackCount?: number

}
