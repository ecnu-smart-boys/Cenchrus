export interface GetVisitorsResp {
  total: number;
  visitorInfos: VisitorInfo[];
}

export interface VisitorInfo {
  age: number;
  avatar: string;
  disabled: boolean;
  email: string;
  emergencyContact: string;
  emergencyPhone: string;
  gender: number;
  id: string;
  name: string;
  phone: string;
  role: string;
  username: string;
}
