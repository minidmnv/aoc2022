import {readFile} from "../utils/file-utils";
import {FileSeparator} from "../utils/fileSeparator";
import { logResponse } from '../utils/log-utils'
import {countScoreBasic} from "./utils";

const TASK_DATA = ["02", "Basic"];
const TASK_LABEL = TASK_DATA.join(" ");

export const basic_02 = async (logIt: boolean) => {
  const input = readFile(TASK_DATA[0], FileSeparator.LINE);

  const result = input.map((values) => {
    const [his, mine] = values.split(" ");
    return countScoreBasic(mine, his);
  }).reduce((acc, val) => acc + val, 0);

  logIt && logResponse(TASK_LABEL, result);

  return ;
};
