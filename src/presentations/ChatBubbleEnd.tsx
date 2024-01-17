import React from "react";

import Icon from "@/icons";

import { ChatBubble } from "@/configs/interfaces";

import { formatDateTime } from "@/helpers";

const ChatBubbleEnd: React.FC<ChatBubble> = ({
  isActiveDelete = false,
  chat,
  onClickCheck,
  deleteCollection,
}) => {
  const checkedSelect = Boolean(deleteCollection?.includes(chat.ID));
  return (
    <div className="chat chat-end">
      <div className="chat-bubble bg-base-300 text-inherit	">
        {chat.message}{" "}
        <time className="text-xs opacity-50">{formatDateTime(chat.date)}</time>
      </div>

      {isActiveDelete && (
        <input
          readOnly
          type="checkbox"
          checked={checkedSelect}
          onClick={() => onClickCheck(chat.ID)}
          className="checkbox mt-auto mb-2"
        />
      )}
    </div>
  );
};

export default ChatBubbleEnd;
