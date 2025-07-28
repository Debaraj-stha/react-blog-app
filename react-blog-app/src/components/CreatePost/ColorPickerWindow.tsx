import React from 'react'
import PopupCard from '../PopupCard'
import { SketchPicker } from 'react-color'
import { useCreateContext } from '../../Provider/CreatePostProvider';
const ColorPickerWindow = () => {
    const { isColorPickerOpen, closeColorPicker ,pickColor,selectedTextColor} = useCreateContext();
    return (<>
        {
            isColorPickerOpen && <PopupCard onClick={closeColorPicker}>
                <SketchPicker onChangeComplete={(color)=>pickColor(color.hex)} color={selectedTextColor}/>
            </PopupCard>
        }

    </>

    )
}

export default ColorPickerWindow
