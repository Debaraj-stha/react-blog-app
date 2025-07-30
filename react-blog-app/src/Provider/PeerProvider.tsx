import { createContext, useContext, useEffect, useMemo, useState, type ReactNode, type SetStateAction } from "react";


type PeerContextType = {
    peer: RTCPeerConnection,
    remoteStream: MediaStream | null,
    createOffer: () => Promise<RTCSessionDescriptionInit>,
    createAnswer: (offer: RTCSessionDescriptionInit) => Promise<RTCSessionDescriptionInit>
    setRemoteAnswer: (answer: RTCSessionDescriptionInit) => void
    sendStream: (stream: MediaStream) => void
    setRemoteStream: React.Dispatch<SetStateAction<MediaStream | null>>
}




const PeerContext = createContext<PeerContextType | null>(null)
const PeerProvider = ({ children }: { children: ReactNode }) => {
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
    const [iceConnectionState, setIceConnectionState] = useState('new');
    const peer = useMemo(() => {
        const newPeer = new RTCPeerConnection({
            iceServers: [
                { urls: "stun:stun.l.google.com:19302" },
                {
                    urls: "turn:relay.metered.ca:80",
                    username: "devraj",
                    credential: "devraj"
                }
            ]
        });


        newPeer.oniceconnectionstatechange = () => {
            console.log("ICE connection state:", newPeer.iceConnectionState);
            setIceConnectionState(newPeer.iceConnectionState);
            if (newPeer.iceConnectionState === 'failed') {
                console.log("ICE failed, trying to restart...");
                newPeer.restartIce();
            }
        };

        newPeer.onconnectionstatechange = () => {
            console.log("Connection state:", newPeer.connectionState);
        };

        newPeer.onsignalingstatechange = () => {
            console.log("Signaling state:", newPeer.signalingState);
        };

        return newPeer;
    }, []);


    useEffect(() => {
        peer.onicecandidate = (event) => {
            if (event.candidate) {
                console.log("candidate", event.candidate)
            }
        }
        peer.ontrack = (event) => {
            if (event.streams && event.streams[0]) {
                console.log("Setting remote stream with id:", event.streams[0].id);
                setRemoteStream(event.streams[0]);
            }
        }
        return () => {
            peer.onicecandidate = null;
            peer.ontrack = null;
        };
    }, [peer])

    const createOffer = async () => {
        const offer = await peer.createOffer()
        await peer.setLocalDescription(offer)
        return offer
    }
    const createAnswer = async (offer: RTCSessionDescriptionInit) => {
        await peer.setRemoteDescription(offer)
        const answer = await peer.createAnswer()
        await peer.setLocalDescription(answer)
        return answer

    }
    const setRemoteAnswer = async (answer: RTCSessionDescriptionInit) => {
        await peer.setRemoteDescription(answer)
    }
    const sendStream = (stream: MediaStream) => {
        const existingSenders = peer.getSenders().map(sender => sender.track);
        for (const track of stream.getTracks()) {
            peer.addTrack(track, stream);

        }
    }
    const value = useMemo(() => ({
        peer,
        createAnswer,
        createOffer,
        setRemoteAnswer,
        sendStream,
        remoteStream,
        setRemoteStream
    }), [
        peer,
        createAnswer,
        createOffer,
        setRemoteAnswer,
        sendStream,
        remoteStream,
        setRemoteStream
    ])
    return (
        <PeerContext.Provider value={value}>
            {children}
        </PeerContext.Provider>
    )

}
export default PeerProvider

export const usePeer = () => {
    const context = useContext(PeerContext)
    if (!context)
        throw new Error("usePeer must be within PeerProvider")
    return context
}