import { logResponse } from '../utils'

const TASK_DATA = ['13', 'Advanced']
const TASK_LABEL = TASK_DATA.join(' ')

export const advanced_13 = async (inputContent: string[], logIt: boolean) => {

  const response = 'fail';

  logIt && logResponse(TASK_LABEL, response);

  return response;
}
