export interface GetConsultantsResp {
  consultants: Consultant[];
  total: number;
}

export interface Consultant {
  age: number;
  arrangement: number;
  avatar: string;
  avgComment: number;
  consultTimes: number;
  department: string;
  disabled: boolean;
  email: string;
  gender: number;
  id: string;
  idNumber: string;
  name: string;
  phone: string;
  role: string;
  supervisorList: SupervisorList[];
  title: string;
  totalTime: number;
  username: string;
}

export interface SupervisorList {
  id: string;
  avatar: string;
  name: string;
}

export interface AddConsultantReq {
  age: number;
  department: string;
  email: string;
  gender: number;
  idNumber: string;
  name: string;
  password: string;
  phone: string;
  supervisorIds: string[];
  title: string;
  username: string;
}

export interface UpdateConsultantReq {
  age: number;
  department: string;
  gender: number;
  id: string;
  idNumber: string;
  name: string;
  supervisorIds: string[];
  title: string;
}
