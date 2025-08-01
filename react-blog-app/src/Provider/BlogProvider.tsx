import React, { createContext, useCallback, useContext, useMemo, useReducer, useState } from 'react'
import { type BlogProviderProps, type BlogContextType, type BlogType, type FilterParams, type FetchBlogFeedbackType } from '../types/blog'
import apiHelper from '../helper/api-helper'
import { BASE_URL } from '../constraints'
import { useMessageContext } from './MessageProviders'
import { usePagination } from './PaginationProvider'
import type { ContactFormAction, ContactFormState, ErrorTypes } from '../types/contact'
import { emailValidator, namaValidator } from '../helper/validator'
import { useParams } from 'react-router-dom'
import { useAuth } from './AuthProvider'
import type { FeedbackType } from '../types/feedbackType'
import { getQueryParams } from '../helper/utils'
import FeedbackHistoryManager from '../helper/FeedbackHistoryManager'



export const BlogContext = createContext<BlogContextType | null>(null)
const initialState: ContactFormState = {
    name: "",
    email: "",
    message: ""
}
const initialErrors: ErrorTypes = {
    nameError: "",
    emailError: "",
    messageError: ""
}


const BlogProvider = ({ children }: BlogProviderProps) => {
    const [blogs, setBlogs] = useState<BlogType[]>([])
    const [loading, setLoading] = useState(false)
    const { addMessage } = useMessageContext()
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [tags, setTags] = useState<string[] | null>([])
    const [allBlogs, setAllBlogs] = useState<BlogType[]>([]);
    const { itemsPerPage, setItems, setTotalItemLength } = usePagination()
    const { blog_id } = useParams();
    const { user } = useAuth()
    const [feedbacks, setFeedbacks] = useState<FeedbackType[]>([])
    const [recentBlogs, setRecentBlogs] = useState<BlogType[] | undefined>([])
    const [blog, setBlog] = useState<BlogType | undefined>(undefined)
    const [selectedSctegory, setSelectedCategory] = useState("")

    const filteredByCategoryQuery = useMemo(() => {
        const q = getQueryParams('category')
        setSelectedCategory(q)
        return q
    }, [])
    const feedbackManager = useMemo(() => new FeedbackHistoryManager(user?.user_id! || "guest"), [user?.user_id])
    const reducer = (state: ContactFormState, action: ContactFormAction) => {
        switch (action.type) {
            case 'SET_EMAIL':
                return { ...state, email: action.payload }
            case 'SET_NAME':
                return { ...state, name: action.payload }
            case 'SET_MESSAGE':
                return { ...state, message: action.payload }
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState)
    const [errors, setErrors] = useState<ErrorTypes>(initialErrors)

    const validateName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        const errorMessage = namaValidator(newValue)
        dispatch({ type: "SET_NAME", payload: newValue })
        setErrors((prev) => ({ ...prev, nameError: errorMessage }))
    }

    const validateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        const errorMessage = emailValidator(newValue)
        dispatch({ type: "SET_EMAIL", payload: newValue })
        setErrors((prev) => ({ ...prev, emailError: errorMessage }))
    }

    const validateMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        let errorMessage = ""
        if (newValue.trim() === "") {
            errorMessage = "Message is Required"
        }
        dispatch({ type: "SET_MESSAGE", payload: newValue })
        setErrors((prev) => ({ ...prev, messageError: errorMessage }))

    }

    const submitFeedback = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!blog_id) {
            addMessage({ message: `Blog ID is required. It cannot be null`, type: "info" });
            return;
        }

        try {
            setLoading(true)
            const { name, message, email } = state
            if (name.trim() === "" || email.trim() === "" || message.trim() === "") {
                setErrors((prev) => ({ ...prev, emailError: "Email is required" }))
                setErrors((prev) => ({ ...prev, nameError: "Name is required" }))
                setErrors((prev) => ({ ...prev, messageError: "Message is required" }))
                return
            }
            const data = {
                name,
                email,
                message,
                blog_id: blog_id,
                profile: user?.image
            }
            const res = await apiHelper({ url: `${BASE_URL}api/blog/feedback/`, method: "POST", data })
            blog !== undefined ? feedbackManager.add(blog!) : null
            addMessage({ message: `${res.message}`, type: "success" })
        } catch (error: any) {
            addMessage({ message: `Error while submitting feedback:${error.message}`, type: "error" })
        }
        finally {
            dispatch({ type: "SET_EMAIL", payload: "" })
            dispatch({ type: "SET_NAME", payload: "" })
            dispatch({ type: "SET_MESSAGE", payload: "" })
            setLoading(false)
        }
    }, [state, blog_id, addMessage, setErrors, dispatch, setLoading, feedbackManager])

    const fetchTotalBlogsLength = useCallback(async () => {
        try {
            const param = new URLSearchParams()
            if (filteredByCategoryQuery && filteredByCategoryQuery !== "/") {
                param.append("category", encodeURIComponent(filteredByCategoryQuery));
                setSelectedCategory(filteredByCategoryQuery)
            }
            const res = await apiHelper({ url: `${BASE_URL}api/blogs/total?${param.toString()}` })
            setTotalItemLength(res.total)
        } catch (error) {

        }
    }, [filteredByCategoryQuery, setSelectedCategory])

    const loadBlogs = useCallback(async (page = 0, limit = itemsPerPage) => {
        try {
            setLoading(true);
            const skip = page * limit
            const param = new URLSearchParams()
            param.append("skip", skip.toString())
            param.append("limit", limit.toString())
            if (filteredByCategoryQuery && filteredByCategoryQuery !== "/") {
                param.append("category", encodeURIComponent(filteredByCategoryQuery));
            }
            const res = await apiHelper({ url: `${BASE_URL}api/blogs?${param.toString()}` });
            console.log("res", res)
            const blogs = res.blogs;
            setBlogs(blogs);
            setAllBlogs(blogs); // optional if you're using paginated data only
            setItems(blogs); // sync with pagination context
        } catch (error) {
            console.error("Error while loading blogs", error);
        } finally {
            setLoading(false);
        }
    }, [itemsPerPage, filteredByCategoryQuery]);

    const resetBlogs = () => {
        setBlogs(allBlogs);
    };

    /**
     * call api to fetch blog from database with given id
     * @param blogId - id of blog to be fetch from database
     */
    const loadBlog = useCallback(async (blogId: string): Promise<BlogType | null> => {
        try {
            setLoading(true)
            const res = await apiHelper({ url: `${BASE_URL}api/blog/${blogId}` })
            const blog = res.blog;
   
            const date = new Date(blog.createdAt)
            blog.createdAt = date.toDateString()
            setBlog(blog)
            return blog
        } catch (error: any) {
            addMessage({ message: `error while filtering blog with id:${error.message}`, type: "error" })

            return null
        }
        finally {
            setLoading(false)
        }
    }, [])

    const submitQuery = useCallback(async (e: React.KeyboardEvent<HTMLInputElement>) => {
        try {
            if (e.key === "Enter") {
                const inputValue = (e.target as HTMLInputElement).value.trim();
                if (!inputValue) {
                    addMessage({ message: "Search query cannot be empty", type: "warning" });
                    return;
                }
                addMessage({ message: "Searching...", type: "info" })
                setLoading(true);
                setBlogs([]);

                const res = await apiHelper({
                    url: `${BASE_URL}api/blogs/search?query=${encodeURIComponent(inputValue)}`
                });

                setBlogs(res.blogs);
                addMessage({ message: res.message, type: "success" });
                setSearchQuery(""); // Clear input after successful search
            }
        } catch (error: any) {
            addMessage({
                message: `Error while searching blogs.\n Error: ${error.message}`,
                type: "error"
            });
        } finally {
            setLoading(false);

        }
    }, []);
    const getrecentBlogs = useCallback(async (limit = 9) => {
        try {
            const params = new URLSearchParams();
            params.append("createdAt", "desc")
            params.append("limit", limit.toString())
            const res = await apiHelper({ url: `${BASE_URL}api/blogs/filterBy?${params.toString()}` });
            if (res.blogs.length > 0) {
                setRecentBlogs(res.blogs)
            }
            else {
                addMessage({ message: res.message, type: "info" })
            }
        } catch (error: any) {
            addMessage({
                message: `Error while getting latest blogs.\nError: ${error.message}`,
                type: "error"
            });
        }
    }, [recentBlogs])

    const filterBlogsBy = useCallback(async ({
        value,
        sortField = "createdAt",
        sortOrder = "desc",
        isSort = false,
        field = "category"
    }: FilterParams): Promise<void> => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (!isSort) {
                params.append("field", field);
                params.append("value", value!);
            }
            else {
                params.append("sortField", sortField);
                params.append("sortOrder", sortOrder);
            }

            const res = await apiHelper({ url: `${BASE_URL}api/blogs/filterBy?${params.toString()}` });

            if (res.blogs?.length > 0) {
                setBlogs(res.blogs);
            } else {
                setBlogs([]);
                addMessage({ message: "No blogs found with given filter", type: "info" })

            }

            addMessage({ message: res.message, type: "success" });
        } catch (error: any) {
            addMessage({
                message: `Error while filtering blogs by ${field}: ${value}.\nError: ${error.message}`,
                type: "error"
            });
        } finally {
            setLoading(false);
        }
    }, []);

    const loadTags = useCallback(async () => {
        try {

            const res = await apiHelper({ url: `${BASE_URL}api/blogs/tags` })
            if (res.tags)
                setTags(res.tags)
        } catch (error: any) {
            addMessage({
                message: `Error while retriving tags.\nError: ${error.message}`,
                type: "error"
            });
        }
    }, [])

    const fetchBlogFeedbaks = useCallback(async ({ blog_id, limit = 5, page = 0 }: FetchBlogFeedbackType) => {
        if (!blog_id) {
            addMessage({ message: "Blog ID is required to fetch feedbacks", type: "error" });
            return;
        }

        try {
            setLoading(true);
            const skip = page * limit;
            const res = await apiHelper({
                url: `${BASE_URL}api/blog/feedback/${blog_id}?skip=${skip}&limit=${limit}`,
            });
            setFeedbacks(res.feedbacks ?? []); // safely default to [] if not present
        } catch (error: any) {
            addMessage({
                message: `Error while fetching feedbacks: ${error.message ?? error}`,
                type: "error",
            });
        } finally {
            setLoading(false);
        }
    },
        [addMessage]
    );

    const getFeedbackCount = useCallback(async (blog_id: string) => {
        if (!blog_id) {
            addMessage({ message: "Blog ID is required to fetch feedback count", type: "error" });
            return 0;
        }
        try {
            setLoading(true);
            const res = await apiHelper({
                url: `${BASE_URL}api/blog/feedback/${blog_id}/count`,
            });
            return res.count ?? 0;
        } catch (error: any) {
            addMessage({
                message: `Error while fetching feedback count: ${error.message ?? error}`,
                type: "error",
            });
            return 0;
        }
        finally {
            setLoading(false)
        }
    }, [])

    const setName = useCallback((name: string) => {
        dispatch({ type: "SET_NAME", payload: name })

    }, [user])
    const setEmail = useCallback((email: string) => {
        dispatch({ type: "SET_EMAIL", payload: email })
    }, [user])




    const value = useMemo(() => ({
        blogs,
        loadBlogs,
        loading,
        loadBlog,
        setSearchQuery,
        searchQuery,
        submitQuery,
        filterBlogsBy,
        tags,
        loadTags,
        resetBlogs,
        fetchTotalBlogsLength,
        state,
        validateEmail,
        validateMessage,
        validateName,
        errors,
        submitFeedback,
        feedbacks,
        fetchBlogFeedbaks,
        getFeedbackCount,
        getrecentBlogs,
        recentBlogs,
        selectedSctegory,
        setSelectedCategory,
        setName,
        setEmail
    }), [
        blogs,
        loadBlogs,
        loading,
        loadBlog,
        setSearchQuery,
        searchQuery,
        submitQuery,
        filterBlogsBy,
        tags,
        loadTags,
        resetBlogs,
        fetchTotalBlogsLength,
        state,
        validateEmail,
        validateMessage,
        validateName,
        errors,
        submitFeedback,
        feedbacks,
        fetchBlogFeedbaks,
        getFeedbackCount,
        getrecentBlogs,
        recentBlogs,
        selectedSctegory,
        setSelectedCategory,
        setName,
        setEmail
    ])




    return (
        <BlogContext.Provider value={value}>
            {children}
        </BlogContext.Provider>
    )
}


export const useBlogContext = () => {
    const context = useContext(BlogContext)
    if (!context) {
        throw new Error("useBlogContext must be used within BlogProvider")
    }
    return context
}

export default BlogProvider
