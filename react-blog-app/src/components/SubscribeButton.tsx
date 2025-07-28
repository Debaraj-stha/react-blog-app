import React, { useEffect } from 'react'
import useLoginAndSubscribe from '../helper/hooks/useLoginAndSubscribe'
import { useAuthor } from '../Provider/AuthorProvider'
import { useAuth } from '../Provider/AuthProvider'
import ToolTip from './ToolTip'

const SubscribeButton = () => {
    const { loading, fetchSubscriptionStatus, subscriberCountWithStatus } = useAuthor()
    const loginAndSubscribe = useLoginAndSubscribe(undefined, subscriberCountWithStatus?.hasSubscribed, true)
    const { user } = useAuth()
    useEffect(() => {
        fetchSubscriptionStatus()
    }, [user])

    return (
        
        <ToolTip message='Subscribe'>
            <button
            onClick={loginAndSubscribe}
            className="inline-block bg-gray-200 dark:bg-gray-300 text-blue-600 px-6 py-2 rounded shadow hover:bg-gray-100 dark:hover:bg-gray-200 transition"
        >
            {loading ? "Checking..." : subscriberCountWithStatus?.hasSubscribed ? "Subscribed" : "Subscribe"}
        </button>
        </ToolTip>
    )
}

export default SubscribeButton
