import request from "@/apis/http";
import {
  AddArrangementReq,
  ArrangementReq,
  ArrangementResp,
  MonthArrangementReq,
  MonthArrangementResp,
  NotArrangedEmployeesReq
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

export function addArrangement(
  addArrangementReq: AddArrangementReq
): Promise<any> {
  return request({
    method: "post",
    url: "/arrangement/addArrangement",
    data: addArrangementReq
  });
}

export function removeArrangement(
  addArrangementReq: AddArrangementReq
): Promise<any> {
  return request({
    method: "put",
    url: "/arrangement/removeArrangement",
    data: addArrangementReq
  });
}

export function notArrangedConsultants(
  notArrangedConsultantsReq: NotArrangedEmployeesReq
): Promise<ArrangementResp[]> {
  return request({
    method: "get",
    url: "/arrangement/notArrangedConsultants",
    params: notArrangedConsultantsReq
  });
}

export function notArrangedSupervisors(
  notArrangedSupervisorsReq: NotArrangedEmployeesReq
): Promise<ArrangementResp[]> {
  return request({
    method: "get",
    url: "/arrangement/notArrangedSupervisors",
    params: notArrangedSupervisorsReq
  });
}
export function personalArrangement(): Promise<number[]> {
  return request({
    method: "get",
    url: "/arrangement/personalArrangement"
  });
}
