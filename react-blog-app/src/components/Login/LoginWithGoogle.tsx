import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Provider/AuthProvider';
import { FaGoogle } from 'react-icons/fa';

const LoginWithGoogle = () => {
  const { signWithGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || '/';

  const handleClick = async () => {
    signWithGoogle(from, navigate, location);
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center justify-center gap-3 py-2 px-4 rounded-md 
                 border-2 border-gray-600 dark:border-gray-400 
                 text-gray-800 dark:text-gray-100 
                 bg-white dark:bg-gray-800 
                 hover:bg-gray-100 dark:hover:bg-gray-700 
                 transition-all duration-200 shadow-sm"
    >
      <FaGoogle className="text-red-500 text-lg" />
      <span>Login with Google</span>
    </button>
  );
};

export default LoginWithGoogle;
