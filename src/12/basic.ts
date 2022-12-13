import {alphabetCharCode, CartesianPoint, findShortestPath, logResponse} from '../utils'

const TASK_DATA = ['12', 'Basic']
const TASK_LABEL = TASK_DATA.join(' ')

export const basic_12 = async (inputContent: string[], logIt: boolean) => {
  const {grid, startingPoint, destinationPoint} = buildGrid(inputContent);

  const response = findShortestPath(grid, startingPoint!, destinationPoint!);

  logIt && logResponse(TASK_LABEL, response);

  return response;
}

const buildGrid = (lines: string[]) => {
  let startingPoint, destinationPoint: CartesianPoint | undefined;
  const grid: CartesianPoint[][] =
      lines.map((line, y) =>
          line.split("").map((val, x) => {
            if (val === 'S') {
              startingPoint = new CartesianPoint(x, y, alphabetCharCode('a'));
              return startingPoint;
            } else if (val === 'E') {
              destinationPoint = new CartesianPoint(x, y, alphabetCharCode('z'));
              return destinationPoint;
            }

            return new CartesianPoint(x, y, alphabetCharCode(val));
          }));

  return {
    grid,
    startingPoint,
    destinationPoint,
  }
}
