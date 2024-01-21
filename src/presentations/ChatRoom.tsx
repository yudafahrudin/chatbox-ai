"use client";

import React, { useMemo } from "react";

import ChatNav from "./ChatNav";
import ChatBubbleStart from "./ChatBubbleStart";
import ChatBubbleEnd from "./ChatBubbleEnd";

import Icon from "@/icons";

import { useChatRoom } from "@/useCases/chatRoom";

const ChatRoomPresentation: React.FC = () => {
  const {
    reload,
    isLoading,
    messages,
    input,
    handleSubmit,
    handleInputChange,
    dropdownMenu,
    toggleDeleteChat,
    toggleDropdownMenu,
    deleteChat,
    deleteCollection,
    handleDeleteCollection,
    handleSelectAllDelete,
    handleDeleteLocalMessage,
  } = useChatRoom();

  const lastIndexMessage = useMemo(() => {
    return messages.length - 1;
  }, [messages]);

  return (
    <div className="h-screen">
      <ChatNav
        dropdownMenu={dropdownMenu}
        deleteChat={deleteChat}
        toggleDeleteChat={toggleDeleteChat}
        toggleDropdownMenu={toggleDropdownMenu}
      />
      <div className="container mx-auto chat-area p-5 h-4/5 overflow-auto scroll-smooth mt-5">
        {messages.map((message, index) => {
          if (message.role === "assistant")
            return (
              <ChatBubbleStart
                key={message.id}
                onReload={() => reload()}
                deleteCollection={deleteCollection}
                onClickCheck={handleDeleteCollection}
                isActiveDelete={deleteChat}
                message={message}
                isLoading={lastIndexMessage === index ? isLoading : false}
                lastIndexMessage={lastIndexMessage === index ? true : false}
              />
            );
          return (
            <ChatBubbleEnd
              key={message.id}
              onReload={() => reload()}
              deleteCollection={deleteCollection}
              onClickCheck={handleDeleteCollection}
              isActiveDelete={deleteChat}
              message={message}
            />
          );
        })}
      </div>

      {!deleteChat ? (
        <form
          className="container flex mx-auto absolute inset-x-0 bottom-5 h-16 px-5"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Send Message..."
            className="input input-bordered w-full"
            disabled={isLoading}
          />

          {input && (
            <button type="submit" className="btn btn-ghost btn-active btn-link">
              <Icon width={30} height={30} iconName="send" />
            </button>
          )}
        </form>
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
                {messages.length > 0 && deleteCollection.length > 0 && (
                  <>
                    <Icon
                      width={20}
                      height={20}
                      stroke="red"
                      iconName="trash"
                    />
                    <a
                      href="#modal_delete_chat"
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

      <dialog id="modal_delete_chat" className="modal modal-circle">
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
