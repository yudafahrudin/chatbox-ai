import { useEffect, useState } from "react";
import { useChat } from "ai/react";

import { Message } from "@/domains/Messages";
import { saveLocalMessage, loadLocalMessage } from "@/helpers";

export const useChatRoom = () => {
  const {
    isLoading,
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    reload,
  } = useChat({
    api: "/api/completion",
  });

  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [deleteChat, setDeleteChat] = useState(false);
  const [deleteCollection, setDeleteCollection] = useState<String[]>([]);

  useEffect(() => {
    const localMessage: Message[] = loadLocalMessage();
    if (localMessage.length !== 0) {
      setMessages(localMessage);
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      saveLocalMessage(messages);
    }
  }, [messages]);

  const toggleDropdownMenu = () => {
    if (!deleteChat) {
      setDropdownMenu((prev) => {
        return !prev;
      });
    } else {
      setDeleteChat(false);
    }
  };

  const handleSendMessage = () => {
    saveLocalMessage(messages);
  };

  const handleDeleteCollection = (id: string) => {
    if (deleteCollection.length === 0) {
      setDeleteCollection([id]);
    } else {
      if (!deleteCollection.includes(id)) {
        setDeleteCollection((prev) => {
          return [...prev, id];
        });
      } else {
        setDeleteCollection((prev) => {
          return [...prev.filter((ids) => ids !== id)];
        });
      }
    }
  };

  const handleDeleteLocalMessage = () => {
    const newChats = messages.filter(
      (chat) => !deleteCollection.includes(chat.id)
    );
    setMessages(newChats);
    saveLocalMessage(newChats);
    setDeleteCollection([]);
    setDeleteChat(false);
  };

  const handleSelectAllDelete = () => {
    const collectionDelete: String[] = [];
    messages.forEach((chat: Message) => {
      collectionDelete.push(chat.id);
    });
    setDeleteCollection(collectionDelete);
  };

  const toggleDeleteChat = () => {
    setDropdownMenu(false);
    setDeleteChat(true);
  };

  const copyAction = () => {
    navigator.clipboard.writeText("sss");
  };

  return {
    reload,
    isLoading,
    handleSubmit,
    messages,
    input,
    handleDeleteCollection,
    handleSendMessage,
    copyAction,
    handleInputChange,
    handleDeleteLocalMessage,
    handleSelectAllDelete,
    deleteCollection,
    dropdownMenu,
    deleteChat,
    toggleDeleteChat,
    toggleDropdownMenu,
  };
};
