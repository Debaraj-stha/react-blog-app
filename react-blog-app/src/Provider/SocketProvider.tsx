import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode, type SetStateAction } from "react";
import { io, Socket } from "socket.io-client";
import { usePeer } from "./PeerProvider";
import { useAuth } from "./AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { useMessageContext } from "./MessageProviders";


type SocketContextType = {
    localStream: MediaStream | null;
    remoteStream: MediaStream | null;
    incomingOffer?: OfferType | null;
    offerFrom?: MessageUserType;
    offerCall: (room: string) => Promise<void>;
    onAccept: () => Promise<void>;
    onReject: () => Promise<void>;
    socket: Socket,
    roomId: string 
    setRoomId: React.Dispatch<SetStateAction<string>>
    joinRoom: () => void
    createRoom: () => void
    loading: boolean
    hasRoomCreated: boolean,
    hasJoined: boolean
    messageInput: string
    sendMessage: (messageData: any) => void
    messages: MessageType[] | null
    totalMembers: number
    setMessageInput: React.Dispatch<SetStateAction<string>>
    offerStatus: OfferStatus
};
type MessageUserType = {

    name?: string,
    email?: string
    photo?: string

}
export type MessageType = {
    type: 'chat' | 'info'
    message: string
    at: Date
    user: MessageUserType,
    roomId?: string
}
type OfferType = {
    caller: MessageUserType | null,
    offer: RTCSessionDescriptionInit
}
type OfferStatus = "idle" | "incoming" | "accepted" | "rejected";

