import React, { useEffect } from 'react'
import LoginForm, { LoginOptions } from '../components/Login/LoginForm'
import { firebaseAuth } from '../../firebase.config';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';


const Login = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      if (!user) {
        // User is signed out
        navigate('/login');
      } else {
        // User is signed in
        navigate("/")
        console.log('Logged in user:', user);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className='bg-blue-500'>
      <Helmet>
        <title>Login - React Blog App</title>
        <meta name='keywords' content='react, blog, articles, posts' />
      </Helmet>
      <LoginOptions />

    </div>
  )
}

export default Login
