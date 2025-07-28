import React, { useEffect, useRef } from 'react';
import Input from './Input';
import { MdOutlinePerson, MdEmail, MdFeedback } from 'react-icons/md';
import { useBlogContext } from '../Provider/BlogProvider';
import { useAuth } from '../Provider/AuthProvider';

const FeedbackOfBlogForm = () => {
  const { validateEmail, validateMessage, validateName, state, errors, submitFeedback, loading, setName, setEmail } = useBlogContext()
  const { user } = useAuth()
  useEffect(() => {
    //if user has already logged in set name and email
    if (user) {
      setName(user.name)
      setEmail(user.email)
    }
  }, [user])
  return (
    <div className="max-w-7xl mx-auto rounded-2xl py-16 px-4 bg-gradient-to-b from-blue-50 via-white to-blue-50 ">
      <div className="max-w-3xl mx-auto bg-white shadow rounded-3xl p-10 border border-gray-200">
        <h1 className="text-4xl font-bold mb-2 text-center text-gray-800">We value your feedback</h1>
        <p className="text-gray-600 text-center mb-8">Help us improve by sharing your thoughts!</p>

        <form className="space-y-6" onSubmit={submitFeedback}>
          {
            // only show name and email field if user has not logged in
            !user && (
              <>
                {/* Name Field */}
                <div className="relative">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name <span className='text-red-400'>*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute translate-y-1/2 left-0 pl-3 flex items-center text-gray-400">
                      <MdOutlinePerson size={20} />
                    </span>
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      extraClass={`pl-10 ${errors.nameError ? 'border border-red-400 focus:ring-red-300' : 'border border-gray-400'} `}
                      value={state.name}
                      onChange={validateName}
                    />
                    {
                      errors.nameError && <p className='text-red-500 text-sm'>{errors.nameError}</p>
                    }
                  </div>
                </div>

                {/* Email Field */}
                <div className="relative">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className='text-red-400'>*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute translate-y-1/2 left-0 pl-3 flex items-center text-gray-400">
                      <MdEmail size={20} />
                    </span>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      extraClass={`pl-10 ${errors.emailError ? 'border border-red-400 focus:ring-red-300' : ''} `}
                      value={state.email}
                      onChange={validateEmail}
                    />
                    {
                      errors.emailError && <p className='text-red-500 text-sm'>{errors.emailError}</p>
                    }
                  </div>
                </div>

              </>
            )
          }
          {/* Feedback Message Field */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Your Feedback <span className='text-red-400'>*</span>
            </label>
            <div className="relative">
              <span className="absolute translate-y-3.5 left-3 text-gray-400">
                <MdFeedback size={20} />
              </span>
              <textarea
                value={state.message}
                onChange={validateMessage}
                id="message"
                rows={5}
                placeholder="Share your thoughts about the blog..."
                className={`w-full text-black pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none 
                  focus:ring-2 focus:ring-blue-500 resize-none ${errors.messageError ? 'focus:ring-red-300' : ""}`}
              />
              {
                errors.messageError && <p className='text-red-500 text-sm'>{errors.messageError}</p>
              }
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className={`font-semibold py-3 px-8
                 rounded-full shadow-md transition-all duration-200 ease-in-out transform hover:scale-105
                 ${loading ? 'bg-gray-300 text-gray-800 hover:bg-gray-400 cursor-not-allowed' : "bg-blue-600 hover:bg-blue-700 text-white  cursor-pointer"}
                 `}
            >
              {loading ? "Submitting..." : "Submit Feedback"}

            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackOfBlogForm;
