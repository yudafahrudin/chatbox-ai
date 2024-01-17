import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

import { Chat } from "@/configs/interfaces";
import { saveLocalMessage, loadLocalMessage } from "@/helpers";

export const useChatRoom = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [deleteChat, setDeleteChat] = useState(false);
  const [deleteCollection, setDeleteCollection] = useState<String[]>([]);
  const [messageState, setMessageState] = useState("");

  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    const localMessage: Chat[] = loadLocalMessage();
    if (localMessage.length !== 0) {
      setChats(localMessage);
    }
  }, []);

  const toggleDropdownMenu = () => {
    if (!deleteChat) {
      setDropdownMenu((prev) => {
        return !prev;
      });
    } else {
      setDeleteChat(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageState(e.target.value);
  };

  const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    const stringRand = String(Math.random() + 1).toString();
    setChats((prev) => {
      const newChats = [
        ...prev,
        {
          ID: uuidv4(),
          message: messageState,
          date: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
          from: "user",
          liked: false,
          disliked: false,
        },
        {
          ID: uuidv4(),
          message: stringRand,
          date: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
          from: "bot",
          liked: false,
          disliked: false,
        },
      ];
      saveLocalMessage(newChats);
      setMessageState("");
      return newChats;
    });
  };

  const handleDeleteCollection = (ID: string) => {
    if (deleteCollection.length === 0) {
      setDeleteCollection([ID]);
    } else {
      if (!deleteCollection.includes(ID)) {
        setDeleteCollection((prev) => {
          return [...prev, ID];
        });
      } else {
        setDeleteCollection((prev) => {
          return [...prev.filter((IDs) => IDs !== ID)];
        });
      }
    }
  };

  const handleDeleteLocalMessage = () => {
    const newChats = chats.filter(
      (chat) => !deleteCollection.includes(chat.ID)
    );
    setChats(newChats);
    saveLocalMessage(newChats);
    setDeleteCollection([]);
    setDeleteChat(false);
  };

  const handleSelectAllDelete = () => {
    const collectionDelete: String[] = [];
    chats.forEach((chat: Chat) => {
      collectionDelete.push(chat.ID);
    });
    setDeleteCollection(collectionDelete);
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

  console.log(deleteCollection);
  return {
    handleDeleteCollection,
    handleSendMessage,
    copyAction,
    handleInputChange,
    messageState,
    chats,
    handleDeleteLocalMessage,
    handleSelectAllDelete,
    deleteCollection,
    dropdownMenu,
    deleteChat,
    handleSetChat,
    handlePressEnter,
    toggleDeleteChat,
    toggleDropdownMenu,
  };
};
