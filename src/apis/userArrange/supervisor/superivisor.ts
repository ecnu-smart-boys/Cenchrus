import request from "@/apis/http";
import {
  AddSupervisorReq,
  GetSupervisorsResp
} from "@/apis/userArrange/supervisor/supervisor-interface";
import { GetPageReq } from "@/apis/userArrange/user-interface";

export function getSupervisors(
  getSupervisorsReq: GetPageReq
): Promise<GetSupervisorsResp> {
  return request({
    method: "get",
    url: "/user_arrange/supervisors",
    params: getSupervisorsReq
  });
}

export function addSupervisor(
  addSupervisorReq: AddSupervisorReq
): Promise<any> {
  return request({
    method: "post",
    url: "/user_arrange/addSupervisor",
    data: addSupervisorReq
  });
}
