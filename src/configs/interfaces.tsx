export interface Chat {
  ID: string;
  message: string;
  date: string;
  from: string;
  liked?: boolean;
  disliked?: boolean;
}

export interface ChatBubble {
  isActiveDelete: boolean;
  onClickCheck: (ID: string) => void;
  deleteCollection?: String[];
  chat: Chat;
}
