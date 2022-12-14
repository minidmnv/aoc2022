import {findShortestPath, logResponse} from '../utils'
import {buildGrid} from "./utils";

const TASK_DATA = ['12', 'Basic']
const TASK_LABEL = TASK_DATA.join(' ')

export const basic_12 = async (inputContent: string[], logIt: boolean) => {
  const {grid, startingPoint, destinationPoint} = buildGrid(inputContent);

  const response = findShortestPath(grid, startingPoint!, {
    pointPredicate: (point, currentPoint) => point.value <= currentPoint.value + 1,
  }).get(destinationPoint!.toString())!.distanceFromStart;

  logIt && logResponse(TASK_LABEL, response);

  return response;
}
