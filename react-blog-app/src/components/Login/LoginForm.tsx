import React, { useEffect } from 'react'

import LoginWithGithub from './LoginWithGithub'
import LoginWithGoogle from './LoginWithGoogle'
import LoginWithEmailAndPassword from './LoginWithEmailAndPassword'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import LoginWithEmail from './LoginWithEmail'
import { ErrorMessage } from '../../styled-element/paragraph'
import { useAuth } from '../../Provider/AuthProvider'
type Props = {
  classList: string,
  text: string,
  onClick: React.MouseEventHandler<HTMLButtonElement>
}


const Button = ({ classList, text, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`w-full my-3 text-white py-2 px-4 rounded-md  transition ${classList}`}
    >
      {text}
    </button>
  )
}


export const LoginOptions = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth()
  const state = location.state;

  const loginWithEmail = () => {
    navigate('/login/with_email', { state });
  };

  const loginWithEmailPassword = () => {
    navigate('/login/with_email_password', { state });
  };
  useEffect(() => {
    if (user) {
      navigate(state ? state.from : "/")
    }
  }, [user])

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="w-full max-w-sm bg-white dark:bg-gray-100 p-8 rounded-xl shadow-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-black">Login With</h2>
        <Button
          text="Login with Email And Password"
          classList="bg-blue-600 hover:bg-blue-700"
          onClick={loginWithEmailPassword}
        />
        <Button
          text="Login with Email"
          classList="bg-green-600 hover:bg-green-700"
          onClick={loginWithEmail}
        />
        <LoginWithGoogle />
        <LoginWithGithub />
      </div>
    </div>
  );
};





const LoginForm = () => {
  const { type } = useParams();
  const { onSubmit, errors, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state=location.state
  //if login already redirect back to page
  useEffect(() => {
    if (user) {
      navigate(state ? state.from : "/")
    }
  }, [user])


  const isSignedWithEmail = type?.toLowerCase() === 'with_email';

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="w-full max-w-sm bg-white dark:bg-gray-100 p-8 rounded-xl shadow-md space-y-4">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <form
          className="space-y-4"
          onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
            onSubmit(e, isSignedWithEmail, navigate, location)
          }
        >
          {isSignedWithEmail ? <LoginWithEmail /> : <LoginWithEmailAndPassword />}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Sign In
          </button>

          {errors.emailError && <ErrorMessage>{errors.emailError}</ErrorMessage>}
          {errors.passwordError && <ErrorMessage>{errors.passwordError}</ErrorMessage>}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;


