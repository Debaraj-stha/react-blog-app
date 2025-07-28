import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type MessageType = "success" | "error" | "warning" | "info";

type MessageWithType = {
  message: string;
  type?: MessageType;
};

type MessageContextType = {
  messages: MessageWithType[];
  setMessages: React.Dispatch<React.SetStateAction<MessageWithType[]>>;
  addMessage: (msg: MessageWithType) => void;
};

const MessageContext = createContext<MessageContextType | null>(null);

const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<MessageWithType[]>([]);

  const addMessage = (msg: MessageWithType) => {
    setMessages((prev) => [...prev, msg]);
    //remove message after 3 seconds
    setTimeout(() => {
      setMessages((prev) => prev.filter((m) => m !== msg));
    }, 3000);
  };

  const value = useMemo(
    () => ({
      messages,
      setMessages,
      addMessage,
    }),
    [messages]
  );

  return (
    <MessageContext.Provider value={value}>
      {children}
    </MessageContext.Provider>
  );
};

export default MessageProvider;

export const useMessageContext = () => {
  const context = useContext(MessageContext);
  if (!context)
    throw new Error("useMessageContext must be used within a MessageProvider");
  return context;
};
