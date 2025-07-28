import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useReducer,
    useState,
    type ReactNode,
} from "react";

import apiHelper from "../helper/api-helper";
import type {
    ActionType,
    AuthorContextType,
    AuthorType,
    AuthorWithBlog,
    BlogWithFeedbackType,
    DashboardCountsType,
    handleBlogActionType,
    loadAuthorWithBlogType,
    RecentActivityType,
    SubscriberCountAndStatusType,
    SubscriberType
} from "../types/author";
import { useMessageContext } from "./MessageProviders";
import { BASE_URL, defaultAuthor } from "../constraints";

import { useNavigate, useParams } from "react-router-dom";
import authorReducer from "../helper/reducers/authorReducer";
import { uploadFile } from "../helper/cloudinary-helper";
import type { BlogType } from "../types/blog";
import { useAuth } from "./AuthProvider";

const AuthorContext = createContext<AuthorContextType | undefined>(undefined);
const AuthorProvider = ({ children }: { children: ReactNode }) => {
    const [author, setAuthor] = useState<AuthorType | null>(null);
    const [loading, setLoading] = useState(false);
    const { addMessage } = useMessageContext()
    const [authorWithBlogs, setAuthorWithBlogs] = useState<AuthorWithBlog | null>(null)
    const [page, setPage] = useState(0)
    const [hasMore, setHasMore] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [totalBlogs, setTotalBlogs] = useState<number>(0)
    const [blogsWithFeedback, setBlogsWithFeedbask] = useState<BlogWithFeedbackType[]>([])
    const [dashboardCounts, setDashboardCounts] = useState<DashboardCountsType>()
    const [totalFeedbacks, setTotalFeedbacks] = useState<number>(0)
    const [authorPopularBlogs, setAuthorPopularBlogs] = useState<BlogType[] | undefined>([])
    const [subscribers, setSubscribers] = useState<SubscriberType[] | undefined>([])
    const [recentActivities, setRecentActivities] = useState<RecentActivityType[] | undefined>([])
    const [profileEditable, setProfileEditable] = useState(false)
    const [isTimePickerOpen, setTimePickerOpen] = useState(false)
    const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null)
    const [draftBlogs, setDraftBlogs] = useState<BlogType[] | undefined>([])
    const [scheduledBlog, setScheduledBlogs] = useState<BlogType[] | undefined>([])
    const [blogEligibleToUpdate, setBlogEligibleToUpdate] = useState<BlogType[] | undefined>(undefined)
    const [hasSubscribed, setHasSubscribed] = useState(false)
    const [subscriberCountWithStatus, setSubscriberCountWithStatus] = useState<SubscriberCountAndStatusType | undefined>(undefined)
    // http://localhost:8000/api/activities/688071d5531d23e16f9e248e
    const { author_id } = useParams()
    const { user } = useAuth()
    const navigate=useNavigate()
    const loadAuthor = useCallback(async (author_id?
        : string) => {
        try {
            setLoading(true);
            const res = await apiHelper({
                url: `${BASE_URL}api/author/${author_id}`,
            });
            setAuthor(res.author);
            dispatch({ type: "RESET", payload: res.author });

        } catch (error) {
            const message = `Failed to fetch author:${error}`
            addMessage({ message, type: "error" })
        } finally {
            setLoading(false);
        }
    }, []);
    const ftechTotalAuthorBlogs = useCallback(async () => {
        try {
            const res = await apiHelper({
                url: `${BASE_URL}api/author/${author_id}/totalBlogs/`,
            });
            setTotalBlogs(res.totalBlogs);
        } catch (error) {
            const message = `Failed to fetch total blogs: ${error}`;
            addMessage({ message, type: "error" });

        }
    }, [author_id, addMessage])

    const loadAuthorWithBlog = useCallback(async ({
        author_id, limit = 6, page = 0, fetchBlogsOnly = false, shouldSetLoading = true }: loadAuthorWithBlogType) => {
        try {
            if (shouldSetLoading)
                setLoading(true);
            const skip = page * limit;
            const res = await apiHelper({
                url: `${BASE_URL}api/author/blogs/${author_id}?skip=${skip}&limit=${limit}&fetchBlogsOnly=${fetchBlogsOnly}`,
            });
            console.log("res", res)
            const fetchedAuthor = res.author!;
            if (!fetchedAuthor) {
                addMessage({ message: res.message, type: "info" });
            }
            const newBlogs = res.blogs;
            const total = res.totalBlogs
            if (total !== undefined) {
                //check if  there is more blogs to fetch or not
                const more = (page + 1) * limit < total;
                setHasMore(more);
            }
            if (page >= 1) {
                setAuthorWithBlogs(prev => {
                    if (!prev) return { author: fetchedAuthor, blogs: newBlogs }; // first time load
                    return {
                        author: prev.author,
                        blogs: [...prev.blogs, ...newBlogs]
                    };
                });
                return;
            }
            setAuthorWithBlogs({
                author: fetchedAuthor,
                blogs: newBlogs
            });
            //if first page set page to 1 after first call
            if (page == 0) {
                setPage(1)
            }
        } catch (error: any) {
            const message = `Failed to fetch author with blogs: ${error.message}`;
            addMessage({ message, type: "error" });
        } finally {
            if (shouldSetLoading)
                setLoading(false);
        }
    }, []);

    const loadMore = async (author_id: string, limit?: number) => {
        try {
            setLoadingMore(true)
            //update page
            const nextPage = page + 1
            await loadAuthorWithBlog({ author_id, page, limit })
            setPage(nextPage)
        } catch (error: any) {
            const message = `Failed to fetch author with blogs: ${error.message}`;
            addMessage({ message, type: "error" });
        }
        finally {
            setLoadingMore(false)
        }
    }
    const [state, dispatch] = useReducer(authorReducer, defaultAuthor);

    const updateAuthor = useCallback(async () => {
        if (!author_id) {
            addMessage({ message: "Author ID is required to update author", type: "error" });
            return;
        }
        console.log("state during submitting", state)
        if (!state.name || !state.details.username || !state.email) {
            addMessage({ message: "Name, username, and email are required to update author", type: "error" });
            return;
        }
        try {
            const user = {
                name: state.name,
                email: state.email,
                profile: state.profile,
            }

            const details = {
                ...state.details
            }
            const res = await apiHelper({
                url: `${BASE_URL}api/author/${author_id}`,
                method: "PUT",
                data: { user, details },
            })

            if (res) {
                addMessage({ message: "Author updated successfully", type: "success" });
                setIsUpdate(false);
                dispatch({ type: "RESET", payload: defaultAuthor });
                setAuthor(res.author);
            }
        } catch (error) {
            addMessage({ message: `Failed to update author: ${error}`, type: "error" });
        }
        finally {
            setProfileEditable(false)
        }
    }, [state, author_id, addMessage]);
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = e.target.files?.[0];
            if (!file) {
                addMessage({ message: "No file selected", type: "error" });
                return;
            }
            if (file.size > 2 * 1024 * 1024) { // 2MB limit
                addMessage({ message: "File size exceeds 2MB", type: "error" });
                return;
            }
            if (!file.type.startsWith("image/")) {
                addMessage({ message: "Only image files are allowed", type: "error" });
                return;
            }
            const formData = new FormData();
            formData.append("file", file);
            //upload file to cloudinary
            const data = await uploadFile(formData)
            console.log("uploaded file data", data)
            //update state with uploaded file url
            dispatch({ type: "SET_PROFILE", payload: data.secure_url });
            //show success message
            addMessage({ message: "File uploaded successfully", type: "success" });
            //update  value of profile in author state
            setAuthor((prev) => {
                if (!prev) return null;
                return {
                    ...prev,
                    profile: data.secure_url
                };
            });
        } catch (error) {
            addMessage({ message: `Failed to upload file: ${error}`, type: "error" });
        }
    }
    const fetchScheduledDraftBlogs = useCallback(async () => {
        try {
            const res = await apiHelper({ url: `${BASE_URL}api/author/blogs/published-draft-blogs/${author_id}` })
            if (res.scheduledBlogs) {
                // setScheduledDraftBlogs(res)
                setScheduledBlogs(res.scheduledBlogs)
            }
            if (res.draftBlogs) {
                setDraftBlogs(res.draftBlogs)
            }
        } catch (error) {
            console.log("error", error)
        }
    }, [author_id, scheduledBlog, draftBlogs])

    const loadDashboardData = useCallback(async (author_id: string) => {
        try {
            setLoading(true)

            const [__, blogWithFeedbacks, blogsCounts, popularBlogs, _, recentActivity, scheduledDraftBlogs] = await Promise.all([
                loadAuthorWithBlog({ author_id, page: 0, shouldSetLoading: false }),
                await apiHelper({ url: `${BASE_URL}api/author/blogs/feedback/all?author_id=${author_id}` }),
                await apiHelper({ url: `${BASE_URL}api/blogs/counts-for-author?author_id=${author_id}` }),
                await apiHelper({ url: `${BASE_URL}api/authors/${author_id}/popular-blogs?limit=3` }),
                ftechTotalAuthorBlogs(),
                await apiHelper({ url: `${BASE_URL}api/activities/${author_id}` }),
                await fetchScheduledDraftBlogs()
                // /api/authors/:author_id/popular-blogs

            ])
            if (blogWithFeedbacks.feedbacks) {
                const cleanedFeedback =
                    blogWithFeedbacks.feedbacks.flatMap((blog: any) =>
                        blog.feedbacks.map((feedback: any) => ({
                            title: blog.title,
                            ...feedback
                        }))
                    );
                setBlogsWithFeedbask(cleanedFeedback)
            }

            if (blogsCounts.counts) {
                setDashboardCounts(blogsCounts.counts)
            }
            if (recentActivity.activities) {
                setRecentActivities(recentActivity.activities)
            }
            if (popularBlogs.blogs) {
                setAuthorPopularBlogs(popularBlogs.blogs)
            }
            const totalFeedbacks = blogWithFeedbacks.totalFeedbacks
            if (totalFeedbacks > 0)
                setTotalFeedbacks(totalFeedbacks)


        } catch (error: any) {
            addMessage({ message: `Error while loading author blogs feedback:Error:${error.message}`, type: "error" })
        }
        finally {
            setLoading(false)
        }
    }, [author_id])

    const fetchSubscriber = useCallback(async (author_id: string) => {
        try {
            const res = await apiHelper({ url: `${BASE_URL}api/subscribers/${author_id}` })
            if (res)
                setSubscribers(res.subscribers)
        } catch (error) {
            addMessage({ message: `Error while  fetching subscriber list`, type: "error" })
        }
    }, [])
    const handleSubscribeUnsubscribe = useCallback(async (user_id: string, hasSubscribed: boolean,
        isSubscribedToAll: boolean,
        author_id?: string,) => {
        console.log(author_id, user_id)
        if (!user_id) return false
        try {
            console.log("called")
            if (hasSubscribed) {
                const url = `${BASE_URL}api/unsubscribe/${author_id}`
                console.log("unsubscribe")
                const res = await apiHelper({
                    url,
                    method: 'DELETE',
                    data: { user_id, isSubscribedToAll }
                })
                addMessage({ message: res.message, type: 'success' })
                return true
            }

            const url = author_id !== undefined ? `${BASE_URL}api/subscribe?author_id=${author_id}` : `${BASE_URL}api/subscribe`
            const res = await apiHelper({
                url,
                method: 'POST',
                data: { user_id: user_id }
            })
            console.log("res", res)
            addMessage({ message: res.message, type: 'success' })

            return true
        } catch (error: any) {
            addMessage({ message: error.message || 'Something went wrong', type: 'error' })
            return false
        }
    }, [])
    const deleteBlog = useCallback(async (blog_id: string, isScheduledBlog = false) => {
        try {
            const res = await apiHelper({
                url: `${BASE_URL}api/blog/${author_id}`, method: "DELETE", data: {
                    blog_id
                }
            })
            if (res) {
                if (isScheduledBlog) {
                    const filteredScheduledBlogs = scheduledBlog!.filter((blog) => blog._id !== blog_id)
                    setScheduledBlogs(filteredScheduledBlogs)
                    return
                }
                const filteredDraftBlogs = draftBlogs?.filter(
                    (blog) => blog._id !== blog_id
                );
                setDraftBlogs(filteredDraftBlogs)
            }
        } catch (error: any) {
            addMessage({ message: `Error while deleting blog:${error.message}`, type: 'error' })
        }
    }, [author_id, scheduledBlog, draftBlogs, addMessage])

    const handleBlogAction = useCallback(async (blog_id: string, action_type: ActionType, data?: handleBlogActionType) => {
        try {
            console.log(blog_id, author_id, data, action_type)
            const res = await apiHelper({
                url: `${BASE_URL}api/blog/${author_id}/${blog_id}/${action_type}?user_id=${user?.user_id}`,
                method: "POST",
                data
            });
            if (action_type === "publish") {
                //if scheduled blog is being publish
                if (data?.isScheduledBlogPublish) {
                    const filtered = scheduledBlog?.filter((blog) => blog._id !== blog_id)
                    setScheduledBlogs(filtered)
                }
                else {
                    const filtered = draftBlogs?.filter((blog) => blog._id !== blog_id)
                    setDraftBlogs(filtered)
                }

            }
            if (action_type === "schedule") {
                const find = draftBlogs?.filter((blog) => blog._id === blog_id) || []
                setScheduledBlogs((prev) => {
                    if (!prev) return find
                    else return [...prev, ...find]
                })
            }
            if (action_type === "reschedule") {
                const filtered = scheduledBlog?.filter(blog => blog._id !== blog_id) || []
                const updated = scheduledBlog?.find(blog => blog._id === blog_id)
                if (updated) {
                    let scheduledAtValue = data?.scheduledAt!;
                    if (typeof scheduledAtValue === "string") {
                        scheduledAtValue = new Date(scheduledAtValue);
                    }
                    const updatedBlog = { ...updated, scheduledAt: scheduledAtValue };
                    const newData = [...filtered, updatedBlog];
                    setScheduledBlogs(newData);
                }
            }

            //filtering blogs to update in ui
            if (action_type === "unpublish") {
                setAuthorWithBlogs((prev) => {
                    if (!prev) return null;
                    const filteredBlogs = prev.blogs.filter(blog => blog._id !== blog_id);
                    return {
                        author: prev.author,
                        blogs: filteredBlogs,
                    };
                });


            }
            addMessage({ message: res.message, type: "success" })

        } catch (error: any) {
            console.log(error)
            addMessage({ message: `Error while deleting blog:${error.message}`, type: 'error' })
        }
    }, [author_id, addMessage, draftBlogs, scheduledBlog, authorWithBlogs])

    const loadEligibleToUpdateBlogs = useCallback(async (user_id: string) => {
        try {
            setLoading(true)
            const res = await apiHelper({ url: `${BASE_URL}api/blogs/can-edit/${user_id}` })
            if (res.blogs) {
                setBlogEligibleToUpdate(res.blogs)
            }
            addMessage({ message: res.message, type: "info" })
        } catch (error) {
            addMessage({ message: `Error while loading eligible to update blogs:${error}`, type: "error" })
        }
        finally {
            setLoading(false)
        }
    }, [])
    const fetchSubscriptionStatus = useCallback(async (author_id?: string) => {
        if (user) {
            try {
                const url = author_id !== undefined ? `${BASE_URL}api/subscription-status?user_id=${user.user_id}&author_id=${author_id}`
                    : `${BASE_URL}api/subscription-status?user_id=${user.user_id}`
                const response = await apiHelper({
                    url: url,
                });
                console.log("rs", response)
                setSubscriberCountWithStatus(response)
            } catch (err) {
                console.error("Failed to check subscription status:", err);
            } finally {
                // setLoading(false);
            }
        }
    }, [user]);

    const createAuthor = useCallback(async () => {
        try {
            const data={
                ...state,
                user_id:user?.user_id
            }
            const res = await apiHelper({ url: `${BASE_URL}api/author`, data, method: "POST" })
            if (res) {
                addMessage({ message: `${res.message}` })
                navigate("/create-post")
            }
        } catch (error: any) {
            addMessage({ message: `${error.message}`, type: "error" })
        }
    }, [state, user])

    const value = useMemo(
        () => ({
            author,
            loading,
            loadAuthor,
            authorWithBlogs,
            loadAuthorWithBlog,
            loadMore,
            loadingMore,
            hasMore,
            page,
            isUpdate,
            setIsUpdate,
            state,
            dispatch,
            updateAuthor,
            handleFileUpload,
            ftechTotalAuthorBlogs,
            totalBlogs,
            blogsWithFeedback,
            loadDashboardData,
            dashboardCounts,
            totalFeedbacks,
            authorPopularBlogs,
            fetchSubscriber,
            subscribers,
            recentActivities,
            profileEditable,
            setProfileEditable,
            handleSubscribeUnsubscribe,
            deleteBlog,
            handleBlogAction,
            isTimePickerOpen,
            setTimePickerOpen,
            setSelectedBlogId,
            selectedBlogId,
            scheduledBlog,
            draftBlogs,
            loadEligibleToUpdateBlogs,
            blogEligibleToUpdate,
            fetchSubscriptionStatus,
            hasSubscribed,
            setHasSubscribed,
            subscriberCountWithStatus,
            createAuthor

        }),
        [
            author,
            loading,
            loadAuthor,
            authorWithBlogs,
            loadAuthorWithBlog,
            loadMore,
            loadingMore,
            hasMore,
            page,
            isUpdate,
            setIsUpdate,
            state,
            dispatch,
            updateAuthor,
            handleFileUpload,
            ftechTotalAuthorBlogs,
            totalBlogs,
            blogsWithFeedback,
            loadDashboardData,
            dashboardCounts,
            totalFeedbacks,
            authorPopularBlogs,
            fetchSubscriber,
            subscribers,
            recentActivities,
            profileEditable,
            setProfileEditable,
            handleSubscribeUnsubscribe,
            deleteBlog,
            handleBlogAction,
            isTimePickerOpen,
            setTimePickerOpen,
            setSelectedBlogId,
            selectedBlogId,
            scheduledBlog,
            draftBlogs,
            loadEligibleToUpdateBlogs,
            blogEligibleToUpdate,
            fetchSubscriptionStatus,
            hasSubscribed,
            setHasSubscribed,
            subscriberCountWithStatus,
            createAuthor

        ]
    )
    return (
        <AuthorContext.Provider value={value}>{children}</AuthorContext.Provider>
    );
};


export const useAuthor = () => {
    const context = useContext(AuthorContext);
    if (!context)
        throw new Error("useAuthor must be used within an AuthorProvider");
    return context;
};

export default AuthorProvider;
