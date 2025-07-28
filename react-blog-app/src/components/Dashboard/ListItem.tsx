import React, { type ReactNode } from 'react'
import VerticalMoreIcon from '../VerticalMoreIcon'
type ListItemType = {
    title: string,
    subTitle: string
    children?: ReactNode,
    Leading?: React.ElementType,
    Trailing?: React.ElementType

}
const ListItem = ({ title, subTitle, children, Leading, Trailing }: ListItemType) => {
    return (
        <li
            className="border border-gray-200 dark:border-gray-700 p-3 rounded-md flex justify-between" >
            {Leading && <Leading />}
            <div>
                <p className="font-medium text-gray-800 dark:text-white">{title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{subTitle}</p>
            </div>
            {
                Trailing && <Trailing />
            }

            {children && children}

        </li>
    )
}

export default ListItem
