import React from "react";
import { useCompletion } from "ai/react";

import ChatNav from "./ChatNav";
import ChatBubbleStart from "./ChatBubbleStart";
import ChatBubbleEnd from "./ChatBubbleEnd";

import Icon from "@/icons";

import { useChatRoom } from "@/useCases/chatRoom";

const ChatRoomPresentation: React.FC = () => {
  const {
    chats,
    dropdownMenu,
    toggleDeleteChat,
    toggleDropdownMenu,
    deleteChat,
  } = useChatRoom();

  return (
    <div className="h-screen">
      <ChatNav
        dropdownMenu={dropdownMenu}
        deleteChat={deleteChat}
        toggleDeleteChat={toggleDeleteChat}
        toggleDropdownMenu={toggleDropdownMenu}
      />

      <div className="container mx-auto chat-area p-5 h-4/5 overflow-auto scroll-smooth mt-5">
        <div className="my-5 w-full text-center">
          <div className="badge badge-ghost px-5 py-3">today</div>
        </div>
        {chats.map((chat) => {
          if (chat.from === "bot")
            return <ChatBubbleStart isActiveDelete={deleteChat} chat={chat} />;
          return <ChatBubbleEnd isActiveDelete={deleteChat} chat={chat} />;
        })}
      </div>

      {!deleteChat ? (
        <div className="container flex mx-auto absolute inset-x-0 bottom-5 h-16 px-5">
          <input
            type="text"
            placeholder="Send Message..."
            className="input input-bordered w-full"
          />

          <button className="btn btn-ghost btn-active btn-link">
            <Icon width={30} height={30} iconName="send" />
          </button>
        </div>
      ) : (
        <div className="absolute inset-x-0 bottom-15 h-16">
          <div className="divider" />
          <div className="flex px-7 ">
            <div className="flex-1">
              <button>0 Terpilih |</button>
              <button className="ml-2">Pilih Semua</button>
            </div>

            <div className="flex-none">
              <div className=" flex gap-2">
                <Icon width={20} height={20} stroke="red" iconName="trash" />
                <a
                  href="#"
                  className="block text-sm text-red-600"
                  role="menuitem"
                  id="menu-item-0"
                  onClick={toggleDeleteChat}
                >
                  Hapus
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatRoomPresentation;
