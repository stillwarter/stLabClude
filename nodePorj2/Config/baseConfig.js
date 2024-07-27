import dayjs from "dayjs";

export const HTTP_PORT = 3040;
export const PATH_FILE = process.cwd() + `\\Static`;
export const YEAR = dayjs().year();
export const MOUNTH = Number(dayjs().month() + 1);
export const DAY = dayjs().date();


