import React from 'react'
import { Link } from 'react-router-dom'

const ToContact = () => {
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-3">Get in Touch</h2>
            <p className="mb-4">
                We'd love to hear from you! Reach out via our <Link to="/contact" className="text-blue-600 hover:underline">Contact page</Link> for inquiries, feedback, or collaboration opportunities.
                You can also follow us on <Link to="https://twitter.com/" className="text-blue-600 hover:underline">Twitter</Link> and <Link to="https://instagram.com/" className="text-blue-600 hover:underline">Instagram</Link> to stay up to date with our latest posts.
            </p>

        </div>
    )
}

export default ToContact
