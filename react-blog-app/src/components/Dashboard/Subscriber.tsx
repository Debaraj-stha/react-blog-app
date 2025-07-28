import React, { useState } from 'react';
import { FaUserFriends } from 'react-icons/fa';
import { useAuthor } from '../../Provider/AuthorProvider';
import SubscriberModal from './SubscriberModal';
import { useParams } from 'react-router-dom';



const Subscriber = () => {

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { fetchSubscriber,dashboardCounts,subscribers } = useAuthor()
  const { author_id } = useParams()
  const handleViewSubscribers = () => {
    try {
      setShowModal(true);
      setLoading(true);
      fetchSubscriber(author_id!)
    } catch (err) {
      console.error('Failed to fetch subscribers:', err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <div className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FaUserFriends className="text-blue-600 text-2xl" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Subscriber</p>
            <p className="text-xl font-semibold text-gray-900 dark:text-white">
              {dashboardCounts?.subscriberCount || 0}
            </p>
          </div>
        </div>
        <button
          onClick={handleViewSubscribers}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          View Subscriber
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <SubscriberModal
          subscribers={loading ? [] : subscribers}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default Subscriber;
