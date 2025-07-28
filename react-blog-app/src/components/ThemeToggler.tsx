import React from 'react'
import ToolTip from './ToolTip'

import { BiMoon, BiSun } from 'react-icons/bi'
import { useTheme } from '../Provider/ThemeProvider'

const ThemeToggler = () => {
    const { isDark, toggleTheme } = useTheme()
    return (
        <ToolTip message='Change Theme'>
            <button
                onClick={toggleTheme}
                className="group bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-md transition-colors duration-500"
            >
                <span className="transition-all duration-300 ease-in-out transform group-hover:animate-pulse group-hover:scale-110">
                    {!isDark ? <BiSun className="animate-spin-slow" /> : <BiMoon />}
                </span>
            </button>

        </ToolTip>
    )
}

export default ThemeToggler
