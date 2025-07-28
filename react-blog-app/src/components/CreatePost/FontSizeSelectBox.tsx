import React, { useRef } from 'react';

const FontSizeSelectBox = () => {


    return (
        <>
            <select
                className="border-0 outline-0 rounded-md shadow-2xl text-black"
                name='font-size'
            >
                {Array.from({ length: 40 }).map((_, index) => (
                    <option key={index + 10} value={index + 10}>
                        {index + 10}
                    </option>
                ))}
            </select>
           
        </>
    );
};

export default FontSizeSelectBox;
