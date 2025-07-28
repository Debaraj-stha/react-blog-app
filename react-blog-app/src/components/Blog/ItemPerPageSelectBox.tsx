import React from 'react'
import { usePagination } from '../../Provider/PaginationProvider'

const ItemPerPageSelectBox = () => {
    const{setItemsPerPage}=usePagination()
    
    return (
        <select
            name="itemsPerPage"
            className="w-full bg-gray-800 text-white px-4 py-2 border  rounded-md border-none outline-none focus:ring-0 focus:outline-none focus:border-none transition"
            defaultValue="6"
            onChange={(e)=>setItemsPerPage(parseInt(e.target.value,10))}
        >
            <option value="" disabled>Items Per Page</option>
            <option value="3">3</option>
            <option value="6">6</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="25">25</option>
            <option value="40">40</option>
            <option value="60">60</option>
        </select>
    )
}

export default ItemPerPageSelectBox
