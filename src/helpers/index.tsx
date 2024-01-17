import { format } from "date-fns";
import { Chat } from "@/configs/interfaces";

export const copyText = (text: string) => navigator.clipboard.writeText(text);

export const saveLocalMessage = (chat: Chat[]) => {
  localStorage.setItem("message", JSON.stringify(chat));
};
export const loadLocalMessage = () => {
  return JSON.parse(localStorage.getItem("message") || "[]");
};

export const formatDateTime = (date: string) => {
  return format(date, "hh:mm aaaaa'm'");
};
