import React from 'react';
import QuickLinks from './QuickLinks';
import Brannding from './Brannding';
import CategoriesAndSocial from './CategoriesAndSocial';
import Bottom from './Bottom';

const Footer = () => {
    return (
        <footer className=" bg-gray-800 dark:bg-gray-900 text-gray-300 py-10">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Branding */}
                <Brannding />
                {/* Quick Links */}
                <QuickLinks />
                {/* Categories and Social */}
                <CategoriesAndSocial />
            </div >
            {/* Bottom */}
            <Bottom/>
        </footer>
    );
};

export default Footer;
