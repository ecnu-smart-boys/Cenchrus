import tim from "@/im/utils/index";
import { imLoginReq } from "@/apis/im/im-interface";
export function imLogin(options: imLoginReq): Promise<any> {
  return tim.login({ ...options });
}

export function imLogout(): Promise<any> {
  return tim.logout();
}
