import type { ReactNode } from "react";

export type ContactFormAction =
    { type: "SET_NAME", payload: string }
    |
    { type: "SET_EMAIL", payload: string }
    |
    { type: "SET_MESSAGE", payload: string }


export type ContactFormState = {
    name: string;
    email: string;
    message: string;
};

export type ContactFormProviderProps = {
    children: ReactNode
}
export type ErrorTypes = { nameError: string, emailError: string,messageError:string }
export type ContactFormContextType = {
    handleSubmit: (e: React.FormEvent) => void,
    validateEmail: (e: React.ChangeEvent<HTMLInputElement>) => void,
    validateName: (e: React.ChangeEvent<HTMLInputElement>) => void,
    errors: ErrorTypes,
    state: ContactFormState,
    dispatch: React.Dispatch<ContactFormAction>,
    isFormSubmitSuccess:boolean,
    setFormSubmitSuccess:React.Dispatch<React.SetStateAction<boolean>>
}
