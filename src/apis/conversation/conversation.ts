import request from "@/apis/http";
import {
  ConsultRecordsResp,
  ConversationInfo,
  DayConsultInfo,
  HelpRecordsResp,
  SettingReq
} from "@/apis/conversation/conversation-interface";
export function getAllConsultations(): Promise<ConsultRecordsResp> {
  return request({
    method: "get",
    url: "/conversation/admin/consultations"
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

export function getConsultantConsultations(): Promise<ConsultRecordsResp> {
  return request({
    method: "get",
    url: "/conversation/consultant/consultations"
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

export function getSupervisorHelpRecords(): Promise<HelpRecordsResp> {
  return request({
    method: "get",
    url: "/conversation/supervisor/helpRecords"
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
