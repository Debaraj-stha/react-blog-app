import React, { memo } from 'react'
import { TiTimes } from 'react-icons/ti';
import ToolTip from '../ToolTip';


const RenderImageElement = memo(({ attributes, children, element,handleRemoveImage }: any) => {
   
    return (
            <div className="group relative w-fit inline-block">
                <div {...attributes} contentEditable={false} className="max-w-2xl">
                    <img
                        src={element.url}
                        alt={element.alt || 'Image'}
                        data-public-id={element.public_id}
                        className="my-2 max-w-full"
                    />
                    {/* Remove button */}
                    <button
                        type='button'
                        onClick={() => handleRemoveImage(element)} // You should define this function
                        className="absolute top-1 right-1 bg-red-700 text-white text-xs px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                        <ToolTip message="Remove"><TiTimes /></ToolTip>
                    </button>
                    {children}
                </div>
            </div>

    );


})

export default RenderImageElement
