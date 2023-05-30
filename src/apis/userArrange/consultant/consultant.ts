import request from "@/apis/http";
import {
  AddConsultantReq,
  GetConsultantsResp
} from "@/apis/userArrange/consultant/consultant-interface";
import { GetPageReq } from "@/apis/userArrange/user-interface";

export function getConsultants(
  getConsultantsReq: GetPageReq
): Promise<GetConsultantsResp> {
  return request({
    method: "get",
    url: "/user_arrange/consultants",
    params: getConsultantsReq
  });
}

export function addConsultant(
  addConsultantReq: AddConsultantReq
): Promise<any> {
  return request({
    method: "post",
    url: "/user_arrange/addConsultant",
    data: addConsultantReq
  });
}
