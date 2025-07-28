import { useEffect, } from 'react'
import { useAuthor } from '../Provider/AuthorProvider'
import { useAuth } from '../Provider/AuthProvider'
import useLoginAndSubscribe from '../helper/hooks/useLoginAndSubscribe'
import SubscribeButton from './SubscribeButton'


const CallToAction = () => {
  const { subscriberCountWithStatus } = useAuthor()
  if (subscriberCountWithStatus?.hasSubscribed) return null
  return (
    <section className="bg-blue-600 dark:bg-blue-800 text-white text-center py-8">
      <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
      <p className="mb-4">Subscribe to get the latest posts delivered straight to your inbox.</p>
      <SubscribeButton />

    </section>
  )
}

export default CallToAction
