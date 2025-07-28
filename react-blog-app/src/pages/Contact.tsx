import { Helmet } from "react-helmet"
import AnimationPopup from "../components/AnimationPopup"
import ContactForm from "../components/Contact/ContactForm"
import { useContactForm } from "../Provider/ContactFormProvider"

const Contact = () => {
  const { isFormSubmitSuccess, setFormSubmitSuccess } = useContactForm()
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 text-gray-100">
      <Helmet>
        <title>Contact - React Blog App</title>
        <meta name='keywords' content='react, blog, articles, posts contact' />
      </Helmet>
      <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
      <p className="text-center mb-4 ">
        Have questions, feedback, or ideas? We’d love to hear from you!
      </p>
      <ContactForm />
      <div className="text-center mt-6 ">
        <p>Prefer email? Reach us at <a href="mailto:you@example.com" className="text-blue-600 hover:underline">you@example.com</a></p>
        <p className="mt-2">
          Follow us on
          <a href="https://twitter.com/yourhandle" className="text-blue-600 hover:underline mx-1">Twitter</a>
          or
          <a href="https://instagram.com/yourhandle" className="text-blue-600 hover:underline mx-1">Instagram</a>
        </p>
      </div>
      {
        isFormSubmitSuccess && <AnimationPopup message="Form Submitted Successfully"><button onClick={() => setFormSubmitSuccess(false)}>Close</button></AnimationPopup>
      }
    </div>

  )
}

export default Contact