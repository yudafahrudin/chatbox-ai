import React, { useRef } from "react";
import { useCompletion } from "ai/react";

import ChatNav from "./ChatNav";
import ChatBubbleStart from "./ChatBubbleStart";
import ChatBubbleEnd from "./ChatBubbleEnd";

import Icon from "@/icons";

import { useChatRoom } from "@/useCases/chatRoom";

const ChatRoomPresentation: React.FC = () => {
  const overflowScroll = useRef();

  const {
    chats,
    dropdownMenu,
    toggleDeleteChat,
    toggleDropdownMenu,
    deleteChat,
    deleteCollection,
    handleInputChange,
    handleDeleteCollection,
    messageState,
    handleSelectAllDelete,
    handleSendMessage,
    handlePressEnter,
    handleDeleteLocalMessage,
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
            return (
              <ChatBubbleStart
                key={chat.ID}
                deleteCollection={deleteCollection}
                onClickCheck={handleDeleteCollection}
                isActiveDelete={deleteChat}
                chat={chat}
              />
            );
          return (
            <ChatBubbleEnd
              key={chat.ID}
              deleteCollection={deleteCollection}
              onClickCheck={handleDeleteCollection}
              isActiveDelete={deleteChat}
              chat={chat}
            />
          );
        })}
      </div>

      {!deleteChat ? (
        <div className="container flex mx-auto absolute inset-x-0 bottom-5 h-16 px-5">
          <input
            type="text"
            value={messageState}
            onChange={handleInputChange}
            onKeyUp={handlePressEnter}
            placeholder="Send Message..."
            className="input input-bordered w-full"
          />

          {messageState && (
            <button
              className="btn btn-ghost btn-active btn-link"
              onClick={handleSendMessage}
            >
              <Icon width={30} height={30} iconName="send" />
            </button>
          )}
        </div>
      ) : (
        <div className="absolute inset-x-0 bottom-15 h-16">
          <div className="divider" />
          <div className="flex px-7 ">
            <div className="flex-1">
              <button>{deleteCollection.length} Terpilih |</button>
              <button onClick={handleSelectAllDelete} className="ml-2">
                Pilih Semua
              </button>
            </div>

            <div className="flex-none">
              <div className=" flex gap-2">
                {chats.length > 0 && deleteCollection.length > 0 && (
                  <>
                    <Icon
                      width={20}
                      height={20}
                      stroke="red"
                      iconName="trash"
                    />
                    <a
                      href="#my_modal_1"
                      className="block text-sm text-red-600"
                      role="menuitem"
                      id="menu-item-0"
                      onClick={toggleDeleteChat}
                    >
                      Hapus
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <dialog id="my_modal_1" className="modal modal-circle">
        <div className="modal-box">
          <h3 className="font-medium text-lg">Hapus Chat</h3>
          <p className="py-4">
            Kamu akan menghapus chat ini, chat yang telah dihapus tidak dapat
            dipulihkan.
          </p>
          <div className="modal-action">
            <div className="w-full">
              <a href="#">
                <button
                  onClick={handleDeleteLocalMessage}
                  className="btn btn-circle w-full hover:bg-error bg-error text-white"
                >
                  Hapus Sekarang
                </button>
              </a>
              <a href="#">
                <button className="font-bold text-sm border-white hover:border-white btn-circle  hover:bg-white bg-white btn-active w-full">
                  Kembali
                </button>
              </a>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ChatRoomPresentation;
