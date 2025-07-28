import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import {
  BiHome,
  BiBook,
  BiInfoCircle,
  BiPhone,
  BiUser,
  BiPlusCircle,
  BiMenu
} from 'react-icons/bi';
import { CgCloseR } from 'react-icons/cg';
import IconNavLink from '../IconNavLink';
import Usercard from '../Usercard';
import { useAuth } from '../../Provider/AuthProvider';

const Nav = () => {
  const [show, setShow] = useState(false)
  const { user, loading } = useAuth()
  const location = useLocation()
  const currentPath = location.pathname;
  const hideLoginButtonOnPaths = ["/login", "/login/with_email", "/login/with_email_password"]
  const shouldHide = hideLoginButtonOnPaths.some(path => currentPath.startsWith(path));
  const toggleMenu = () => {
    setShow((prev) => !prev)
  }


  return (
    <div className='sm:flex justify-between relative flex-col sm:flex-row'>
      {/* Banner + toggle button */}
      <div className='website-banner flex justify-between items-center '>
        <li className='list-none hover:translate-x-2 duration-400 hover:animate-pulse'>
          <Link to="/">
            React Blog
          </Link>
        </li>

        {/* Show hamburger icon only on small screens */}
        <button className='sm:hidden text-2xl ' onClick={toggleMenu}>
          {
            show ? <CgCloseR className='text-red-500 hover:text-red-600' /> : <BiMenu className='text-blue-500 hover:text-blue-600' />
          }
        </button>
      </div>

      {/* Nav Links - always visible on sm and up, toggle on mobile */}
      <div className={`menus sm:flex flex-col sm:flex-row ${show ? 'block' : 'hidden'} sm:block`}>
        <ul className='flex flex-col sm:flex-row gap-2 sm:gap-6'>
          <IconNavLink text="Home" link="/" Icon={BiHome} padding='0px 10px' />
          <IconNavLink text="Blog" link="/blogs" Icon={BiBook} padding='0px 10px' />
          <IconNavLink text="About" link="/about" Icon={BiInfoCircle} padding='0px 10px' />
          <IconNavLink text="Contact" link="/contact" Icon={BiPhone} padding='0px 10px' />
          {
            !shouldHide && <IconNavLink text="Create Post" link="/create-post" Icon={BiPlusCircle} padding='0px 10px' />
          }

        </ul>
      </div>
      <div className={`menus sm:flex flex-col items-center gap-3 sm:flex-row ${show ? 'block' : 'hidden'} sm:block`}>
        <Usercard />

        {
          loading && (
            <p className="text-sm font-semibold text-blue-500 animate-pulse">
              Authenticating...
            </p>
          )
        }
        {
          !loading && !user && !shouldHide && <IconNavLink
            text="Login / Signup"
            link="/login"
            Icon={BiUser}
            padding="0px 10px"
            state={{from:location.pathname}}
          />
        }






      </div>
    </div>
  );

}

export default Nav;
