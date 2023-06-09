import tim from "./index";
import TIM, { Message } from "tim-js-sdk";
export function createTextMessage(toUserId: string, text: string): Message {
  return tim.createTextMessage({
    to: toUserId,
    conversationType: TIM.TYPES.CONV_C2C,
    payload: {
      text
    }
  });
}
export function createImageMessage(toUserId: string, file: any): Message {
  return tim.createImageMessage({
    to: toUserId,
    conversationType: TIM.TYPES.CONV_C2C,
    payload: {
      file
    }
  });
}
export function createAudioMessage(toUserId: string, file: any) {
  return tim.createAudioMessage({
    to: toUserId,
    conversationType: TIM.TYPES.CONV_C2C,
    payload: {
      file
    }
  });
}
