import React from 'react';
import { Helmet } from 'react-helmet';
import SingleBlog from '../components/SingleBlog';
import LoadingComponent from '../components/Loading';
import useBlogLoader from '../helper/hooks/useBlogLoader';
type BlogProps = {
    showAuthor?: boolean,
    showSimilarBlogs?: boolean,
    showFeedbackForm?: boolean,
    isAuthorView?: boolean
}
const Blog = ({ showAuthor = true, showSimilarBlogs = true, showFeedbackForm = true, isAuthorView = false }: BlogProps) => {
    const { blog, loading } = useBlogLoader();
    if (loading || !blog) {
        return (
            <LoadingComponent message="Loading Blog..." minHeight="900px" width="100%" />
        );
    }
    return (
        <div>
            <Helmet>
                <title>{blog.title} - React Blog App</title>
                <meta name="keywords" content="react, blog, articles, posts" />
            </Helmet>
            <SingleBlog blog={blog} showAuthor={showAuthor} showFeedbackForm={showFeedbackForm}
                showSimilarBlogs={showSimilarBlogs} />
        </div>
    );
};

export default Blog;
