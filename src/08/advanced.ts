import {logResponse} from '../utils/log-utils'
import {findTreeScoreWithBestVisibility} from "./utils";

const TASK_DATA = ['08', 'Advanced']
const TASK_LABEL = TASK_DATA.join(' ')

export const advanced_08 = async (inputContent: string[], logIt: boolean) => {

  const result = findTreeScoreWithBestVisibility(inputContent);

  logIt && logResponse(TASK_LABEL, result);

  return result;
}
