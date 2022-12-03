import {readFile} from "../utils/file-utils";
import {FileSeparator} from "../utils/fileSeparator";
import { logResponse, measureMemoryAndTime } from '../utils/log-utils'

const TASK_DATA = ["01", "Basic"];
const TASK_LABEL = TASK_DATA.join(" ");

export const basic_01 = async (logIt: boolean) => {
  const initial = process.memoryUsage().heapUsed / 1024 / 1024;

  console.time(TASK_LABEL);
  const input = readFile(TASK_DATA[0], FileSeparator.LINE);;
  const caloriesList = input.map(val => {
    return +val;
  })
  const result: number[] = [];
  caloriesList.reduce((acc, snackCalories) => {
    if(snackCalories > 0) {
      return acc + snackCalories;
    } else {
      result.push(acc);
      return 0;
    }
  }, 0);

  const sortedResult = result.sort((a, b) => b - a);

  logIt && logResponse(TASK_LABEL, sortedResult[0]);
  logIt && measureMemoryAndTime(initial, TASK_LABEL);

  return sortedResult;
};

basic_01(true);
