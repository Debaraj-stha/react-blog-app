import React from 'react'
import { MdMoreVert } from 'react-icons/md'

type VerticalMoreIconType = {
  iconSize?: number
  extraClass?: string
  onClick?:()=>void
}

const VerticalMoreIcon = ({ iconSize = 20, extraClass = "",onClick=()=>{} }: VerticalMoreIconType) => {
  return (
    <div
      className={`
        flex items-center justify-center
        w-10 h-10 rounded-full
        cursor-pointer transition-all duration-200
        hover:bg-gray-200 hover:shadow-md
        active:scale-95
        group
        ${extraClass}
      `}
      onClick={onClick}
    >
      <MdMoreVert size={iconSize} className="text-gray-600" />
    </div>
  )
}

export default VerticalMoreIcon
