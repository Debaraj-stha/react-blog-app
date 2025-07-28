import React, { memo } from 'react'
import { StyledNavLi } from '../styled-element/list'
import { Link } from 'react-router-dom'
type NavLinkProps = {
    text: string;
    link: string;
    padding?: string;
    hoverBg?: string;
    lineBg?: string;
    margin?: string;
    textColor?:string;
    setWidth?:boolean
}
const NavLink = memo(({ text, link, margin, padding, hoverBg,lineBg ,textColor,setWidth}: NavLinkProps) => {
    return (
        <StyledNavLi margin={margin} padding={padding} hoverBg={hoverBg} lineBg={lineBg} textColor={textColor} setWidth={setWidth}>
            <Link to={link}>{text}</Link>
        </StyledNavLi>
    )
})

export default NavLink
