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
  SettingReq,
  WebConversationInfoResp
} from "@/apis/conversation/conversation-interface";

/************************* 获得已经结束的会话记录列表接口 *************************/

// 管理员获得咨询记录列表
export function getAllConsultations(
  consultRecordListReq: ConsultRecordListReq
): Promise<ConsultRecordsResp> {
  return request({
    method: "get",
    url: "/conversation/admin/consultations",
    params: consultRecordListReq
  });
}

// 咨询师获得最近咨询记录
export function getRecentConsultations(): Promise<ConsultRecordsResp> {
  return request({
    method: "get",
    url: "/conversation/consultant/recentConsultations"
  });
}

// 咨询师获得咨询记录列表
export function getConsultantConsultations(
  consultRecordListReq: ConsultRecordListReq
): Promise<ConsultRecordsResp> {
  return request({
    method: "get",
    url: "/conversation/consultant/consultations",
    params: consultRecordListReq
  });
}

// 督导获得求助记录列表
export function getSupervisorHelpRecords(
  consultRecordListReq: ConsultRecordListReq
): Promise<HelpRecordsResp> {
  return request({
    method: "get",
    url: "/conversation/supervisor/helpRecords",
    params: consultRecordListReq
  });
}

// 督导获得最近求助记录
export function getRecentHelps(): Promise<HelpRecordsResp> {
  return request({
    method: "get",
    url: "/conversation/supervisor/recentHelps"
  });
}

// 督导获得绑定咨询师的咨询记录
export function getBoundConsultations(
  consultRecordListReq: ConsultRecordListReq
): Promise<ConsultRecordsResp> {
  return request({
    method: "get",
    url: "/conversation/supervisor/boundConsultations",
    params: consultRecordListReq
  });
}

/************************* 咨询相关信息，展示在页面首页上 *************************/

// 管理员获得今日咨询信息
export function getTodayConsultations(): Promise<ConversationInfo[]> {
  return request({
    method: "get",
    url: "/conversation/todayConsultations"
  });
}

// 管理员获得最近七日咨询信息
export function getRecentWeek(): Promise<DayConsultInfo[]> {
  return request({
    method: "get",
    url: "/conversation/recentWeek"
  });
}

// 咨询师获得今日咨询信息
export function getTodayOwnConsultations(): Promise<ConversationInfo[]> {
  return request({
    method: "get",
    url: "/conversation/consultant/todayConsultations"
  });
}

// 督导获得今日的求助信息
export function getTodayHelps(): Promise<ConversationInfo[]> {
  return request({
    method: "get",
    url: "/conversation/supervisor/todayHelps"
  });
}

// 会话设置
export function setting(settingReq: SettingReq): Promise<any> {
  return request({
    method: "post",
    url: "/conversation/setting",
    data: settingReq
  });
}

// 获得当月咨询数量排行和好评排行
export function getRank(): Promise<RankResp> {
  return request({
    method: "get",
    url: "/conversation/rank"
  });
}

// 获得在线最大会话数量
export function getMaxConversations(): Promise<number> {
  return request({
    method: "get",
    url: "/conversation/maxConversations"
  });
}

// 管理员获得当前在线咨询师和咨询数量
export function getOnlineConsultantInfo(
  onlineStaffListReq: OnlineStaffListReq
): Promise<OnlineInfoResp> {
  return request({
    method: "get",
    url: "/conversation/onlineConsultantInfo",
    params: onlineStaffListReq
  });
}

// 管理员获得当前在线督导和求助数量
export function getOnlineSupervisorInfo(
  onlineSupervisorInfo: OnlineStaffListReq
): Promise<OnlineInfoResp> {
  return request({
    method: "get",
    url: "/conversation/onlineSupervisorInfo",
    params: onlineSupervisorInfo
  });
}

// 督导获得当前在线且与他绑定的咨询师和咨询数量
export function getOnlineBoundConsultantInfo(
  onlineBoundConsultantInfo: OnlineStaffListReq
): Promise<OnlineInfoResp> {
  return request({
    method: "get",
    url: "/conversation/onlineBoundConsultantInfo",
    params: onlineBoundConsultantInfo
  });
}

/************************* 进行在线咨询会话 *************************/

// 结束咨询会话
export function endConsultation(endReq: EndReq): Promise<any> {
  return request({
    method: "post",
    url: "/conversation/endConsultation",
    data: endReq
  });
}

// 求助督导
export function callHelp(callHelpReq: CallHelpReq): Promise<any> {
  return request({
    method: "post",
    url: "/conversation/callHelp",
    data: callHelpReq
  });
}

// 结束求助
export function endHelp(endReq: EndReq): Promise<any> {
  return request({
    method: "post",
    url: "/conversation/endHelp",
    data: endReq
  });
}

// 咨询师会话结束后评价
export function consultantComment(commentReq: CommentReq): Promise<any> {
  return request({
    method: "post",
    url: "/conversation/consultantComment",
    data: commentReq
  });
}

/************************* 查看已经结束的会话详情 *************************/

// 督导查看自己的求助记录信息
export function getSupervisorOwnHelpInfo(
  helpId: string
): Promise<WebConversationInfoResp> {
  return request({
    method: "get",
    url: "/conversation/details/supervisorOwnHelpInfo",
    params: helpId
  });
}

// 督导查看自己绑定的咨询师的咨询记录信息
export function getBoundConsultantsInfo(
  conversationId: string
): Promise<WebConversationInfoResp> {
  return request({
    method: "get",
    url: "/conversation/details/boundConsultantsInfo",
    params: conversationId
  });
}

// 咨询师查看自己的咨询记录信息
export function getConsultantOwnConsultationInfo(
  conversationId: string
): Promise<WebConversationInfoResp> {
  return request({
    method: "get",
    url: "/conversation/details/consultantOwnConsultationInfo",
    params: conversationId
  });
}

// 管理员查看咨询记录消息列表
export function getAdminConsultationInfo(
  conversationId: string
): Promise<WebConversationInfoResp> {
  return request({
    method: "get",
    url: "/conversation/details/adminConsultationInfo",
    params: conversationId
  });
}

/************************* 查看正在进行的会话详情 *************************/
