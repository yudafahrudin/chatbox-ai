export interface Message {
  id: string;
  createdAt?: Date;
  content: string;
  role: "system" | "user" | "assistant" | "function" | "data" | "tool";
}

export interface RatingMessage {
  id: string;
  liked: boolean;
  disliked: boolean;
  ratingMessage: string;
}
