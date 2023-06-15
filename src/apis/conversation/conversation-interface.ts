import { callHelp } from "@/apis/conversation/conversation";

export interface ConversationInfo {
  conversationId: string;
  startTime: number;
  endTime: number;
}

export interface ConsultRecordInfo {
  id: string;
  visitorName: string;
  consultantName: string;
  startTime: number;
  endTime: number;
  score: number;
  comment: string;
  helper: string;
}

export interface DayConsultInfo {
  consultationCount: number;
  timestamp: number;
}

export interface HelpRecordInfo {
  id: number;
  consultantName: string;
  supervisorName: string;
  startTime: number;
  endTime: number;
}

export interface ConsultRecordsResp {
  records: ConsultRecordInfo[];
  total: number;
}

export interface HelpRecordsResp {
  records: HelpRecordInfo[];
  total: number;
}

export interface SettingReq {
  maxConversations: number;
}

export interface ConsultRecordListReq {
  current: number;
  size: number;
  name: string;
  timestamp: number;
}

export interface EndReq {
  conversationId: string;
}

export interface CallHelpReq {
  toId: string;
  conversationId: string;
}

export interface CommentReq {
  conversationId: string;
  text: string;
  tag: string;
}

export interface RankUserInfo {
  avatar: string;
  name: string;
  total: number;
}
export interface RankResp {
  consultations: RankUserInfo[];
  goodComments: RankUserInfo[];
}

export interface OnlineStaffListReq {
  current: number;
  size: number;
}
export interface OnlineStaffInfo {
  userId: string;
  name: string;
  state: number;
}
export interface OnlineInfoResp {
  staffs: OnlineStaffInfo[];
  liveConversations: number;
  total: number;
}

export interface ConsultationInfo {
  consultantName: string;
  consultantAvatar: string;
  consultantId: string;
  phone: string;
  visitorName: string;
  visitorAvatar: string;
  visitorId: string;
  startTime: number;
  lastTime: number;
  end: boolean;
}

export interface availableSupervisorsResp {
  avatar: string;
  name: string;
  id: string;
}

export interface HelpInfo {
  avatar: string;
  supervisorName: string;
  supervisorId: string;
  startTime: number;
  endTime: number;
  end: boolean;
  helpId: string;
}
export interface WebConversationInfoResp {
  consultationInfo: ConsultationInfo;
  helpInfo: HelpInfo | null;
  visitorScore: number;
  visitorText: string;
  tag: string;
  consultantText: string;
}

export interface RemoveConversationReq {
  conversationId: string;
}

export interface callHelpResp {
  conversationId: string;
  userId: string;
  name: string;
  avatar: string;
  isEnd: boolean;
}

export interface UserSigResp {
  userSig: string;
}
