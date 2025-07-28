
import AuthorCard from '../components/Author/AuthorCard'
import LoadingComponent from '../components/Loading'
import { useAuthor } from '../Provider/AuthorProvider'
import AuthorBlogs from '../components/Author/AuthorBlogs'
import useAuthLoaderWithBlog from '../helper/hooks/useAuthorLoaderBlog'


const Author = () => {
    const { loading } = useAuthor()
    useAuthLoaderWithBlog({})

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[300px]">
                <LoadingComponent width="100%" message="Loading Author..." />
            </div>
        )
    }

    return (
        <div className='max-w-7xl mx-auto my-6 sm:my-10 px-8'>
            <AuthorCard  isAuthorMode={false}/>
            <AuthorBlogs />
        </div>
    )
}

export default Author
