import React from 'react'
import type { FormAction, FormState } from '../types/login';
import { useAuth } from '../Provider/AuthProvider';
type Props = {
    state: FormState;
    dispatch: React.Dispatch<FormAction>;
};
const EmailInput = () => {

    const { state, onChange, errors } = useAuth()
    const hasError = errors.emailError !== ""
    return (
        <div className='my-5'>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
            </label>
            <input
                type="email"
                id="email"
                className={`text-black mt-1 w-full px-4 py-2 border ${hasError ? 'border-red-500' : 'border-gray-300 '}
                rounded-md focus:outline-none ${hasError ? 'focus:ring-red-500' : 'focus:ring-blue-500 '}`}
                value={state.email}
                onChange={onChange}

            />
        </div>
    )
}

export default EmailInput
