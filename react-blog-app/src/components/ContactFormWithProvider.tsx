import React from 'react'
import ContactFormProvider from '../Provider/ContactFormProvider'
import Contact from '../pages/Contact'

const ContactFormWithProvider = () => {
  return (
    <ContactFormProvider>
        <Contact/>
    </ContactFormProvider>
  )
}

export default ContactFormWithProvider
