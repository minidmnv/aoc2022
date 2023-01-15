import { logResponse } from '../utils';
import { checkCoverRanges, createSensorBeaconModel } from './utils';

const TASK_DATA = ['15', 'Basic'];
const TASK_LABEL = TASK_DATA.join(' ');

export const basic15 = async (inputContent: string[], y: number, logIt: boolean): Promise<any> => {

  const sensorBeaconModel = createSensorBeaconModel(inputContent);

  const response = checkCoverRanges(sensorBeaconModel, y).reduce((acc, range) => acc + range.length(), 0);
  logIt && logResponse(TASK_LABEL, response);

  return response;
};
