import request from "@/apis/http";
import { GetVisitorsResp } from "@/apis/userArrange/visitor/visitor-interface";
import { GetPageReq } from "@/apis/userArrange/user-interface";

export function getVisitors(
  getVisitorsReq: GetPageReq
): Promise<GetVisitorsResp> {
  return request({
    method: "get",
    url: "/user_arrange/visitors",
    params: getVisitorsReq
  });
}
