import type { Location, NavigateFunction } from "react-router-dom";
import type { FormAction, FormState, User } from "./login";
import type { SetStateAction } from "react";


export type AuthContextType = {
    state: FormState;
    errors: {
        emailError: string;
        passwordError: string;
    };
    dispatch: React.Dispatch<FormAction>;
    setErrors: React.Dispatch<
        React.SetStateAction<{ emailError: string; passwordError: string }>
    >;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>, isLoginWithEmail: boolean, navigate: NavigateFunction,location:Location) => void;
    validatePassword: (e: React.ChangeEvent<HTMLInputElement>) => void,
    signWithGitHub: (from?:string,navigate?:NavigateFunction,location?:Location) => void;
    signWithGoogle: (from?:string,navigate?:NavigateFunction,location?:Location) => void,
    user: User | null,
    loading: boolean,
    authError: string | null;
    deleteAccount:()=>void
    setLoading:React.Dispatch<SetStateAction<boolean>>
    

};
