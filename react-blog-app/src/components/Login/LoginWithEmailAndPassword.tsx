

import EmailInput from '../EmailInput';
import { useAuth } from '../../Provider/AuthProvider';



const LoginWithEmailAndPassword = () => {
    const { state,  validatePassword, errors } = useAuth()
    const hasError = errors.passwordError !== ""
    return (
        <div>
            <EmailInput />
            <div className='my-5'>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    className={`text-black mt-1 w-full px-4 py-2 border
                        ${hasError ? " border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}
                          rounded-md focus:outline-none 
                         focus:ring-2 `}
                    value={state.password}
                    onChange={validatePassword}
                />
            </div>
        </div>
    );
};

export default LoginWithEmailAndPassword;
