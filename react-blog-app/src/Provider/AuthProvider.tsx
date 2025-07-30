import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useReducer,
    useState,
    type ReactNode,
} from "react";
import type { User } from "../types/login";
import { firebaseAuth } from "../../firebase.config"
import {
    createUserWithEmailAndPassword,
    GithubAuthProvider,
    sendSignInLinkToEmail,
    signInWithEmailAndPassword,
    signInWithPopup
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import type { User as FirebaseUser } from "firebase/auth";
import { removeLocalStorageItem } from "../helper/utils";
import { useNavigate, type Location } from "react-router-dom";
import type { AuthContextType } from "../types/authContextType";
import { emailRegex, passwordRegex } from "../helper/regex";
import { useMessageContext } from "./MessageProviders";
import apiHelper from "../helper/api-helper";
import { BASE_URL } from "../constraints";
import formReducer from "../helper/reducers/LoginReducer";
import useSignout from "../helper/hooks/useSignout";




export const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
    children: ReactNode;
};
const LOGIN_METHOD = {
    EMAIL: "email" as const,
    EMAIL_PASSWORD: "email_password" as const,
    GITHUB: "github" as const,
    GOOGLE: "google" as const,
};




export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [loading, setLoading] = useState(false);
    const [authError, setAuthError] = useState<string | null>(null);

    const { addMessage } = useMessageContext()


    const [errors, setErrors] = useState({
        emailError: "",
        passwordError: "",
    });
    const [user, setUser] = useState<User | null>(null)
    const [state, dispatch] = useReducer(formReducer, {
        email: "",
        password: "",
    });

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        dispatch({ type: "SET_EMAIL", payload: value });

        if (!emailRegex.test(value)) {
            setErrors((prev) => ({
                ...prev,
                emailError: "Invalid Email Address. Please enter a valid one.",
            }));
        } else {
            setErrors((prev) => ({ ...prev, emailError: "" }));
        }
    }, []);
    const loginWithEmailPassword = useCallback(async () => {
        try {
            const res = await signInWithEmailAndPassword(firebaseAuth, state.email, state.password);
            const message = `Login Successful`
            addMessage({ message, type: "success" })

            return res
        } catch (error: any) {
            //console.log(error.code)
            if (error.code === 'auth/invalid-credential') {
                try {
                    const newUser = await createUserWithEmailAndPassword(firebaseAuth, state.email, state.password);
                    addMessage({ message: "Sign up successfully", type: "success" })
                    return newUser
                } catch (createError) {
                    throw createError
                }
            } else {
                throw error
            }
        }
    }, [state])

    const loginWithEmail = useCallback(async () => {
        try {
            const actionCodeSettings = {
                url: import.meta.env.VITE_REDIRECT_URL,
                handleCodeInApp: true,
            };
            await sendSignInLinkToEmail(firebaseAuth, state.email, actionCodeSettings);
            localStorage.setItem('emailForSignIn', state.email); // Store email for later verification
            const message = `A sign-in link has been sent to your email!`
            addMessage({ message, type: "success" })
        } catch (error: any) {
            addMessage({ message: `Error Login with Email:${error.message}`, type: "error" })
            setAuthError(error)
            throw error;
        }
    }, [])

    const validateInput = useCallback((isLoginWithEmail: boolean) => {
        let hasError = false;
        const newErrors = { emailError: "", passwordError: "" };
        if (!state.email || state.email.trim() === "") {
            newErrors.emailError = "Email is empty";
            hasError = true;
        }
        if (!isLoginWithEmail) {
            if (!state.password || state.password.trim() === "") {
                newErrors.passwordError = "Password is empty";
                hasError = true;
            }
        }
        setErrors(newErrors);
        return hasError

    }, [state])
    const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>,
        isLoginWithEmail: boolean,
        navigate: ReturnType<typeof useNavigate>,
        location: Location
    ) => {
        try {
            e.preventDefault();
            setLoading(true);
            let hasError = validateInput(isLoginWithEmail)
            let res
            if (!hasError) {
                if (isLoginWithEmail) {
                    await loginWithEmail()
                    // handleLoginUser(res.user, LOGIN_METHOD.EMAIL)
                }
                else {
                    //removing email store on local storage
                    removeLocalStorageItem("emailForSignIn")
                    res = await loginWithEmailPassword()
                    await handleLoginUser(res.user, LOGIN_METHOD.EMAIL_PASSWORD, navigate, location)
                }
            }
        } catch (error: any) {
            addMessage({ message: `error while signing:${error.message}`, type: "error" })
            setAuthError(error)
        }
        finally {
            setLoading(false)
        }
    }, [state, validateInput]);
    const validatePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const password = e.target.value;
        dispatch({ type: "SET_PASSWORD", payload: password });

        if (!passwordRegex.test(password)) {
            setErrors((prev) => ({
                ...prev,
                passwordError:
                    `Password should contain small letter, capital letter, 
                    number, special character and should be at least 8 characters long.`,
            }));
        } else {
            setErrors((prev) => ({ ...prev, passwordError: "" }));
        }
    }, [state]);
    /**
     * function to handle the signin user
     * @param user 
     */
    const handleLoginUser = useCallback(async (user: FirebaseUser,
        loginMethod?: string,
        navigate?: ReturnType<typeof useNavigate>,
        location?: Location,
        from?: string
    ) => {
        try {
            const data = {
                name: user.displayName,
                email: user.email,
                profile: user.photoURL,
                authId: user.uid
            }
            const res = await apiHelper({ url: `${BASE_URL}api/user/`, method: "POST", data: data })
            const authUser: User = {
                id: user.uid,
                user_id: res!.user!._id,
                name: user?.displayName ?? "",
                email: user?.email ?? "",
                image: user?.photoURL ?? "",
                lastLogin: user?.metadata?.lastSignInTime,
                loginMethod,
                isVarified: user.emailVerified
            };
            if (navigate && location) {
                const stateFrom = from || location.state.from
                const redirectTo = stateFrom === "/login"
                    || stateFrom === "/login/with_email"
                    || "/login/with_email_password" ||
                    !stateFrom ? "/" : stateFrom
                console.log("redirecting to", redirectTo)
                navigate(stateFrom)
            }
            setUser(authUser);
            //clear form field after success
            dispatch({type:"RESET"})
        } catch (error) {
            throw error;
        }
    }, []);
    /**
     * function to signin with github using firebase
     */
    const signWithGitHub = useCallback(async (from?: string, navigate?: ReturnType<typeof useNavigate>, location?: Location) => {
        try {
            const provider = new GithubAuthProvider()
            const result = await signInWithPopup(firebaseAuth, provider);
            const user = result.user;
            await handleLoginUser(user, LOGIN_METHOD.GITHUB, navigate, location, from)
            addMessage({ message: `Signed in as ${user.displayName}`, type: "success" })
            removeLocalStorageItem("emailForSignIn")
        } catch (error: any) {
            addMessage({ message: `Error signin with Github ${error.message}`, type: "error" })
            setAuthError(error)
            return false
        }
    }, [])
    const signWithGoogle = useCallback(async (from?: string, navigate?: ReturnType<typeof useNavigate>, location?: Location) => {
        try {
            setLoading(true)
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(firebaseAuth, provider);
            const user = result.user
            await handleLoginUser(user, LOGIN_METHOD.GOOGLE, navigate, location, from)
            removeLocalStorageItem("emailForSignIn")
            addMessage({ message: `Signed in as ${user.displayName}`, type: "success" })

        } catch (error: any) {
            addMessage({ message: `Error signin with Google ${error.message}`, type: "error" })
            setAuthError(error)
            return false
        }
        finally{
            setLoading(false)
        }
    }, []);
    const deleteAccount = useCallback(async () => {
        try {
            if (!user?.user_id) {
                addMessage({ message: "Can not perform this action .Try again later" })
                return
            }
            const res = await apiHelper({ url: `${BASE_URL}/api/user/${user.user_id}`, method: "DELETE" })
            if (res) {
                addMessage({ message: res.message })
                useSignout(false)

            }

        } catch (error) {
            console.log("error while deleting account", error)

        }
    }, [user?.user_id])

    useEffect(() => {
        setLoading(true)
        const fetchUserId = async (authId: string) => {
            const res = await apiHelper({ url: `${BASE_URL}api/user/user-id/${authId}` })
            if (res)
                return { userId: res.userId!, author_id: res.author_id }


        }
        const unsubscribe = firebaseAuth.onAuthStateChanged(async (user) => {
            if (!user) {
                console.log("user is null", user);
                setUser(null);
            } else {
                const userInfo = await fetchUserId(user.uid);

                const user_id = userInfo?.userId;
                const author_id = userInfo?.author_id;
                const authUser: User = {
                    id: user.uid,
                    user_id,
                    author_id: author_id,
                    name: user.displayName ?? "",
                    email: user.email ?? "",
                    image: user.photoURL ?? "",
                    lastLogin: user.metadata?.lastSignInTime,
                    isVarified: user.emailVerified
                };
                setUser(authUser);
                console.log("user info", authUser)

            }
            setLoading(false)
        });


        return () => unsubscribe();
    }, []);


    const value = useMemo(() => ({
        state,
        errors,
        dispatch,
        setErrors,
        onChange,
        onSubmit,
        validatePassword,
        signWithGitHub,
        signWithGoogle,
        user,
        loading,
        authError,
        deleteAccount,
        setLoading


    }), [
        state,
        errors,
        dispatch,
        setErrors,
        onChange,
        onSubmit,
        validatePassword,
        signWithGitHub,
        signWithGoogle,
        user,
        loading,
        authError,
        deleteAccount,
        setLoading
    ]);

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
