import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { socialLinks } from '../../helper/social-links';

const iconClasses =
  'text-xl md:text-2xl transition-colors duration-300 hover:scale-110';

const Social = () => {
  return (
    <div className="flex gap-4 items-center justify-center mt-4">
      {socialLinks.facebook && (
        <Link
          to={socialLinks.facebook}
          target="_blank"
          aria-label="Facebook"
          className={`${iconClasses} text-blue-600 hover:text-blue-400`}
        >
          <FaFacebook />
        </Link>
      )}
      {socialLinks.twiter && (
        <Link
          to={socialLinks.twiter}
          target="_blank"
          aria-label="Twitter"
          className={`${iconClasses} text-blue-500 hover:text-blue-300`}
        >
          <FaTwitter />
        </Link>
      )}
      {socialLinks.instagram && (
        <Link
          to={socialLinks.instagram}
          target="_blank"
          aria-label="Instagram"
          className={`${iconClasses} text-pink-600 hover:text-pink-400`}
        >
          <FaInstagram />
        </Link>
      )}
      {socialLinks.linkedin && (
        <Link
          to={socialLinks.linkedin}
          target="_blank"
          aria-label="LinkedIn"
          className={`${iconClasses} text-blue-700 hover:text-blue-500`}
        >
          <FaLinkedin />
        </Link>
      )}
    </div>
  );
};

export default Social;
