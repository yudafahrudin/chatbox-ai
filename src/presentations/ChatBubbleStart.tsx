import React, { useState } from "react";

import Icon from "@/icons";

import { ChatBubble } from "@/configs/interfaces";

import { copyText } from "@/helpers";

const ChatBubbleStart: React.FC<ChatBubble> = ({
  isActiveDelete = false,
  chat,
}) => {
  const [showToast, setShowToast] = useState(false);

  const handleCopy = (message: string) => {
    copyText(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 1000);
  };

  return (
    <div className="chat chat-start mb-3 flex">
      {isActiveDelete && (
        <input type="checkbox" className="checkbox mt-auto mb-2" />
      )}

      <div className="chat-image avatar">
        <div className="w-8 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          />
        </div>
      </div>
      <div className="chat-bubble p-3">
        <div className="mb-2">
          {chat.message} <time className="text-xs opacity-50">{chat.date}</time>
        </div>
        <div className="flex flex-row-reverse gap-4 ">
          <Icon width={15} height={15} stroke="#fff" iconName="refresh" />
          <Icon width={15} height={15} stroke="#fff" iconName="like" />
          <button onClick={() => handleCopy(chat.message)}>
            <Icon width={15} height={15} stroke="#fff" iconName="copy" />
          </button>
          <Icon width={15} height={15} stroke="#fff" iconName="dislike" />
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Message coppied.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBubbleStart;
