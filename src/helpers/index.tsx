import { Message } from "@/domains/Messages";

export const copyText = (text: string) => navigator.clipboard.writeText(text);

export const saveLocalMessage = (chat: Message[]) => {
  localStorage.setItem("message", JSON.stringify(chat));
};
export const loadLocalMessage = () => {
  return JSON.parse(localStorage.getItem("message") || "[]");
};
