import {logResponse} from '../utils';
import { analyzeSandRestAtCave, createCaveModel } from './utils';
import { Sand, SAND_RESULT } from './types';
import { showMe } from './show-me';

const TASK_DATA = ['14', 'Advanced'];
const TASK_LABEL = TASK_DATA.join(' ');

export const advanced14 = async (inputContent: string[], logIt: boolean): Promise<any> => {
  const caveModel = createCaveModel(inputContent);
  const response = analyzeSandRestAtCave(caveModel,
    (result: Sand) => result[0] === SAND_RESULT.REST && result[1].y === 0,
    (tick: Sand) => [SAND_RESULT.REST, tick[1]]
  ) + 1;
  // showMe(caveModel);
  logIt && logResponse(TASK_LABEL, response);

  return response;
};
