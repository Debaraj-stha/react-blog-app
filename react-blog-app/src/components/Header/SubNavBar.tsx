import { useState } from 'react';
import { Link } from 'react-router-dom';
import { StyledNavLi } from '../../styled-element/list';
import {
  BiCategory,
  BiLaptop,
  BiHappyBeaming,
  BiBriefcase,
  BiFootball,
} from 'react-icons/bi';
import { BsChevronDown } from 'react-icons/bs';
import IconNavLink from '../IconNavLink';  // Make sure you import it!

export const CategoriesNav = () => {
  const [show, setShow] = useState(false);
  const base = "/categories";

  // Toggle function for mobile
  const toggleShow = () => setShow((prev) => !prev);

  return (
    <StyledNavLi
      className='relative group z-50'
      // Only use hover for large screens
      onMouseEnter={() => window.innerWidth >= 1024 && setShow(true)}
      onMouseLeave={() => window.innerWidth >= 1024 && setShow(false)}
    >
      <div className="flex items-center justify-between">
        <Link to="/categories" className="flex items-center">
          <BiCategory className='mr-1 hidden lg:inline' />
          Categories
        </Link>

        {/* Toggle button only for small devices */}
        <button
          onClick={toggleShow}
          className="ml-2 text-sm sm:hidden"
          aria-label="Toggle Submenu"
        >
          <BsChevronDown
            className={`${show ? 'rotate-180' : ''} transition-transform text-blue-400`}
          />
        </button>
      </div>
      {show && (
        <ul className='absolute lg:group-hover:block bg-gray-100 px-3 py-2 rounded shadow-lg z-50 lg:top-full lg:left-0 w-max mb-3 sm:mb-0'>
          <IconNavLink text="Tech" link={`${base}/tech`} Icon={BiLaptop} />
          <IconNavLink text="Life Style" link={`${base}/life-style`} Icon={BiHappyBeaming} />
          <IconNavLink text="Business" link={`${base}/business`} Icon={BiBriefcase} />
          <IconNavLink text="Sports" link={`${base}/sports`} Icon={BiFootball} />
        </ul>
      )}
    </StyledNavLi>
  );
};
