import type { ContactFormAction, ContactFormState } from "../../types/contact";

    const contactReducer = (state: ContactFormState, action: ContactFormAction): ContactFormState => {
        switch (action.type) {
            case 'SET_NAME':
                return { ...state, name: action.payload };
            case 'SET_EMAIL':
                return { ...state, email: action.payload };
            case 'SET_MESSAGE':
                return { ...state, message: action.payload };
            default:
                return state;
        }
    };
    export default contactReducer;