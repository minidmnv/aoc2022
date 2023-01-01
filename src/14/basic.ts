import { logResponse } from '../utils';
import { analyzeSandRestAtCave, createCaveModel } from './utils';
import { Sand, SAND_RESULT } from './types';

const TASK_DATA = ['14', 'Basic'];
const TASK_LABEL = TASK_DATA.join(' ');

export const basic14 = async (inputContent: string[], logIt: boolean): Promise<any> => {
  const caveModel = createCaveModel(inputContent);
  const response = analyzeSandRestAtCave(caveModel,
    (result: Sand) => result[0] === SAND_RESULT.LOST,
    (tick: Sand) => [SAND_RESULT.LOST, tick[1]]
  );
  logIt && logResponse(TASK_LABEL, response);

  return response;
};
