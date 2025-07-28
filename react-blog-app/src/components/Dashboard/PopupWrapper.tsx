import React, { type ReactNode } from 'react'

const PopupWrapper = ({ children, extraClass }: {  children: ReactNode,extraClass?: string, }) => {
    return (
        <div className={`absolute right-0 mt-2 z-50 w-40 rounded-md shadow-lg bg-white dark:bg-gray-800
                    border border-gray-200 dark:border-gray-700 px-4 py-2 ${extraClass}`}  >
            {children}
        </div>
    )
}

export default PopupWrapper
