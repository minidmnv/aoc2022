import {logResponse} from '../utils';
import {checkCover, createSensorBeaconModel} from "./utils";

const TASK_DATA = ['15', 'Advanced'];
const TASK_LABEL = TASK_DATA.join(' ');

export const advanced15 = async (inputContent: string[], minIndex: number, maxIndex: number, logIt: boolean): Promise<any> => {
  const sensorBeaconModel = createSensorBeaconModel(inputContent);
  let response = 0;
  for(let i = 0; i <= maxIndex; i++) {
    const coveredXs = checkCover(sensorBeaconModel, i, minIndex, maxIndex, false);
    console.log(i, coveredXs.size);

    if( coveredXs.size < maxIndex + 1) {
      response = Array.from(Array(maxIndex).keys()).find(ind => !coveredXs.has(ind))! * 4000000 + i;
    }
  }

  logIt && logResponse(TASK_LABEL, response);

  return response;
};
