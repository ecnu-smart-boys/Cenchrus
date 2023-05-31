import request from "@/apis/http";
import { LoginReq, LoginResp } from "@/apis/auth/auth-interface";

export function login(loginReq: LoginReq): Promise<LoginResp> {
  return request({
    method: "post",
    url: "/auth/login-staff",
    data: loginReq
  });
}

export function logout(): Promise<any> {
  return request({
    method: "post",
    url: "/user/logout"
  });
}
