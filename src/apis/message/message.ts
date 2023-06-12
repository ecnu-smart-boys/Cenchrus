import {
  AllMessageReq,
  AllMsgListResp
} from "@/apis/message/message-interface";
import request from "@/apis/http";

// 督导查看自己的求助记录消息列表
export function getSupervisorOwnHelpMsg(
  allMessageReq: AllMessageReq
): Promise<AllMsgListResp> {
  return request({
    method: "get",
    url: "/im/details/supervisorOwnHelpMsg",
    params: allMessageReq
  });
}

// 督导查看自己绑定的咨询师的咨询记录消息列表
export function getBoundConsultantsMsg(
  allMessageReq: AllMessageReq
): Promise<AllMsgListResp> {
  return request({
    method: "get",
    url: "/im/details/boundConsultantsMsg",
    params: allMessageReq
  });
}

// 咨询师查看自己的咨询记录消息列表
export function getConsultantOwnConsultationMsg(
  allMessageReq: AllMessageReq
): Promise<AllMsgListResp> {
  return request({
    method: "get",
    url: "/im/details/consultantOwnConsultationMsg",
    params: allMessageReq
  });
}

// 管理员查看咨询记录消息列表
export function getAdminConsultationMsg(
  allMessageReq: AllMessageReq
): Promise<AllMsgListResp> {
  return request({
    method: "get",
    url: "/im/details/adminConsultationMsg",
    params: allMessageReq
  });
}
