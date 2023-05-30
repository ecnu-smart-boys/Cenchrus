import {
  DisableReq,
  UpdateArrangementReq
} from "@/apis/userArrange/user-interface";
import request from "@/apis/http";

export function disable(disableReq: DisableReq): Promise<any> {
  return request({
    method: "put",
    url: "/user_arrange/disable",
    data: disableReq
  });
}

export function enable(disableReq: DisableReq): Promise<any> {
  return request({
    method: "put",
    url: "/user_arrange/enable",
    data: disableReq
  });
}

export function updateArrangement(
  updateArrangementReq: UpdateArrangementReq
): Promise<any> {
  return request({
    method: "post",
    url: "/user_arrange/updateArrangement",
    data: updateArrangementReq
  });
}
