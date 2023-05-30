import MD5 from "crypto-js/md5";

export function parseTime(time: number): string {
  const h = parseInt(String((time / 60 / 60) % 24));
  const hs = h < 10 ? "0" + h : h;
  const m = parseInt(String((time / 60) % 60));
  const ms = m < 10 ? "0" + m : m;
  const s = parseInt(String(time % 60));
  const ss = s < 10 ? "0" + s : s;
  return `${hs}:${ms}:${ss}`;
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
