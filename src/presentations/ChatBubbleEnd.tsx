import React from "react";

import { ChatBubble } from "@/configs/interfaces";

import { formatDateTime } from "@/helpers";

const ChatBubbleEnd: React.FC<ChatBubble> = ({
  isActiveDelete = false,
  message,
  onClickCheck,
  deleteCollection,
}) => {
  const checkedSelect = Boolean(deleteCollection?.includes(message.id));
  return (
    <div className="chat chat-end">
      <div className="chat-bubble bg-base-300 text-inherit	">
        {message.content}{" "}
        <time className="text-xs opacity-50">
          {formatDateTime(message.createdAt || new Date())}
        </time>
      </div>

      {isActiveDelete && (
        <input
          readOnly
          type="checkbox"
          checked={checkedSelect}
          onClick={() => onClickCheck(message.id)}
          className="checkbox mt-auto mb-2"
        />
      )}
    </div>
  );
};

export default ChatBubbleEnd;
