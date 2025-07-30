import ChatCard from './ChatCard'
import { useSocket } from '../../Provider/SocketProvider'
import OfferCard from './OfferCard'

const CollaborationSuccess = () => {
  const { offerStatus,incomingOffer } = useSocket()
  return (
    <div className='w-full mx-auto py-5 px-6 bg-gray-800'>
      <div className='flex flex-col sm:flex-row gap-5'>
        <div className='w-full'>
          <h1>Waiting for other to join</h1>
          {offerStatus === "incoming" && incomingOffer && (
            <>
              <h2 className="text-lg text-green-400 font-semibold">You have an offer:</h2>
              <OfferCard />
            </>
          )}

          {offerStatus === "accepted" && (
            <h2 className="text-green-500 font-semibold">Offer accepted</h2>
          )}

          {offerStatus === "rejected" && (
            <h2 className="text-red-500 font-semibold">Offer rejected</h2>
          )}
        </div>
        {/* chat box */}
        <ChatCard />
      </div>
    </div >
  )
}

export default CollaborationSuccess
