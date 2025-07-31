import ChatCard from './ChatCard'
import { useSocket } from '../../Provider/SocketProvider'
import OfferCard from './OfferCard'
import { usePeer } from '../../Provider/PeerProvider'
import { useEffect, useRef, useState } from 'react'
import VideoCard from './VideoCard'

const CollaborationSuccess = () => {
  const { offerStatus, incomingOffer, localStream,offerCall ,roomId} = useSocket()


  return (
    <div className='w-full mx-auto py-5 px-6 bg-gray-800 text-white'>
      <div className='flex flex-col sm:flex-row gap-5'>
        <div className='w-full'>
          <h1 className="text-xl font-semibold mb-4">Waiting for other to join</h1>
          <button onClick={()=>offerCall(roomId)}>send offer</button>

          <VideoCard />

          {offerStatus === "incoming" && incomingOffer && (
            <>
              <h2 className="text-lg text-green-400 font-semibold mt-4">You have an offer:</h2>
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
        <ChatCard />
      </div>
    </div>
  )
}

export default CollaborationSuccess
