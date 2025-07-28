import type { SetStateAction } from "react"
import type { BlogType } from "./blog"
import type React from "react"
export type BlogWithFeedbackType = {
  title: string,
  blog_id: string,
  name: string,
  email: string,
  message: string,
  createdAt: Date
}

export type ScheduledDraftBlogType = {
  scheduledBlogs: BlogType[]
  draftBlogs: BlogType[]
}

export type DashboardCountsType = {
  totalBlogs: number,
  totalPublished: number,
  totalUnpublished: number,
  totalFeedbacks: number,
  totalReader: number,
  totalViews: number,
  popularBlog: [{ title: string, views?: number }]
  scheduledBlosCount: number,
  mostUsedTag?: string,
  subscriberCount?: number
}

export type AuthorType = {
  author_id?: string
  name: string
  _id?: string
  profile?: string
  email?: string,
  details: {
    username: string
    bio?: string
    location?: string
    education?: string
    profession?: string
    hobbies?: string[]
    skills?: string[]
    experience?: {
      company: string
      role: string
      duration: string
    }[]
    languages?: string[]
    joined?: string
    website?: string
    social?: {
      github?: string
      twitter?: string
      linkedin?: string
      instagram?: string
      website?: string
    }
  }
  createdAt?: string
  updatedAt?: string
}

export type AuthorWithBlog = {
  author: AuthorType,
  blogs: BlogType[] | []
}


export type loadAuthorWithBlogType = {
  limit?: number;
  page?: number;
  author_id: string;
  fetchBlogsOnly?: boolean;
  shouldSetLoading?: boolean;
}
export type handleBlogActionType = {
  scheduledAt?: Date | string,
  isScheduledBlogPublish?: boolean
}
export type ActionType = 'publish' | 'unpublish' | 'schedule' | 'reschedule'
export type SubscriberCountAndStatusType = {
  subscriberCount?: number,
  hasSubscribed?: boolean
}
export type PostLoginActionType = ((...args: any) => void) | null
export type AuthorContextType = {
  loading: boolean;
  author: AuthorType | null;
  authorWithBlogs: AuthorWithBlog | null;
  loadAuthor: (author_id?: string) => Promise<void>;
  loadAuthorWithBlog: ({ author_id, limit, page, fetchBlogsOnly, shouldSetLoading }: loadAuthorWithBlogType) => void;
  loadMore: (author_id: string, limit?: number) => void;
  hasMore: boolean;
  loadingMore: boolean;
  page: number;
  isUpdate: boolean;
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  state: AuthorEditFormStateType;
  dispatch: React.Dispatch<AuthorFormActionType>;
  updateAuthor: () => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  totalBlogs: number;
  ftechTotalAuthorBlogs: () => void;
  blogsWithFeedback: BlogWithFeedbackType[];
  loadDashboardData: (author_id: string) => void;
  dashboardCounts: DashboardCountsType | undefined;
  totalFeedbacks: number;
  authorPopularBlogs: BlogType[] | undefined;
  fetchSubscriber: (author_id: string) => void;
  subscribers: SubscriberType[] | undefined;
  recentActivities: RecentActivityType[] | undefined;
  profileEditable: boolean;
  setProfileEditable: React.Dispatch<SetStateAction<boolean>>;
  handleSubscribeUnsubscribe: (user_id: string, hasSubscribed: boolean, isSubscribedToAll: boolean, author_id?: string) => Promise<boolean>;
  deleteBlog: (blog_id: string, isScheduledBlog?: boolean) => void
  handleBlogAction: (blog_id: string, action_type: ActionType, data?: handleBlogActionType) => void
  isTimePickerOpen: boolean;
  setTimePickerOpen: React.Dispatch<boolean>;
  setSelectedBlogId: React.Dispatch<string>;
  selectedBlogId: string | null;
  scheduledBlog: BlogType[] | undefined;
  draftBlogs: BlogType[] | undefined;
  loadEligibleToUpdateBlogs: (user_id: string) => void;
  blogEligibleToUpdate: BlogType[] | undefined;
  hasSubscribed: boolean;
  setHasSubscribed: React.Dispatch<SetStateAction<boolean>>;
  fetchSubscriptionStatus: (author_id?: string) => void;
  subscriberCountWithStatus: SubscriberCountAndStatusType | undefined,
  createAuthor:()=>void



};
export type AuthorEditFormStateType = AuthorType

export type Experience = {
  company: string;
  role: string;
  duration: string;
}
export type AuthorFormActionType =
  | { type: "RESET", payload: AuthorEditFormStateType }
  |{type:"UPDATE_EMAIL",payload:string}
  | { type: "UPDATE_NAME"; payload: string }
  | { type: "UPDATE_PROFILE"; payload: string }
  | { type: "UPDATE_DETAILS_USERNAME"; payload: string }
  | { type: "UPDATE_DETAILS_EMAIL"; payload: string }
  | { type: "UPDATE_DETAILS_BIO"; payload: string }
  | { type: "UPDATE_DETAILS_LOCATION"; payload: string }
  | { type: "UPDATE_DETAILS_EDUCATION"; payload: string }
  | { type: "UPDATE_DETAILS_PROFESSION"; payload: string }
  | { type: "UPDATE_DETAILS_WEBSITE"; payload: string }
  | { type: "UPDATE_DETAILS_EXPERIENCE"; payload: { index: number; field: keyof Experience; value: string }; }
  | {
    type: "UPDATE_DETAILS_SOCIAL"; payload: Partial<AuthorEditFormStateType["details"]["social"]>;
  }
  | { type: "SET_DETAILS_EXPERIENCE", payload: Experience[] }
  | { type: "SET_DETAILS_LANGUAGES", payload: string[] }
  | { type: "SET_DETAILS_SKILLS", payload: string[] }
  | { type: "SET_PROFILE", payload: string }
  | {type:"SET_DETAILS_HOBBIES",payload:string[]}
  ;

export type SubscriberType = {
  name: string
  email: string
  profile?: string,
  subscribedSince: Date
}

export type RecentActivityType = {
  type: string
  message: string
  createdAt: Date

}