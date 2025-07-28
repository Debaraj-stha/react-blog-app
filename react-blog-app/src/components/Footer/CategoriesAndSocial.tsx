import React from 'react'
import NavLink from '../NavLink'


import Social from './Social';
import { blogCategories } from '../../static/blog-categories';

const CategoriesAndSocial = () => {;
    return (
        <div>
            <h3 className="text-lg font-semibold text-white mb-3">Categories</h3>
            <ul className="space-y-2 text-sm mb-4">
                {
                    blogCategories.slice(0,5).map((cat,index) => <NavLink key={index} text={`${cat.label}`} link={`/blogs?category=${encodeURIComponent(cat.label)}`} margin='10px 0px' hoverBg='transparent' lineBg='transparent' />)
                }
            </ul>
            <h3 className="text-lg font-semibold text-white mb-2">Follow Us</h3>
            <div className="flex space-x-4">
                <Social />
            </div>
        </div>

    )
}

export default CategoriesAndSocial
