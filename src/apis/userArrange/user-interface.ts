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

export interface AvailableSupervisorResp {
  avatar: string;
  id: string;
  name: string;
}

export interface UpdatePsdAndAvatarReq {
  avatar: string;
  oldPsd: string;
  newPsd: string;
}
