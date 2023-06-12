/**
 * BaseResponse«string»
 */
export interface BaseResponse {
  data: string;
  message: string;
  status: number;
}

export interface WebSocketResponse {
  type: string;
  content: OnlineConversation | any;
}

export interface OnlineConversation {
  conversationId: string;
  userId: string;
  name: string;
  avatar: string;
  isEnd: boolean;
}
