import { logResponse } from '../utils';

const TASK_DATA = ['15', 'Basic'];
const TASK_LABEL = TASK_DATA.join(' ');

export const basic16 = async (inputContent: string[], logIt: boolean): Promise<any> => {

  const response = 'fail';
  logIt && logResponse(TASK_LABEL, response);

  return response;
};
