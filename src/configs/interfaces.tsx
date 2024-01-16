export interface Chat {
  message: string;
  date: string;
  from: string;
}

export interface ChatBubble {
  isActiveDelete: boolean;
  chat: Chat;
}
