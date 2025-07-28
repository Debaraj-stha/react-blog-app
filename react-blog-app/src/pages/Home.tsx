import React, { useEffect } from 'react'
import { useAuth } from '../Provider/AuthProvider'
import { firebaseAuth } from '../../firebase.config'
import { Link, useNavigate } from 'react-router-dom'
import CallToAction from '../components/CallToAction'
import CategoriesLink from '../components/CategoriesLink'

import RecentPosts from '../components/RecentPosts'
import HeroSection from '../components/HeroSection'
import BlogProvider from '../Provider/BlogProvider'
import RecentPostWithProviders from '../components/RecentPostWithProviders'
import AuthorProvider from '../Provider/AuthorProvider'

const Home = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  console.log("user", user)
  useEffect(() => {
    if (!user) {
      const email = localStorage.getItem("emailForSignIn")
      console.log("email", email)
      if (email) {
        navigate("email-verify")
      }
    }
  }, [])



  return (
    <div className="flex flex-col">

      {/* Hero Section */}
      <HeroSection />

      {/* Recent Posts */}
      <RecentPostWithProviders />
      {/* Categories Section */}
      <CategoriesLink />
      {/* Call to Action / Footer */}
      <AuthorProvider>
        <CallToAction />
      </AuthorProvider>

    </div>
  );
}

export default Home
