import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Provider/AuthProvider';
import { FaGithub } from 'react-icons/fa';

const LoginWithGithub = () => {
  const { signWithGitHub } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const handleClick = async () => {
    signWithGitHub(from, navigate, location);
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center justify-center gap-3 py-2 px-4 rounded-md 
                 border-2 border-gray-600 dark:border-gray-400 
                 text-gray-800 dark:text-gray-100 
                 bg-gray-300 dark:bg-gray-800 
                 hover:bg-gray-400 dark:hover:bg-gray-700 
                 transition-all duration-200 shadow-sm"
    >
      <FaGithub className="text-black dark:text-white text-lg" />
      <span>Login with GitHub</span>
    </button>
  );
};

export default LoginWithGithub;
