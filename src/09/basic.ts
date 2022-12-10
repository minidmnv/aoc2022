import {logResponse} from '../utils/log-utils'
import {Point} from "./types";
import {moveRope, parseInstruction} from "./utils";

const TASK_DATA = ['09', 'Basic']
const TASK_LABEL = TASK_DATA.join(' ')

export const basic_09 = async (inputContent: string[], logIt: boolean) => {

  const visited: Map<number, Set<number>> = new Map<number, Set<number>>();

  let head = new Point(0, 0);
  let tail = new Point(0, 0);

  inputContent.forEach(line => {
    const instruction = parseInstruction(line);
    const [knots, newPoints] = moveRope(instruction, [head, tail]);

    head = knots[0];
    tail = knots[1];

    newPoints.forEach((point: Point) => visited.get(point.y)?.add(point.x) || visited.set(point.y, new Set([point.x])));
  })

  const result = [...visited.values()].reduce((acc, points) => acc + points.size, 0);

  logIt && logResponse(TASK_LABEL, result);

  return result;
}
