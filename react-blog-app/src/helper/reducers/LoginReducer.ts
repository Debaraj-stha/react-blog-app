import type { FormAction, FormState } from "../../types/login";

    const formReducer = (state: FormState, action: FormAction): FormState => {
        switch (action.type) {
            case "SET_EMAIL":
                return { ...state, email: action.payload };
            case "SET_PASSWORD":
                return { ...state, password: action.payload };
            case 'RESET':
                return {email:"",password:""}
            default:
                return state;
        }
    };

    export default formReducer