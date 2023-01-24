import { logResponse } from '../utils';

const TASK_DATA = ['15', 'Advanced'];
const TASK_LABEL = TASK_DATA.join(' ');

export const advanced16 = async (inputContent: string[], remainingTime: number, logIt: boolean): Promise<any> => {
  const response = 'fail';
  logIt && logResponse(TASK_LABEL, response);

  return response;
};
