import {logResponse, manhattanDistance, Point} from '../utils';
import {checkCover, createSensorBeaconModel} from "./utils";
import {SensorBeaconModel} from "./types";

const TASK_DATA = ['15', 'Basic'];
const TASK_LABEL = TASK_DATA.join(' ');

export const basic15 = async (inputContent: string[], y: number, logIt: boolean): Promise<any> => {

  const sensorBeaconModel = createSensorBeaconModel(inputContent);

  const response = checkCover(sensorBeaconModel, y).size;
  logIt && logResponse(TASK_LABEL, response);

  return response;
};
