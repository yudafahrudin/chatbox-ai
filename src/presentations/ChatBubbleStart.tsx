import React, { useState } from "react";

import Icon from "@/icons";

import { ChatBubble } from "@/configs/interfaces";

import { copyText, formatDateTime } from "@/helpers";

const ChatBubbleStart: React.FC<ChatBubble> = ({
  isActiveDelete = false,
  message,
  onClickCheck,
  deleteCollection,
  isLoading,
  lastIndexMessage,
  onReload,
}) => {
  const [showToast, setShowToast] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleCopy = (message: string) => {
    copyText(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 1000);
  };

  const checkedSelect = Boolean(deleteCollection?.includes(message?.id));

  return (
    <div className="chat chat-start mb-3 flex">
      {isActiveDelete && (
        <input
          readOnly
          type="checkbox"
          checked={checkedSelect}
          onClick={() => onClickCheck(message?.id)}
          className="checkbox mt-auto mb-2"
        />
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
          {message?.content}{" "}
          <time className="text-xs opacity-50">
            {formatDateTime(message?.createdAt || new Date())}
          </time>
        </div>
        {isLoading ? (
          <span className="loading loading-dots loading-xs"></span>
        ) : (
          <div className="flex flex-row items-end gap-4 ">
            {lastIndexMessage && (
              <button onClick={() => onReload()}>
                <Icon width={15} height={15} stroke="#fff" iconName="refresh" />
              </button>
            )}
            <button onClick={() => handleCopy(message?.content)}>
              <Icon width={15} height={15} stroke="#fff" iconName="copy" />
            </button>
            <a
              href="#modal_like_delete_chat"
              className="block text-sm text-red-600"
              role="menuitem"
              id="menu-item-0"
              onClick={() => setIsLiked(true)}
            >
              <Icon width={15} height={15} stroke="#fff" iconName="like" />
            </a>
            <a
              href="#modal_like_delete_chat"
              className="block text-sm text-red-600"
              role="menuitem"
              id="menu-item-0"
              onClick={() => setIsLiked(false)}
            >
              <Icon width={15} height={15} stroke="#fff" iconName="dislike" />
            </a>
          </div>
        )}
      </div>

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span className="text-white">Message coppied.</span>
          </div>
        </div>
      )}

      <dialog id="modal_like_delete_chat" className="modal modal-circle">
        <div className="modal-box">
          <div className="flex flex-row justify-between">
            <h3 className="font-medium text-lg">Rating</h3>
            <a href="/#" className="block text-sm text-red-600">
              <Icon width={20} height={20} iconName="close" />
            </a>
          </div>
          <div className="text-center">
            <div className="pt-10 pb-2 flex">
              <span className="mx-auto">
                <Icon
                  width={40}
                  height={40}
                  iconName={isLiked ? "like" : "dislike"}
                />
              </span>
            </div>
            <p className="py-4 ">
              <strong>
                Kamu {isLiked ? "menyukai" : "tidak menyukai"} balasan dari AI
              </strong>
              <br />
              Ceritakan pengalaman tentang balasan chat ini
            </p>
            <textarea
              placeholder="Berikan tanggapanmu"
              className="textarea textarea-bordered textarea-md w-full"
            ></textarea>
            <div className="modal-action">
              <div className="w-full">
                <a href="/#">
                  <button className="font-bold text-sm border-white hover:border-white btn-circle btn-active w-full">
                    KIRIM
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ChatBubbleStart;
