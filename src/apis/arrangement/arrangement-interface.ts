export interface MonthArrangementReq {
  year: number;
  month: number;
}

export interface MonthArrangementResp {
  consultants: number;
  day: number;
  supervisors: number;
}

export interface ArrangementReq {
  timestamp?: number;
}

export interface ArrangementResp {
  avatar: string;
  id: string;
  name: string;
}

export interface AddArrangementReq {
  timestamp: number;
  userId?: string;
}

export interface NotArrangedEmployeesReq {
  timestamp: number;
  name: string;
}
