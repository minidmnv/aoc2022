import {readFile} from "../utils/file-utils";
import {FileSeparator} from "../utils/fileSeparator";
import { logResponse, measureMemoryAndTime } from '../utils/log-utils'
import {countScoreAdvanced, countScoreBasic} from "./utils";

const TASK_DATA = ["02", "Advanced"];
const TASK_LABEL = TASK_DATA.join(" ");

export const advanced_02 = async (logIt: boolean) => {
  const initial = process.memoryUsage().heapUsed / 1024 / 1024;
  
  console.time(TASK_LABEL);
  const input = readFile(TASK_DATA[0], FileSeparator.LINE);;

  const result = input.map((values) => {
    const [his, wantedResult] = values.split(" ");
    return countScoreAdvanced(wantedResult, his);
  }).reduce((acc, val) => acc + val, 0);

  logIt && logResponse(TASK_LABEL, result);
  logIt && measureMemoryAndTime(initial, TASK_LABEL);

  return ;
};

advanced_02(true);
