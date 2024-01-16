import { useState } from "react";

import { Chat } from "@/configs/interfaces";

export const useChatRoom = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [deleteChat, setDeleteChat] = useState(false);

  const [chats, setChats] = useState<Chat[]>([
    { date: "12.30", message: "Halo", from: "bot" },
    { date: "12.35", message: "Halo", from: "sender" },
    { date: "12.30", message: "Guys?", from: "bot" },
  ]);

  const toggleDropdownMenu = () => {
    if (!deleteChat) {
      setDropdownMenu((prev) => {
        return !prev;
      });
    } else {
      setDeleteChat(false);
    }
  };

  const toggleDeleteChat = () => {
    setDropdownMenu(false);
    setDeleteChat(true);
  };

  const handleSetChat = () => {
    setChats([]);
  };

  const copyAction = () => {
    navigator.clipboard.writeText("sss");
  };

  return {
    copyAction,
    chats,
    dropdownMenu,
    deleteChat,
    handleSetChat,
    toggleDeleteChat,
    toggleDropdownMenu,
  };
};
