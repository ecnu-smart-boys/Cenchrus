export interface GetSupervisorsResp {
  supervisors: Supervisor[];
  total: number;
}

export interface Supervisor {
  age: number;
  arrangement: number;
  avatar: string;
  consultantList: ConsultantList[];
  consultTimes: number;
  department: string;
  disabled: boolean;
  email: string;
  gender: number;
  id: string;
  idNumber: string;
  name: string;
  phone: string;
  qualification: string;
  qualificationCode: string;
  role: string;
  title: string;
  totalTime: number;
  username: string;
}

export interface ConsultantList {
  avatar: string;
  id: string;
  name: string;
}

export interface AddSupervisorReq {
  age: number;
  department: string;
  email: string;
  gender: number;
  idNumber: string;
  name: string;
  password: string;
  phone: string;
  qualification: string;
  qualificationCode: string;
  title: string;
  username: string;
}

export interface UpdateSupervisorReq {
  age: number;
  department: string;
  gender: number;
  id: string;
  idNumber: string;
  name: string;
  qualification: string;
  qualificationCode: string;
  title: string;
}
