export interface DisableReq {
  id: string;
}

export interface GetPageReq {
  current?: number;
  name?: string;
  size?: number;
}

export interface UpdateArrangementReq {
  arrangement: number;
  id: string;
}