const SocketContext = createContext<SocketContextType | null>(null)
const SocketProvider = ({ children }: { children: ReactNode }) => {
    const [localStream, setLocalStream] = useState<MediaStream | null>(null)
    const [offerFrom, setOfferFrom] = useState<MessageUserType | undefined>()
    const [incomingOffer, setIncomingOffer] = useState<OfferType | null>()
    const [roomId, setRoomId] = useState<string>("")
    const [hasRoomCreated, setRoomCreated] = useState(false)
    const [hasJoined, setJoined] = useState(false)
    const [loading, setLoading] = useState(false)
    const [messages, setMessages] = useState<MessageType[] | null>(null)
    const { user } = useAuth()
    const { peer, createAnswer, createOffer, setRemoteAnswer, sendStream, remoteStream, setRemoteStream } = usePeer();
    const [messageInput, setMessageInput] = useState<string>("")
    const [offerStatus, setOfferStatus] = useState<OfferStatus>("idle");
    // const localVideoRef=useRef()
    // const remoteVideoRef=useRef()
    const [totalMembers, setTotalMembers] = useState(1)
    const { addMessage } = useMessageContext()



    const socket = useMemo(() => io('http://localhost:8000'), [])

    // inside your component:
    const navigate = useNavigate();
    useEffect(() => {
        if (!socket?.id) return;
        setRoomId(socket.id);
    }, [socket?.id]);


    const getUserMedia = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });

            console.log("Obtained local stream:", stream.id);
            setLocalStream(stream);

            // Verify peer is ready before sending stream
            if (peer.connectionState !== 'closed') {
                sendStream(stream);
            } else {
                console.warn("Peer connection not ready for stream");
            }

            return stream;
        } catch (err) {
            console.error("Failed to get user media", err);
            throw err; // Re-throw to allow error handling upstream
        }
    }, [sendStream, setLocalStream, peer]);

    const handleOfferedReceived = useCallback((data: { caller: MessageUserType; offer: RTCSessionDescriptionInit }) => {
        const { caller, offer } = data;
        console.log(" Offer received from:", caller);
        console.log("offer", offer)
        setOfferFrom(caller)
        setIncomingOffer(data)
    }, []);


    const handleCallAccepted = useCallback(async ({ answer }: { answer: RTCSessionDescriptionInit }) => {
        await setRemoteAnswer(answer);
        console.log("call accepted", answer);
    }, [setRemoteAnswer]);




    const handleUserJoined = useCallback((joinee: any) => {
        addMessage({ message: `{user ${joinee.id}  joined the room}`, type: "info" })
        setJoined(true)
        const message: MessageType = {
            message: `User ${joinee.user.name || joinee.user.email} has  joined the room`,
            at: joinee.at,
            type: "info",
            user: joinee.user
        }
        setMessages((prev) => prev ? [...prev, message] : [message])

    }, [hasJoined])

    const handleJoinRoom = useCallback(() => {
        addMessage({ message: "Room joined", type: "info" })
        setJoined(true)
    }, [])
    const handleMessage = useCallback((message: MessageType) => {
       
        setMessages(prevMessages => prevMessages ? [...prevMessages, message] : [message]);
    }, [])
    const handleMembers = useCallback((onlineMembersCount: number) => {
        setTotalMembers(onlineMembersCount)
    }, [totalMembers])

    const handleUserLeft = useCallback((user: MessageUserType) => {
        console.log("handle user left", user)
        const message: MessageType = {
            message: `${user.name || user.email} has left the room`,
            at: new Date(),
            user,
            type: "info"
        }
        setMessages((prev) => prev ? [...prev, message] : [message]);
    }, [messages]);

    const handleOfferCall = useCallback((data: any) => {
        console.log("offer received", data)
        setIncomingOffer(data)
        setOfferStatus("incoming");
    }, [])


    useEffect(() => {
        socket.on("offer-received", handleOfferedReceived);
        socket.on("call-accepted", handleCallAccepted)
        socket.on("user-joined", handleUserJoined)
        socket.on("join-room", handleJoinRoom)
        socket.on("message", handleMessage)
        socket.on("room-members", handleMembers)
        socket.on("user-left", handleUserLeft)
        socket.on("offer", handleOfferCall)
        return () => {
            socket.off("offer-received", handleOfferedReceived)
            socket.off("call-accepted", handleCallAccepted)
            socket.off("user-joined", handleUserJoined)
            socket.off("join-room", handleJoinRoom)
            socket.off("message", handleMessage)
            socket.off("room-members", handleMembers)
            socket.off("user-left", handleUserLeft)
            socket.off("offer", handleOfferCall)
        };
    }, [socket, handleOfferedReceived, handleCallAccepted, handleUserJoined, handleJoinRoom, handleMessage, handleUserLeft, handleOfferCall]);

    useEffect(() => {
        if (user) {
            socket.emit("add-new-user", user);
        }
    }, [socket, user]);

    const onAccept = useCallback(async () => {
        if (!incomingOffer) return;

        // Ensure media stream before answering
        if (!localStream) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                setLocalStream(stream);
                sendStream(stream);
            } catch (err) {
                console.error("Error accessing media devices", err);
                return;
            }
        } else {
            sendStream(localStream);
        }

        const answer = await createAnswer(incomingOffer.offer);
        socket.emit("call-accepted", { caller: offerFrom, answer });
        setOfferStatus("accepted");
    }, [createAnswer, socket, incomingOffer, offerFrom, localStream, sendStream]);


    const onReject = useCallback(async () => {
        setIncomingOffer(undefined);
        setIncomingOffer(undefined);
        setOfferFrom(undefined);
        setOfferStatus("rejected");
        console.log("Call rejected.");
        // You might emit something to notify the caller
    }, []);


    const offerCall = useCallback(async (room: string) => {

        if (!user) {
            console.log("user is null", user)
            return;
        }
        if(roomId.trim()===""){
            console.log("no room id",roomId)
            return
        }

        try {
            // Ensure we have media before creating offer
            // if (!localStream) {
            //     await getUserMedia();
            // }


            const offer = await createOffer();
            socket.emit("offer", {
                caller: {
                    name: user?.name || "",
                    email: user?.email || "",
                    photot: user?.image || ""
                },
                roomId: room,
                offer
            });
            console.log("offer sent")
        } catch (err) {
            console.error("Offer call failed:", err);
        }
    }, [user, localStream, getUserMedia, createOffer, socket]);



    useEffect(() => {
        let stream: MediaStream;

        const init = async () => {
            try {
                stream = await getUserMedia();
            } catch (err) {
                console.error("Media initialization failed:", err);
            }
        };

        init();

        return () => {
            if (stream) {
                console.log("Cleaning up media streams");
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [getUserMedia]);




    socket.on("disconnected", () => {
        console.log("disconnected from socket")
    })

    const createRoom = useCallback(async () => {
        if (roomId && roomId.trim()) {
            navigate(`/collaboration/${roomId}`)
            setRoomCreated(true)

            addMessage({ message: "creating room...", type: "info" })
        }
        else addMessage({ message: "Room id is required", type: "info" })

    }, [roomId, navigate, addMessage])

    const joinRoom = useCallback(() => {
        if (roomId && roomId.trim()) {
            navigate(`/collaboration/${roomId}`)
            const data = {
                roomId,
                user: {
                    name: user?.name ?? "unknown user",
                    email: user?.email ?? "unknown@example.com",
                    photo: user?.image ?? ""
                },
                at: new Date().toISOString(), // Convert Date to string
            };
            addMessage({ message: "Joining...", type: "info" })
            socket.emit("join-room", data);

        }
        else addMessage({ message: "Room id is required", type: "info" })

    }, [roomId, addMessage, navigate])

    const sendMessage = useCallback((messageData: any) => {
        socket.emit('message', messageData)
        // setMessages(messageData)
    }, [messageInput])





    const values = useMemo<SocketContextType>(() => ({
        localStream,
        remoteStream,
        incomingOffer,
        offerFrom,
        offerCall,
        onAccept,
        onReject,
        socket,
        roomId,
        setRoomId,
        joinRoom,
        createRoom,
        loading,
        hasRoomCreated,
        hasJoined,
        sendMessage,
        messages,
        messageInput,
        totalMembers,
        setMessageInput,
        offerStatus
    }), [
        localStream,
        remoteStream,
        incomingOffer,
        offerFrom,
        offerCall,
        onAccept,
        onReject,
        socket,
        roomId,
        setRoomId,
        joinRoom,
        createRoom,
        loading,
        hasJoined,
        hasRoomCreated,
        sendMessage,
        messages,
        messageInput,
        totalMembers,
        setMessageInput
    ]);

    return (
        <SocketContext.Provider value={values}>
            {children}
        </SocketContext.Provider>
    )
}
export default SocketProvider
export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    return context;
};
