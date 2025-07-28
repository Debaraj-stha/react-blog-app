import React, { memo } from 'react'

const RenderVideoElement = memo(({attributes,children,element}:any) => {
    return (
        <video {...attributes} controls className="max-w-4xl h-56">
            <source src={element.url} type="video/mp4" />
            {children}
        </video>
    );
})

export default RenderVideoElement
