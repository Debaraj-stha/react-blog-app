import React from 'react';

type InputProps ={
    type?: string;
    extraClass?: string;
    value?: string;
    placeholder?:string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
    type = "text",
    extraClass = "",
    value = "",
    onChange = () => { },
    placeholder="Type here..."
}: InputProps) => {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full text-black mb-4 border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${extraClass}`}
        />
    );
}

export default Input;
