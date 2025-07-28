import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBlogContext } from "../../Provider/BlogProvider";
import type { BlogType } from "../../types/blog";

const useBlogLoader = () => {
    const { blog_id } = useParams();
    const { loadBlog } = useBlogContext();
    const [blog, setBlog] = useState<BlogType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            if (blog_id) {
                const found = await loadBlog(blog_id);
                setBlog(found);
            }
            setLoading(false);
        };
        fetchBlog();
    }, [blog_id, loadBlog]);

    return { blog, loading };
};

export default useBlogLoader;
