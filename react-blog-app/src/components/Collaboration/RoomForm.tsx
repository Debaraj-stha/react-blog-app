import React from 'react'
import { useSocket } from '../../Provider/SocketProvider'

const RoomForm = () => {
      const {  roomId, setRoomId, joinRoom, createRoom} = useSocket()
  return (
         <div className="w-full max-w-md p-8 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-lg text-gray-900 dark:text-gray-100 space-y-6">
        <h2 className="text-xl font-bold text-center">Join or Create a Room</h2>

        <input
          type="text"
          name="roomid"
          placeholder="Enter Room ID"
          value={roomId||""}
          onChange={(e) => setRoomId(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={createRoom}
          className="w-full px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-200"
        >
          Create Room
        </button>

        {/* OR Divider */}
        <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
          <hr className="flex-1 border-t border-gray-400 dark:border-gray-600" />
          <span className="text-sm">OR</span>
          <hr className="flex-1 border-t border-gray-400 dark:border-gray-600" />
        </div>

        <button
          onClick={joinRoom}
          className="w-full px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-colors duration-200"
        >
          Join Room
        </button>
      </div>
  )
}

export default RoomForm
