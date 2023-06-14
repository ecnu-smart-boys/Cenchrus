import tim from "@/imComponent/utils/index";
import { imLoginReq, MessageList } from "@/apis/im/im-interface";
import { Message } from "tim-js-sdk";
export function imLogin(options: imLoginReq): Promise<any> {
  return tim.login({ ...options });
}

export function imLogout(): Promise<any> {
  return tim.logout();
}

export function imSendMessage(message: Message): Promise<any> {
  return tim.sendMessage(message);
}

export function imRevokeMessage(message: Message): Promise<any> {
  return tim.revokeMessage(message);
}

export function getConversationList(): Promise<any> {
  return tim.getConversationList();
}

export function imGetMessageList(
  toUserId: string,
  nextReqMessageID?: string
): Promise<{
  data: {
    messageList: MessageList[];
    nextReqMessageID: string;
    isCompleted: boolean;
  };
}> {
  if (nextReqMessageID) {
    return tim.getMessageList({
      conversationID: `C2C${toUserId}`,
      nextReqMessageID
    });
  }
  return tim.getMessageList({
    conversationID: `C2C${toUserId}`
  });
}
