import { useEffect, useState } from "react";

import { RatingMessage } from "@/domains/Messages";
import {
  copyText,
  saveLocalRatingMessage,
  loadLocalRatingMessage,
} from "@/helpers";

export const useChatBubbleStart = (id: string) => {
  const [showToast, setShowToast] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [ratingMessage, setRatingMessage] = useState<RatingMessage>();
  const [allRatingMessage, setAllRatingMessage] = useState<RatingMessage[]>();
  const [ratingText, setRatingText] = useState("");

  useEffect(() => {
    const ratingMessage: RatingMessage[] = loadLocalRatingMessage();
    setRatingMessage(ratingMessage.find((rating) => rating.id === id));
    setAllRatingMessage(ratingMessage);
  }, []);

  const handleLikeDislikeChat = (type: string) => {
    const upadatedRating = allRatingMessage?.map((rating) => {
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

    saveLocalRatingMessage(upadatedRating || []);
  };

  const handleCopy = (message: string) => {
    copyText(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 1000);
  };

  const onRatingTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRatingText(e.target.value);
  };

  const onRatingTextSubmit = () => {
    const upadatedRating = allRatingMessage?.map((rating) => {
      if (rating.id === id) {
        rating.ratingMessage = ratingText;
      }
      return rating;
    });

    saveLocalRatingMessage(upadatedRating || []);
  };

  return {
    ratingText,
    handleCopy,
    showToast,
    setShowToast,
    isLiked,
    setIsLiked,
    ratingMessage,
    onRatingTextChange,
    onRatingTextSubmit,
    handleLikeDislikeChat,
  };
};
