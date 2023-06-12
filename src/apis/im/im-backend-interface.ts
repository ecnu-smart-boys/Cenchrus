export interface MessageBackend {
  MsgType: string;
  MsgContent: ImageElem | SoundElem | TextElem;
}

export interface ImageInfo {
  URL: string;
  Size: number;
  Type: number;
  Width: number;
  Height: number;
}
export interface ImageElem {
  UUID: string;
  ImageFormat: number;
  ImageInfoArray: ImageInfo[];
}

export interface SoundElem {
  Url: string;
  Size: number;
  UUID: number;
  Second: number;
  Download_Flag: number;
}

export interface TextElem {
  Text: string;
}
