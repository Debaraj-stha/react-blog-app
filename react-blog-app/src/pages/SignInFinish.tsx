import React, { useEffect } from 'react';
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { firebaseAuth } from '../../firebase.config';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../components/Loading';
import { Helmet } from 'react-helmet';



const SignInFinish = () => {
  const navigate = useNavigate()
  const completeSignIn = async (redirectTo: string, userMessage: HTMLElement) => {
    const emailLink = window.location.href;
    if (isSignInWithEmailLink(firebaseAuth, emailLink)) {
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        email = window.prompt('Please provide your email for confirmation');
      }
      if (!email) {
        console.error("No email provided. Cannot complete sign-in.");
        userMessage!.innerText = "Sign-in cancelled. Email is required.";
        return;
      }

      try {
        const userCredential = await signInWithEmailLink(firebaseAuth, email, emailLink);
        console.log("Signed in!", userCredential);
        window.localStorage.removeItem('emailForSignIn');
        navigate(redirectTo || '/');
      } catch (error) {
        console.error("Error signing in with email link:", error);
        userMessage.innerText = "Error signing in. Please try again.";
      }
    }
  };


  useEffect(() => {
    const userMessage = document.getElementById("user-message");
    const params = new URLSearchParams(window.location.search);
    const apiKey = params.get("apiKey");
    const redirectTo = params.get("redirectTo") || '/';

    console.log("redirect to", redirectTo);
    console.log(apiKey);

    if (apiKey) {
      completeSignIn(redirectTo, userMessage!);
    }

    const timer = setTimeout(() => {
      if (userMessage?.innerText === "Signing Finishing...") {
        userMessage.innerText = "Redirecting...";
      }
    }, 3000);
    if (redirectTo) {
      navigate(redirectTo)
    }

    return () => {
      clearTimeout(timer);
    }
  }, []);
  
  return (
    <div className='text-center flex h-screen justify-center items-center'>
        <Helmet>
        <title>Signin finish - React Blog App</title>
        <meta name='keywords' content='react, blog, articles, posts signin finish' />
      </Helmet>
      <div>
        <h1 id='user-message'>Signing Finishing...</h1>
        <Loader />
      </div>
    </div>
  );
};

export default SignInFinish;
