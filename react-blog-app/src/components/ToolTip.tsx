import React, { memo, type ReactNode } from 'react'
type ToolTipProps = {
    message?: string,
    children: ReactNode
}
/**
 * React component that provide tooltip information  on hover
 * @param message - tooltip message to show on hover 
 * @returns 
 */
const ToolTip = memo(({ message = "ToolTip", children }: ToolTipProps) => {

    return (
        <div className='relative group inline-block z-auto'>
            {children}
            <div className="absolute  bottom-full left-1/2 -translate-x-1/2 mb-2 hidden
       group-hover:block bg-gray-800 text-white text-sm px-2 py-1 rounded shadow">
                {message}
            </div>
        </div>
    )
})

export default ToolTip
