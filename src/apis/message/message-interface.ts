export interface AllMessageReq {
  conversationId: string;
  consultationIterator: number;
  helpIterator: number;
  size: number;
}

export interface MessageInfo {
  fromId: string;
  toId: string;
  msgBody: string;
  time: number;
  revoked: boolean;
  iterator: number;
}
export interface AllMsgListResp {
  consultation: MessageInfo[];
  help: MessageInfo[] | null;
  callHelp: boolean;
}
