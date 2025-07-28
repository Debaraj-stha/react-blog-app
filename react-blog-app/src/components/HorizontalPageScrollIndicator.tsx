import React, { useEffect, useState } from 'react';

const HorizontalPageScrollIndicator = () => {
    const [scrollProgress, setScrollProgress] = useState(0);
    useEffect(() => {
        const updateScroll = () => {
            const scrollTop = window.scrollY; //scroll position vertically
            const winHeight = document.documentElement.scrollHeight - window.innerHeight; //document height-window inner height
            const scrolled = (scrollTop / winHeight) * 100;//change to percentage
            setScrollProgress(scrolled);
        };

        const handleScroll = () => {
            requestAnimationFrame(updateScroll);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <div>
            <div className="bg-gray-100 h-2 w-full fixed z-50 top-0" ></div>
            <div
                className="bg-green-400 h-2 fixed top-0 left-0 z-50 transition-all duration-75 ease-linear"
                style={{ width: `${scrollProgress}%` }}
            ></div>
        </div>
    );
};

export default HorizontalPageScrollIndicator;
