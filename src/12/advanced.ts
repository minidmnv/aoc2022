import {findShortestPath, logResponse} from '../utils'
import {buildGrid} from "./utils";

const TASK_DATA = ['12', 'Advanced']
const TASK_LABEL = TASK_DATA.join(' ')

export const advanced_12 = async (inputContent: string[], logIt: boolean) => {

  const {grid, destinationPoint} = buildGrid(inputContent);

  const response = [...findShortestPath(grid, destinationPoint!, {
    pointPredicate: (point, currentPoint) => currentPoint.value - point.value <= 1,
  }).values()].filter((shortestPath) => +shortestPath.pointString.split(',')[2] === 0)
  .sort((pathA, pathB) => pathA.distanceFromStart - pathB.distanceFromStart)[0].distanceFromStart;

  logIt && logResponse(TASK_LABEL, response);

  return response;
}
