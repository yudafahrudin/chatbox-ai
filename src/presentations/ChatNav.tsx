import React, { useState } from "react";

import Icon from "@/icons";

interface ChatRoomPresentationProps {
  toggleDropdownMenu: () => void;
  toggleDeleteChat: () => void;
  dropdownMenu: boolean;
  deleteChat: boolean;
}

const ChatRoomPresentation: React.FC<ChatRoomPresentationProps> = ({
  toggleDeleteChat,
  toggleDropdownMenu,
  dropdownMenu,
  deleteChat,
}) => {
  return (
    <>
      <div className="navbar bg-base-100 shadow-md px-5">
        <div className="flex-1">
          <div className="avatar mx-3 mr-5">
            <div className="w-8 rounded-full">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
          <div>Livy Renata</div>
        </div>
        <div className="flex-none">
          <button onClick={toggleDropdownMenu}>
            {deleteChat ? (
              "Batal"
            ) : (
              <Icon
                width={24}
                height={24}
                stroke="#000000"
                iconName="dotmenu"
              />
            )}
          </button>
        </div>
      </div>
      {dropdownMenu && (
        <div className="container">
          <div
            className="absolute right-5 z-10 mt-1 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
          >
            <div className="p-4 flex gap-2" role="none">
              <Icon width={20} height={20} stroke="red" iconName="trash" />
              <a
                href="#"
                className="block text-sm text-red-600"
                role="menuitem"
                id="menu-item-0"
                onClick={toggleDeleteChat}
              >
                Hapus Chat
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatRoomPresentation;
