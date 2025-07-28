import React from 'react'
import { Helmet } from 'react-helmet'

const EmailVerify = () => {
  return (
    <div className='flex h-screen justify-center items-center bg-gray-100'>
      <Helmet>
        <title>Email Verify - React Blog App</title>
        <meta name='keywords' content='react, blog, articles, posts' />
      </Helmet>
      <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-md">
        <h2 className='text-green-600 font-bold text-lg text-center pb-4'>Verify Your Email</h2>
        <p className='text-md text-blue-500 text-center font-semibold'>We have sent a email to your account.Please verify first</p>
      </div>
    </div>
  )
}


export default EmailVerify
