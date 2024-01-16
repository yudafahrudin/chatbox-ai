import React from "react";

import Icon from "@/icons";

import { ChatBubble } from "@/configs/interfaces";

const ChatBubbleEnd: React.FC<ChatBubble> = ({
  isActiveDelete = false,
  chat,
}) => {
  return (
    <div className="chat chat-end">
      <div className="chat-bubble bg-base-300 text-inherit	">
        {chat.message} <time className="text-xs opacity-50">{chat.date}</time>
      </div>

      {isActiveDelete && (
        <input type="checkbox" className="checkbox mt-auto mb-2" />
      )}
    </div>
  );
};

export default ChatBubbleEnd;
