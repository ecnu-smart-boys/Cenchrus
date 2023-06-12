import MD5 from "crypto-js/md5";
import { MessageInfo } from "@/apis/message/message-interface";
import { MessageList } from "@/apis/im/im-interface";
import {
  ImageElem,
  MessageBackend,
  SoundElem,
  TextElem
} from "@/apis/im/im-backend-interface";

/**
 * convert time to 00:00:00
 * @param time
 */
export function parseTime(time: number): string {
  const h = parseInt(String((time / 60 / 60) % 24));
  const hs = h < 10 ? "0" + h : h;
  const m = parseInt(String((time / 60) % 60));
  const ms = m < 10 ? "0" + m : m;
  const s = parseInt(String(time % 60));
  const ss = s < 10 ? "0" + s : s;
  return `${hs}:${ms}:${ss}`;
}

/**
 * convert time to 00'00''
 * @param time
 */
export function parseSecond(time: number): string {
  const m = parseInt(String((time / 60) % 60));
  const ms = m < 10 ? "0" + m : m;
  const s = parseInt(String(time % 60));
  const ss = s < 10 ? "0" + s : s;
  return `${ms}'${ss}''`;
}

export function parseTimestamp(timestamp: number): string {
  const date = new Date(parseInt(String(timestamp)) * 1000);
  const Moth =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  const Day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  const Hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  const Minute =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  const Second =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return Moth + "月" + Day + "日 " + Hour + ":" + Minute + ":" + Second;
}
export function parseSchedule(schedule: number): string {
  const weeks = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
  const result = [];
  let mark = 1;
  for (let i = 6; i >= 0; i--) {
    if ((schedule & mark) !== 0) {
      result.push(weeks[i]);
    }
    mark <<= 1;
  }
  result.reverse();
  return result.join(", ");
}

export function toNumSchedule(schedule: boolean[]): number {
  let result = 0;
  let mark = 1;
  for (let i = 6; i >= 0; i--) {
    if (schedule[i]) {
      result += mark;
    }
    mark <<= 1;
  }
  return result;
}

export function toBoolArraySchedule(schedule: number): boolean[] {
  const result = [false, false, false, false, false, false, false];
  let mark = 1;
  for (let i = 6; i >= 0; i--) {
    if ((schedule & mark) !== 0) {
      result[i] = true;
    }
    mark <<= 1;
  }
  return result;
}

export function md5(str: string): string {
  return MD5(str).toString().toUpperCase();
}

export function mosaic(str: string): string {
  if (!str) return "";
  const strings = str.split("");
  strings.splice(6, 4, "****");
  return strings.join("");
}

export function getRecentWeek(): string[] {
  const result = [];
  const now = new Date();
  result.unshift(now.getMonth() + 1 + "/" + now.getDate());
  for (let i = 0; i < 6; i++) {
    now.setTime(now.getTime() - 24 * 60 * 60 * 1000);
    result.unshift(now.getMonth() + 1 + "/" + now.getDate());
  }
  return result;
}

export function messageAdapter(
  message: MessageInfo,
  myId: string
): MessageList {
  let data: MessageBackend;
  const defaultData: MessageList = {
    clientTime: Math.floor(message.time / 1000),
    conversationID: "",
    flow: "",
    from: "",
    to: "",
    payload: { text: "" },
    isRead: true,
    isRevoked: message.revoked,
    time: Math.floor(message.time / 1000),
    type: "TIMTextElem"
  };
  try {
    data = JSON.parse(message.msgBody);
  } catch (ignored) {
    // 默认采用空白文本
    return defaultData;
  }
  defaultData.type = data.MsgType;
  defaultData.from = message.fromId;
  defaultData.to = message.toId;
  defaultData.flow = message.fromId == myId ? "OUT" : "IN";
  if (data.MsgType == "TIMTextElem") {
    const payload = data.MsgContent as TextElem;
    defaultData.payload = {
      text: payload.Text
    };
  } else if (data.MsgType == "TIMImageElem") {
    const payload = data.MsgContent as ImageElem;
    defaultData.payload = {
      imageInfoArray: [
        {
          height: payload.ImageInfoArray[0].Height,
          width: payload.ImageInfoArray[0].Width,
          imageUrl: payload.ImageInfoArray[0].URL,
          url: payload.ImageInfoArray[0].URL,
          size: payload.ImageInfoArray[0].Size
        }
      ]
    };
  } else if (data.MsgType == "TIMSoundElem") {
    const payload = data.MsgContent as SoundElem;
    defaultData.payload = {
      url: payload.Url,
      size: payload.Size,
      second: payload.Second
    };
  }
  return defaultData;
}
