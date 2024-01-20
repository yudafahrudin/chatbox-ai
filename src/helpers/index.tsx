import { format } from "date-fns";
import { Message, RatingMessage } from "@/domains/Messages";

export const copyText = (text: string) => navigator.clipboard.writeText(text);

export const saveLocalMessage = (chat: Message[]) => {
  localStorage.setItem("message", JSON.stringify(chat));
};

export const loadLocalMessage = () => {
  return JSON.parse(localStorage.getItem("message") || "[]");
};

export const saveLocalRatingMessage = (rating: RatingMessage[]) => {
  localStorage.setItem("rating", JSON.stringify(rating));
};

export const loadLocalRatingMessage = () => {
  return JSON.parse(localStorage.getItem("rating") || "[]");
};

export const formatDateTime = (date: Date) => {
  return format(date, "hh:mm aaaaa'm'");
};
