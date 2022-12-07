import {logResponse} from '../utils/log-utils'
import {parseInput, pickDirectoriesAtLeast, pickDirectoriesAtMost} from "./utils";

const TASK_DATA = ['07', 'Advanced']
const TASK_LABEL = TASK_DATA.join(' ')

const TOTAL_SPACE = 70000000;
const NEEDED_SPACE = 30000000;

export const advanced_07 = async (inputContent: string[], logIt: boolean) => {

  const directories = parseInput(inputContent);
  const usedSpace = directories[0].getSize();
  const directoryThreshold = usedSpace - (TOTAL_SPACE - NEEDED_SPACE);

  const result = pickDirectoriesAtLeast(directories, directoryThreshold)
  .sort((dir1, dir2) => dir1.getSize() - dir2.getSize())[0].getSize();

  logIt && logResponse(TASK_LABEL, result);

  return result;
}
