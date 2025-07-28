import React, { memo, type ReactNode } from 'react'
import { CgClose } from 'react-icons/cg'
type PopupCardProps={
    children:ReactNode,
    onClick:()=>void
}
const PopupCard = memo(({children,onClick}:PopupCardProps) => {
    return (
        <div className="fixed inset-0  flex items-center justify-center z-50 border border-gray-500 rounded shadow px-4 sm:px-0">
            <div className="bg-gray-200 p-4 rounded">
                <button
                    className="text-sm mb-2 px-2 py-1 rounded bg-gray-200 
                  transition duration-300 hover:bg-red-500
                  hover:text-white
                  "
                    onClick={onClick}
                >
                    <CgClose />
                </button>
                <hr/>
                {children}
            </div>
        </div>
    )
})

export default PopupCard
