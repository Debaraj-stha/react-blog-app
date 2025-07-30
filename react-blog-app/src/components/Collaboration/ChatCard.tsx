import React, { useCallback } from 'react'
import { useSocket, type MessageType } from '../../Provider/SocketProvider'
import NameAvatar from '../NameAvatar'
import { useAuth } from '../../Provider/AuthProvider'


const ChatCard = () => {
  const { messages, totalMembers, messageInput, setMessageInput ,sendMessage,roomId} = useSocket()
  const{user}=useAuth()

  const formatTime = (date: Date | string) => {
    const d = new Date(date)
    return `${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`
  }
  const handleKeyDown=useCallback((e:React.KeyboardEvent<HTMLInputElement>)=>{
    if(e.code==="enter"||e.code==="Enter"){
      console.log("message send")
      const message:MessageType={
        user:{
          name:user?.name ,
          email:user?.email,
          photo:user?.image
        },
        message:messageInput,
        at:new Date(),
        type:"chat",
        roomId:roomId!
        
      }
      console.log("messazge",message)
      sendMessage(message)
      setMessageInput(" ")
    }
  },[messageInput,sendMessage])

  return (
    <div className="bg-gray-800 text-white rounded-2xl shadow-lg p-6 w-2xl mx-auto space-y-5 border border-gray-700">
      <div className="flex justify-between items-center mb-4 ">
        <h2 className="text-xl font-semibold">Group Chat</h2>
        <span className="text-sm text-gray-300">🟢 {totalMembers} online</span>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {messages && messages.length > 0 ? (
          messages.map((msg, i) => (
            <div key={i} className="flex items-start gap-3">
              {msg.type === 'chat' && (
                <>
                  {msg.user.photo ? <img src={`${msg.user.photo}`} loading='lazy' className='size-10 rounded-full' /> : <NameAvatar name={`${msg.user.name || msg.user.email}`}></NameAvatar>
                  }
                </>
              )}

              <div
                className={`p-3 rounded-xl ${msg.type === 'chat'
                    ? 'bg-gray-700 text-sm'
                    : 'bg-blue-600 text-white text-xs font-medium'
                  } w-full`}
              >
                {msg.type === 'chat' && (
                  <div className="text-sm font-semibold mb-1">
                    {msg.user.name || msg.user.email || 'Unknown User'}{' '}
                    <span className="text-gray-400 text-xs ml-2">{formatTime(msg.at)}</span>
                  </div>
                )}
                <p>{msg.message}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No messages to show.</p>
        )}
      </div>
      {/* input box */}
      <input type='text' placeholder='Message...'
        value={messageInput}
        onChange={(e) => setMessageInput(e.target
          .value
        )}
        onKeyDown={handleKeyDown}
        className='w-full  rounded px-3 py-2 outline-0 border-0 shadow bg-gray-700'
      />
    </div>
  )
}

export default ChatCard
