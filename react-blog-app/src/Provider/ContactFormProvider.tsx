import React, { createContext, useCallback, useContext, useMemo, useReducer, useState, } from 'react'
import type { ContactFormContextType, ContactFormProviderProps, ContactFormState, ErrorTypes } from '../types/contact'
import apiHelper from '../helper/api-helper';
import { useMessageContext } from './MessageProviders';
import { BASE_URL } from '../constraints';
import { emailValidator, namaValidator } from '../helper/validator';
import contactReducer from '../helper/reducers/contactReducer';


const ContactFormContext = createContext<ContactFormContextType | null>(null)

const ContactFormProvider = ({ children }: ContactFormProviderProps) => {

    const initialState: ContactFormState = {
        name: '',
        email: '',
        message: '',
    };


    const initialErrors: ErrorTypes = {
        nameError: "",
        emailError: "",
        messageError: ""
    }

    const [state, dispatch] = useReducer(contactReducer, initialState);
    const [errors, setErrors] = useState(initialErrors)
    const [isFormSubmitSuccess, setFormSubmitSuccess] = useState(false)
    const { addMessage } = useMessageContext()

    const validateName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        let errorMsg = namaValidator(newName)
        dispatch({ type: "SET_NAME", payload: newName });
        setErrors((prev) => ({ ...prev, nameError: errorMsg }));
    }, []);



    const validateEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value
        let errorMessage = emailValidator(newEmail)
        dispatch({ type: "SET_EMAIL", payload: newEmail })
        setErrors((prev) => ({ ...prev, emailError: errorMessage }))
    }, [])

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        try {
            e.preventDefault();

            let { name, email, message } = state;
            name = name.trim();
            email = email.trim();
            message = message.trim();

            let hasError = false;

            if (!name) {
                setErrors((prev) => ({ ...prev, nameError: "Name is required" }));
                hasError = true;
            } else {
                setErrors((prev) => ({ ...prev, nameError: "" }));
            }

            if (!email) {
                setErrors((prev) => ({ ...prev, emailError: "Email is required" }));
                hasError = true;
            } else {
                setErrors((prev) => ({ ...prev, emailError: "" }));
            }
            if (!message) {
                setErrors((prev) => ({ ...prev, messageError: "Message is required" }))
                hasError = true
            }
            else {
                setErrors((prev) => ({ ...prev, messageError: "" }));
            }

            if (hasError) return;
            addMessage({ message: "Form submitted:", type: "success" });
            const res = await apiHelper({
                method: "POST", url: `${BASE_URL}api/contact/`,
                data: {
                    from: state.email,
                    name: state.name,
                    message: state.message
                }
            })
            console.log("res", res)
            setFormSubmitSuccess(true);
            // Reset form state
            dispatch({ type: "SET_NAME", payload: "" });
            dispatch({ type: "SET_EMAIL", payload: "" });
            dispatch({ type: "SET_MESSAGE", payload: "" });

        } catch (error: any) {
            addMessage({ message: `Error while form submitting: ${error.message}`, type: "error" });
        }
    }, [state]);



    const value = useMemo(() => ({
        handleSubmit,
        validateEmail,
        validateName,
        errors,
        state,
        dispatch,
        isFormSubmitSuccess,
        setFormSubmitSuccess,

    }), [
        handleSubmit,
        validateEmail,
        validateName,
        errors,
        state,
        dispatch,
        isFormSubmitSuccess,
        setFormSubmitSuccess,
 
    ])

    return (
        <ContactFormContext.Provider value={value}>
            {children}
        </ContactFormContext.Provider>
    )
}
export const useContactForm = () => {
    const context = useContext(ContactFormContext)
    if (!context) {
        throw new Error("useContactForm must be used within ContactFormProvider")
    }
    return context
}
export default ContactFormProvider
