export interface imLoginReq {
  userID: string;
  userSig: string;
}

export interface MessageList {
  ID: string;
  atUserList: any[];
  avatar: string;
  clientSequence: number;
  clientTime: number;
  cloudCustomData: string;
  conversationID: string;
  conversationSubType: any;
  conversationType: string;
  flow: string;
  from: string;
  isBroadcastMessage: boolean;
  isDeleted: boolean;
  isModified: boolean;
  isPeerRead: boolean;
  isPlaceMessage: number;
  isRead: boolean;
  isResend: boolean;
  isRevoked: boolean;
  isSupportExtension: boolean;
  isSystemMessage: boolean;
  nameCard: string;
  needReadReceipt: boolean;
  nick: string;
  payload: any;
  priority: string;
  protocol: string;
  random: number;
  readReceiptInfo: any;
  revoker: null | any;
  senderTinyID: string;
  sequence: number;
  status: string;
  time: number;
  to: string;
  type: string;
  version: number;
}
