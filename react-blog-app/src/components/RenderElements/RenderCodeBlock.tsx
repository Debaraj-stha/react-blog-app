import React, { memo, useRef } from 'react'

const RenderCodeBlock = memo(({ attributes, children }: any) => {
    const codeRef = useRef<HTMLPreElement>(null);
    const handleCopy = (e: React.MouseEvent<HTMLElement>) => {
        const target = e.currentTarget
        if (codeRef.current) {
            const textToCopy = codeRef.current.innerText;
            target.innerText = "Copied"
            navigator.clipboard.writeText(textToCopy);
            setTimeout(() => {
                target.innerText = "Copy"
            }, 2000)
        }
    }
    return (
        <div {...attributes} contentEditable={false} className="relative my-2 py-4">
            <button
                onClick={handleCopy}
                className="absolute top-5 right-2 bg-gray-700 text-white text-xs px-2 py-1 rounded hover:bg-gray-600"
            >
                Copy
            </button>
            <pre className="bg-gray-900 text-green-200 p-4 rounded overflow-x-auto text-sm font-mono" ref={codeRef}>
                <code>{children}</code>
            </pre>
        </div>
    );
})

export default RenderCodeBlock
