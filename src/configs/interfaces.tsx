import { Message } from "@/domains/Messages";

export interface ChatBubble {
  isActiveDelete: boolean;
  onClickCheck: (ID: string) => void;
  deleteCollection?: String[];
  message: Message;
  isLoading?: boolean;
  lastIndexMessage?: boolean;
  onReload: () => {};
}
