import request from "@/apis/http";
import { CaptchaResp } from "@/apis/captcha/captcha-interface";

export function captcha(): Promise<CaptchaResp> {
  return request({
    method: "get",
    url: "/captcha"
  });
}
