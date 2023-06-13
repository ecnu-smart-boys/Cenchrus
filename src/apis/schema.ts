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
  content:
    | OnlineConversation
    | EndHelpNotification
    | EndConsultationNotification
    | any;
}

export interface OnlineConversation {
  conversationId: string;
  userId: string;
  name: string;
  avatar: string;
  end: boolean;
}

export interface EndHelpNotification {
  conversationId: string;
  helpId: string;
  consultantName: string;
  supervisorName: string;
}

export interface EndConsultationNotification {
  consultationId: string;
  helpId: string;
  visitorName: string;
  consultantName: string;
  supervisorName: string;
}
