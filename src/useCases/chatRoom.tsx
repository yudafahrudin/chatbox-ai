import { useEffect, useState } from "react";
import { useChat } from "ai/react";

import { Message, RatingMessage } from "@/domains/Messages";
import {
  saveLocalMessage,
  loadLocalMessage,
  saveLocalRatingMessage,
  loadLocalRatingMessage,
} from "@/helpers";

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
    let ratingMessage: RatingMessage[] = loadLocalRatingMessage();

    if (messages.length > 0) {
      saveLocalMessage(messages);
      const collectionIds = messages.map((message) => message.id);

      // if dont have rating locale
      if (ratingMessage.length === 0) {
        messages.forEach((message: Message) => {
          if (message.role === "assistant") {
            ratingMessage.push({
              id: message.id,
              liked: false,
              disliked: false,
              ratingMessage: "",
            });
          }
        });
      }

      // if new chat incoming
      if (ratingMessage.length < messages.length) {
        const lastMessage = messages[messages.length - 1];
        ratingMessage.push({
          id: lastMessage.id,
          liked: false,
          disliked: false,
          ratingMessage: "",
        });
      }

      // if some chat deleted
      if (ratingMessage.length > messages.length) {
        ratingMessage = ratingMessage.filter((rating) =>
          collectionIds.includes(rating.id)
        );
      }

      saveLocalRatingMessage(ratingMessage);
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

  const handleLikeDislikeChat = (id: string, type: string) => {
    const ratingMessage: RatingMessage[] = loadLocalRatingMessage();
    const upadatedRating = ratingMessage.map((rating) => {
      if (rating.id === id) {
        if (type === "like") {
          rating.disliked = false;
          rating.liked = true;
        } else {
          rating.liked = false;
          rating.disliked = true;
        }
      }
      return rating;
    });
    saveLocalRatingMessage(upadatedRating);
  };

  const getRatingMessage = (id: string) => {
    const ratingMessage: RatingMessage[] = loadLocalRatingMessage();
    return ratingMessage.find((rating) => rating.id === id);
  };

  return {
    reload,
    isLoading,
    handleSubmit,
    messages,
    input,
    getRatingMessage,
    handleDeleteCollection,
    handleSendMessage,
    handleInputChange,
    handleDeleteLocalMessage,
    handleSelectAllDelete,
    deleteCollection,
    dropdownMenu,
    deleteChat,
    handleLikeDislikeChat,
    toggleDeleteChat,
    toggleDropdownMenu,
  };
};
