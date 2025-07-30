import React from 'react'
import { useSocket } from '../Provider/SocketProvider'
import CollaborationSuccess from '../components/Collaboration/CollaborationSuccess'
import RoomForm from '../components/Collaboration/RoomForm'

const Collaboration = () => {
  const { hasJoined, hasRoomCreated } = useSocket()



  return (
    <>
      {
        (hasJoined || hasRoomCreated)
          ?
          <CollaborationSuccess />
          :
          <div className="min-h-screen flex flex-col items-center justify-center px-4">
            <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800 dark:text-gray-100">
              Collaborate with Colleagues
            </h1>
            <RoomForm />

          </div>
      }
    </>
  )
}

export default Collaboration
