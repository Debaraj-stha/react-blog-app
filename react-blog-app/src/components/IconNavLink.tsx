import React from 'react'
import { StyledNavLi } from '../styled-element/list'
import { Link, useLocation } from 'react-router-dom'

interface IconNavLinkProps {
  text: string
  link: string
  Icon: React.ElementType
  padding?: string,
  hoverBg?: string,
state?: { from?: string }
}

const IconNavLink = ({ text, link, Icon, padding, hoverBg,state }: IconNavLinkProps) => {
  const location = useLocation();
//for styling,check which navlink is active
  const isActive = link === '/'
  ? location.pathname === '/'
  : location.pathname.startsWith(link);


  return (
    <StyledNavLi
      padding={padding ?? ''}
      hoverBg={hoverBg}
      className={`nav-link ${isActive ? 'active' : ''}`}
    >
      <Link to={link} state={state}>
        <Icon className="mr-1 hidden lg:inline" /> {text}
      </Link>
    </StyledNavLi>
  )
}

export default IconNavLink;
