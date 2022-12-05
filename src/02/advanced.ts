import { readFile } from "../utils/file-utils";
import { FileSeparator } from "../utils/fileSeparator";
import { logResponse } from '../utils/log-utils'
import { countScoreAdvanced } from "./utils";

const TASK_DATA = ["02", "Advanced"];
const TASK_LABEL = TASK_DATA.join(" ");

export const advanced_02 = async (logIt: boolean) => {
  const input = readFile(TASK_DATA[0], FileSeparator.LINE);

  const result = input.map((values) => {
    const [his, wantedResult] = values.split(" ");
    return countScoreAdvanced(wantedResult, his);
  }).reduce((acc, val) => acc + val, 0);

  logIt && logResponse(TASK_LABEL, result);

  return ;
};
