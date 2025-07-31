import React, { useEffect, useRef, useState } from 'react'
import { useSocket } from '../../Provider/SocketProvider'
import { usePeer } from '../../Provider/PeerProvider'
import { BiCameraOff, BiCamera } from 'react-icons/bi'
import { BsMic } from 'react-icons/bs'
import { FiMicOff } from 'react-icons/fi'
import { MdScreenShare } from 'react-icons/md'

const VideoCard = () => {
    const { localStream } = useSocket()
    const { remoteStream,shareScreen } = usePeer()
    const localVideoRef = useRef<HTMLVideoElement>(null)
    const remoteRef = useRef<HTMLVideoElement>(null)
    const [isCameraOn, setCameraOn] = useState(true)
    const [isMicOn, setMicOn] = useState(true)

    useEffect(() => {
        if (localVideoRef.current && localStream) {
            localVideoRef.current.srcObject = localStream
        }
    }, [localStream])

    useEffect(() => {
        if (remoteRef.current && remoteStream) {
            remoteRef.current.srcObject = remoteStream
        }
    }, [remoteStream])

    const toggleCamera = () => {
        if (!localStream) return
        const videoTrack = localStream.getVideoTracks()[0]
        if (videoTrack) {
            videoTrack.enabled = !videoTrack.enabled
            setCameraOn(videoTrack.enabled)
        }
    }

    const toggleMic = () => {
        if (!localStream) return
        const audioTrack = localStream.getAudioTracks()[0]
        if (audioTrack) {
            audioTrack.enabled = !audioTrack.enabled
            setMicOn(audioTrack.enabled)
        }
    }


    return (
        <>
            <div className="flex gap-4 mb-4">
                <button onClick={toggleCamera} className="bg-blue-600 px-4 py-2 rounded">
                    {isCameraOn ? <BiCamera /> : <BiCameraOff />}
                </button>
                <button onClick={toggleMic} className="bg-blue-600 px-4 py-2 rounded">
                    {isMicOn ? <BsMic /> : <FiMicOff />}
                </button>
                <button onClick={shareScreen} className="bg-green-600 px-4 py-2 rounded">
                    <MdScreenShare />
                </button>
            </div>

            <video ref={localVideoRef} autoPlay playsInline muted className="rounded shadow w-full max-w-md mb-4" />
            <video ref={remoteRef} autoPlay playsInline className="rounded shadow w-full max-w-md" />
        </>
    )
}

export default VideoCard
