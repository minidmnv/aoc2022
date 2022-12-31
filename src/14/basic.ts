import {logResponse} from '../utils'
import {createCaveModel} from "./utils";

const TASK_DATA = ['14', 'Basic']
const TASK_LABEL = TASK_DATA.join(' ')

export const basic_14 = async (inputContent: string[], logIt: boolean) => {

  const caveModel = createCaveModel(inputContent);

  const response = 'fail';
  logIt && logResponse(TASK_LABEL, response);

  return response;
}
