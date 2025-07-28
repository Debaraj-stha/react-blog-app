import React, { type ReactNode } from 'react'
type DashboardSectionWrapperType = {
    children: ReactNode,
    sectionHeader: string,
    Icon: React.ElementType,
    iconBG?:string
}
const DashboardSectionWrapper = ({ children, sectionHeader, Icon,iconBG="text-white" }: DashboardSectionWrapperType) => {
    return (
        <div className='bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md'>
            <h2 className='text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-white'>
                <Icon className={`${iconBG}`} />
                {sectionHeader}
            </h2>
            {children}
        </div>
    )
}

export default DashboardSectionWrapper
