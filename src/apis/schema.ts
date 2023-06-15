import { MessageInfo } from "@/apis/message/message-interface";

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
    | newMessageNotification
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
  consultationId: string;
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

export interface newMessageNotification {
  helpId: string;
  conversationId: string;
  info: MessageInfo;
}
