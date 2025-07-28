import React, { memo } from 'react'


import { usePagination } from '../../Provider/PaginationProvider'

import BlogMainCard from '../BlogMainCard'
import { useBlogContext } from '../../Provider/BlogProvider'

const RenderBlog = memo(({ isCardDisplay }: { isCardDisplay?: boolean }) => {
    const { paginatedItems } = usePagination()
    const{loading}=useBlogContext()
    return (
        <BlogMainCard isCardDisplay={isCardDisplay} items={paginatedItems} loading={loading}/>
    )
})

export default RenderBlog
