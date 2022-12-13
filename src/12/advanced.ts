import { logResponse } from '../utils'

const TASK_DATA = ['12', 'Advanced']
const TASK_LABEL = TASK_DATA.join(' ')

export const advanced_12 = async (inputContent: string[], logIt: boolean) => {

  logIt && logResponse(TASK_LABEL, response);

  return response;
}
