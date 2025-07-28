import React from 'react'
import Dashboard from '../pages/Dashboard'
import AuthorProvider from '../Provider/AuthorProvider'

const DashboardWithProvider = () => {
  return (
    <AuthorProvider>
      <Dashboard/>
    </AuthorProvider>
  )
}

export default DashboardWithProvider
