import {logResponse} from '../utils/log-utils'
import {parseInput, pickDirectoriesAtMost} from "./utils";

const TASK_DATA = ['07', 'Basic']
const TASK_LABEL = TASK_DATA.join(' ')

const DIRECTORY_SIZE_THRESHOLD = 100000;

export const basic_07 = async (inputContent: string[], logIt: boolean) => {

  const directories = parseInput(inputContent);

  const result = pickDirectoriesAtMost(directories, DIRECTORY_SIZE_THRESHOLD).reduce((acc, dir) => acc + dir.getSize(), 0);

  logIt && logResponse(TASK_LABEL, result);

  return result;
}
