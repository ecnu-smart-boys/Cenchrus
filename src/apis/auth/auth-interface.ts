export interface LoginReq {
  captcha: string;
  captchaId: string;
  password: string;
  username: string;
}

export interface LoginResp {
  id: string;
  username: string;
  name: string;
  gender: number;
  age: number;
  avatar: string;
  phone: string;
  email: string;
  disabled: boolean;
  role: string;
}
