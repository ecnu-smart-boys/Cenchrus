export interface AllMessageReq {
  conversationId: string;
  consultationCurrent: number;
  consultationSize: number;
  helpCurrent: number;
  helpSize: number;
}

export interface MessageInfo {
  fromId: string;
  toId: string;
  msgBody: string;
  time: number;
  revoked: boolean;
}
export interface AllMsgListResp {
  consultation: MessageInfo[];
  consultationTotal: number;
  help: MessageInfo[] | null;
  helpTotal: number;
}
