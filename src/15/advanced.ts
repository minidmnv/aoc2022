import { logResponse } from '../utils';
import { checkCoverRanges, createSensorBeaconModel } from './utils';

const TASK_DATA = ['15', 'Advanced'];
const TASK_LABEL = TASK_DATA.join(' ');

export const advanced15 = async (inputContent: string[], minIndex: number, maxIndex: number, logIt: boolean): Promise<any> => {
  const sensorBeaconModel = createSensorBeaconModel(inputContent);
  let response = 0;
  for (let i = 0; i <= maxIndex; i++) {
    const ranges = checkCoverRanges(sensorBeaconModel, i, minIndex, maxIndex, false);
    console.log(i, ranges.length);

    if (ranges.length > 1) {
      response = (ranges[0].end + 1) * 4000000 + i;
      break;
    }
  }

  logIt && logResponse(TASK_LABEL, response);

  return response;
};
