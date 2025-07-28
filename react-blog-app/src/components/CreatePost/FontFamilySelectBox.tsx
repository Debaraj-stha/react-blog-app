import React, { useState, useEffect } from 'react'
import { fontsName } from '../../static/fontsName'
import { useCreateContext } from '../../Provider/CreatePostProvider'
import { setMark } from './helper'

const FontFamilySelectBox = () => {
    const [font, setFont] = useState(fontsName[0])
    const { editor } = useCreateContext()
    
    useEffect(() => {
        if (editor) {
            setMark(editor, 'fontFamily', font)
        }
    }, [font, editor])

    return (
        <select
            className='border-0 outline-0 rounded-md shadow-2xl text-black'
            name='font-family-select-box'
            value={font}
            onChange={(e) => setFont(e.target.value)}
        >
            {fontsName.map((fontName, index) => (
                <option key={index} value={fontName}>
                    {fontName}
                </option>
            ))}
        </select>
    )
}

export default FontFamilySelectBox
