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
