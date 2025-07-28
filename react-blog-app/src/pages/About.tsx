import React from 'react';
import WhatWeOffer from '../components/About/WhatWeOffer';
import WhoWeAre from '../components/About/WhoWeAre';
import WelcomeMessage from '../components/About/WelcomeMessage';
import ToContact from '../components/About/ToContact';
import { Helmet } from 'react-helmet';

const About = () => {
    return (
        <div className="max-w-3xl mx-auto py-12 px-4 text-gray-100">
            <Helmet>
                <title>About - React Blog App</title>
                <meta name='keywords' content='react, blog, articles, posts about' />
            </Helmet>
            <h1 className="text-4xl font-bold mb-6 text-center text-gray-100 dark:text-gray-300">About Us</h1>
            <WelcomeMessage />
            <WhoWeAre />
            <WhatWeOffer />
            <ToContact />
        </div>
    );
};

export default About;
