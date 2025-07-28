import React from 'react'
import NavLink from '../NavLink'

const QuickLinks = () => {
    return (
        <div>
            <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
                <NavLink link="/contact-us" text="Contact" margin='10px 0px' hoverBg='transparent'  lineBg='transparent'/>
                <NavLink link="/about-us" text="About" margin='10px 0px' hoverBg='transparent'  lineBg='transparent'/>
                <NavLink link="/privacy-policy" text="Privacy & Policy" margin='10px 0px'hoverBg='transparent'  lineBg='transparent' />
            </ul>
        </div>

    )
}

export default QuickLinks
