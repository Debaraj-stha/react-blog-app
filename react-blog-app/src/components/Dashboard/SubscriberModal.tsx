import React from 'react';
import type { SubscriberType } from '../../types/author';
import NameAvatar from '../NameAvatar';
import Modal from '../Modal';


type Props = {
    subscribers: SubscriberType[] | undefined;
    onClose: () => void;
};

const SubscriberModal = ({ subscribers, onClose }:Props) => {
    return (
        <Modal extraClassName="overflow-y-auto">
            <div className="min-h-screen flex items-start sm:items-center justify-center pt-10 pb-10">
                <div className="bg-white dark:bg-gray-800 w-full max-w-lg rounded-lg shadow-xl p-6 relative">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                        Subscribers ({subscribers?.length || 0})
                    </h2>

                    <div className="max-h-96 overflow-y-auto space-y-4">
                        
                        {subscribers && subscribers.length > 0 ? (
                            subscribers.map((sub, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-4 p-2 border-b border-gray-200 dark:border-gray-700"
                                >
                                    {sub.profile ? (
                                        <img
                                            src={sub.profile}
                                            alt={sub.name}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    ) : (
                                        <NameAvatar name={sub.name} />
                                    )}
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            {sub.name}
                                        </p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                            {sub.email}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                            Subscribed on: {new Date(sub.subscribedSince).toDateString()}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600 dark:text-gray-400">No subscribers found.</p>
                        )}
                    </div>

                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                        ✕
                    </button>
                </div>
            </div>
        </Modal>
    );
};


export default SubscriberModal;
