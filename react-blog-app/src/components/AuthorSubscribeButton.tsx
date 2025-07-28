import React, { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../Provider/AuthProvider'
import { useAuthor } from '../Provider/AuthorProvider'
import useLoginAndSubscribe from '../helper/hooks/useLoginAndSubscribe'

type Props = {
    author_id?: string | null
}

const AuthorSubscribeButton = React.memo(({
    author_id = null,

}: Props) => {

    const {  subscriberCountWithStatus,fetchSubscriptionStatus } = useAuthor()
    const loginAndSubscribe = useLoginAndSubscribe(author_id!, false, false)
    const { user } = useAuth()

    useEffect(() => {
    fetchSubscriptionStatus()
  }, [user])
    if (!subscriberCountWithStatus) return
    const { hasSubscribed, subscriberCount } = subscriberCountWithStatus!

    // const handleClick = async () => {
    //     const success = await handleSubscribeUnsubscribe(
    //         user?.user_id!,
    //         subscribed,
    //         isSubscribedToAll,
    //         author_id!
    //     )

    //     if (success) {
    //         const isNowSubscribed = !subscribed
    //         setSubscribed(isNowSubscribed)
    //         setCount(prev => isNowSubscribed ? prev + 1 : Math.max(prev - 1, 0))
    //     }
    // }

    return (
        <div className="flex items-center space-x-4">
            <button
                onClick={loginAndSubscribe}
                className={`
                    flex items-center gap-1 px-5 py-2 rounded-full shadow text-white font-medium text-sm
                    transition-all duration-200
                    ${hasSubscribed!
                        ? 'bg-blue-700 cursor-not-allowed'
                        : 'bg-blue-400 hover:bg-blue-500 active:scale-95'
                    }
                `}
            >
                {hasSubscribed ? 'Subscribed' : 'Subscribe'}
            </button>
            <span className="text-sm text-gray-300">
                {subscriberCount!} {subscriberCount! === 1 ? 'subscriber' : 'subscribers'}
            </span>
        </div>
    )
})

export default AuthorSubscribeButton
