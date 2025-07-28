import React, { useState, type ReactNode } from 'react';
import LogoutButton from '../components/LogoutButton';
import SubscribeButton from '../components/SubscribeButton';
import AuthorProvider from '../Provider/AuthorProvider';
import { useAuth } from '../Provider/AuthProvider';
import { useTheme } from '../Provider/ThemeProvider';
import { BiMoon, BiSun } from 'react-icons/bi';
import ThemeToggler from '../components/ThemeToggler';
import ToolTip from '../components/ToolTip';
const SectonWrapper = ({ children }: { children: ReactNode }) => {
    return <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm space-y-4">
        {children}
    </section>
}

const Setting = () => {
    const { deleteAccount } = useAuth();



    const handleDeleteAccount = () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            deleteAccount();
        }
    };



    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <h1 className="text-3xl font-bold  text-white dark:text-gray-200">Settings</h1>

            <SectonWrapper>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Notification</h2>
                <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">Stay Updated</h3>
                <p className="mb-4 text-gray-800 dark:text-gray-100">
                    Subscribe to get the latest posts delivered straight to your inbox.
                </p>
                <AuthorProvider>
                    <SubscribeButton />
                </AuthorProvider>
            </SectonWrapper>

            <SectonWrapper>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Preference</h2>
                <div className="flex items-center justify-between">
                    <span className="text-gray-800 dark:text-gray-100 font-medium">Theme</span>
                   <ThemeToggler/>
                </div>
            </SectonWrapper>

            <SectonWrapper>
                <h2 className="text-xl font-semibold text-red-600">Danger Zone</h2>
                <div className="flex flex-wrap gap-4">
                  <ToolTip message='Delete Account'>
                      <button
                        onClick={handleDeleteAccount}
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                        type="button"
                        aria-label="Delete Account"
                    >
                        Delete Account
                    </button>
                  </ToolTip>
                    <ToolTip message='Logout'>
                        <LogoutButton />
                    </ToolTip>
                </div>
            </SectonWrapper>
        </div>
    );
};


export default Setting;
