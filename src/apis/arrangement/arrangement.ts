import request from "@/apis/http";
import {
  ArrangementReq,
  ArrangementResp,
  MonthArrangementReq,
  MonthArrangementResp
} from "@/apis/arrangement/arrangement-interface";

export function monthArrangement(
  monthArrangementReq: MonthArrangementReq
): Promise<MonthArrangementResp[]> {
  return request({
    method: "get",
    url: "/arrangement/monthArrangement",
    params: monthArrangementReq
  });
}

export function consultantArrangement(
  arrangementReq: ArrangementReq
): Promise<ArrangementResp[]> {
  return request({
    method: "get",
    url: "/arrangement/consultants",
    params: arrangementReq
  });
}

export function supervisorArrangement(
  arrangementReq: ArrangementReq
): Promise<ArrangementResp[]> {
  return request({
    method: "get",
    url: "/arrangement/supervisors",
    params: arrangementReq
  });
}
