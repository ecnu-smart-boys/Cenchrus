import request from "@/apis/http";
import {
  CallHelpReq,
  CommentReq,
  ConsultRecordListReq,
  ConsultRecordsResp,
  ConversationInfo,
  DayConsultInfo,
  EndReq,
  HelpRecordsResp,
  OnlineInfoResp,
  OnlineStaffListReq,
  RankResp,
  SettingReq
} from "@/apis/conversation/conversation-interface";
export function getAllConsultations(
  consultRecordListReq: ConsultRecordListReq
): Promise<ConsultRecordsResp> {
  return request({
    method: "get",
    url: "/conversation/admin/consultations",
    params: consultRecordListReq
  });
}

export function getTodayConsultations(): Promise<ConversationInfo[]> {
  return request({
    method: "get",
    url: "/conversation/todayConsultations"
  });
}

export function getRecentWeek(): Promise<DayConsultInfo[]> {
  return request({
    method: "get",
    url: "/conversation/recentWeek"
  });
}

export function getConsultantConsultations(
  consultRecordListReq: ConsultRecordListReq
): Promise<ConsultRecordsResp> {
  return request({
    method: "get",
    url: "/conversation/consultant/consultations",
    params: consultRecordListReq
  });
}

export function getRecentConsultations(): Promise<ConsultRecordsResp> {
  return request({
    method: "get",
    url: "/conversation/consultant/recentConsultations"
  });
}

export function getTodayOwnConsultations(): Promise<ConversationInfo[]> {
  return request({
    method: "get",
    url: "/conversation/consultant/todayConsultations"
  });
}

export function getSupervisorHelpRecords(
  consultRecordListReq: ConsultRecordListReq
): Promise<HelpRecordsResp> {
  return request({
    method: "get",
    url: "/conversation/supervisor/helpRecords",
    params: consultRecordListReq
  });
}

export function getRecentHelps(): Promise<HelpRecordsResp> {
  return request({
    method: "get",
    url: "/conversation/supervisor/recentHelps"
  });
}

export function getTodayHelps(): Promise<ConversationInfo[]> {
  return request({
    method: "get",
    url: "/conversation/supervisor/todayHelps"
  });
}

export function setting(settingReq: SettingReq): Promise<any> {
  return request({
    method: "post",
    url: "/conversation/setting",
    data: settingReq
  });
}

export function getRank(): Promise<RankResp> {
  return request({
    method: "get",
    url: "/conversation/rank"
  });
}

export function getMaxConversations(): Promise<number> {
  return request({
    method: "get",
    url: "/conversation/maxConversations"
  });
}

export function getOnlineConsultantInfo(
  onlineStaffListReq: OnlineStaffListReq
): Promise<OnlineInfoResp> {
  return request({
    method: "get",
    url: "/conversation/onlineConsultantInfo",
    params: onlineStaffListReq
  });
}

export function getOnlineSupervisorInfo(
  onlineSupervisorInfo: OnlineStaffListReq
): Promise<OnlineInfoResp> {
  return request({
    method: "get",
    url: "/conversation/onlineSupervisorInfo",
    params: onlineSupervisorInfo
  });
}

export function getOnlineBoundConsultantInfo(
  onlineBoundConsultantInfo: OnlineStaffListReq
): Promise<OnlineInfoResp> {
  return request({
    method: "get",
    url: "/conversation/onlineBoundConsultantInfo",
    params: onlineBoundConsultantInfo
  });
}

///////////////////////////////////////////////////////////////////////

export function endConsultation(endReq: EndReq): Promise<any> {
  return request({
    method: "post",
    url: "/conversation/endConsultation",
    data: endReq
  });
}

export function callHelp(callHelpReq: CallHelpReq): Promise<any> {
  return request({
    method: "post",
    url: "/conversation/callHelp",
    data: callHelpReq
  });
}

export function endHelp(endReq: EndReq): Promise<any> {
  return request({
    method: "post",
    url: "/conversation/endHelp",
    data: endReq
  });
}
export function comment(commentReq: CommentReq): Promise<any> {
  return request({
    method: "post",
    url: "/conversation/comment",
    data: commentReq
  });
}
