
import React from "react";
import { useMessageContext } from "../Provider/MessageProviders";


const typeClasses: Record<string, string> = {
  success: "bg-green-100 text-green-800 border border-green-300",
  error: "bg-red-100 text-red-800 border border-red-300",
  info: "bg-blue-100 text-blue-800 border border-blue-300",
  warning: "bg-yellow-100 text-yellow-800 border border-yellow-300",
};

const FlashMessageList = () => {
  const { messages } = useMessageContext();

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 space-y-2">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`rounded px-4 py-2 shadow ${typeClasses[msg.type || "info"]}`}
        >
          {msg.message}
        </div>
      ))}
    </div>
  );
};

export default FlashMessageList;
