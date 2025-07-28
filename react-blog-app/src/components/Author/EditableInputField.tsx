import React from "react"

type EditableInputFieldProps = {
    value: string;
    extraClass?: string;
    placeholder?: string;
    disabled?: boolean;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;


}
const EditableInputField = ({ value, onChange, extraClass, placeholder, disabled, onBlur, onClick, onFocus, onKeyDown, onKeyUp }: EditableInputFieldProps) => {
    return (
        <input
            className={`focus:outline-none w-full text-gray-600 dark:text-gray-100 ${extraClass}`}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            onChange={onChange}
            onBlur={onBlur}
            onClick={onClick}
            onFocus={onFocus}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}


        />
    )
}

export default EditableInputField
