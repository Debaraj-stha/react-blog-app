import LoadingComponent from './Loading'
import RenderPosts from './RenderPosts'
import type { BlogType } from '../types/blog'
import { getQueryParams } from '../helper/utils'
import { usePagination } from '../Provider/PaginationProvider'

type Props = {
    items: BlogType[],
    isCardDisplay?: boolean,
    loading?: boolean
}

const BlogMainCard = ({ items, isCardDisplay, loading = false }: Props) => {
    const category = getQueryParams("category")
    const { totalItems } = usePagination()
    const isCategory = category && category !== "/"
    return (
        <div className='max-w-7xl py-6 px-4 sm:mx-auto my-12 bg-gray-100 dark:bg-gray-800 rounded shadow-lg'>
            {loading ? (
                <LoadingComponent message='Loading Blogs...' width='100%' />
            ) : (
                <div>
                    {items.length === 0 ? (
                        <p className='text-center text-gray-700 dark:text-gray-200 font-semibold py-4'>No blogs found { isCategory ? `on category ${category}`:""}.</p>
                    ) : (
                        <>
                            {isCategory && (
                                <p className='my-4  font-bold text-gray-700 dark:text-white'>
                                    {totalItems} Blog{totalItems > 1 ? 's' : ""} on Category "{category}"
                                </p>
                            )}
                            <div className="grid gap-6 md:grid-cols-3">
                                <RenderPosts posts={items} isCardDisplay={isCardDisplay} />
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}

export default BlogMainCard
