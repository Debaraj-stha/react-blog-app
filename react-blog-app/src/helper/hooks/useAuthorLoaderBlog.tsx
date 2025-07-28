import { useParams } from "react-router-dom"
import { useAuthor } from "../../Provider/AuthorProvider"
import { useEffect } from "react"
import { useAuth } from "../../Provider/AuthProvider";

type AuthorLoaderWithBlogType = {
    limit?: number;
    page?: number;
    fetchBlogsOnly?: boolean;
    authorId?: string;
    shouldSetLoading?: boolean;
}

const useAuthLoaderWithBlog = ({
    limit = 6,
    page = 0,
    fetchBlogsOnly = false,
    shouldSetLoading = true,
    authorId = ""
}: AuthorLoaderWithBlogType) => {
    let author_id = authorId || useParams().author_id || ""
    const { loadAuthorWithBlog } = useAuthor()

    useEffect(() => {
        if (author_id) {
            loadAuthorWithBlog({ author_id, limit, page, fetchBlogsOnly, shouldSetLoading })
        }
    }, [author_id, limit, page])
}

export default useAuthLoaderWithBlog
