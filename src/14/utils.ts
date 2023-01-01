import { CAVE_ELEMENT, CaveElementValue, CaveModel, Sand, SAND_RESULT } from './types';
import { GridPoint, Point } from '../utils';

export const createCaveModel = (input: string[]): CaveModel => {
  const mapOfElementsOnXAxis: CaveModel = new Map<number, Array<GridPoint<CaveElementValue>>>();

  mapOfElementsOnXAxis.set(500, [new GridPoint<CaveElementValue>(500, 0, CAVE_ELEMENT.SAND_SOURCE)]);

  input.forEach(lineInput => {
    const rockLinePoints = lineInput.split(' -> ');
    for (let i = 0; i < rockLinePoints.length - 1; i++) {
      const [startingX, startingY] = rockLinePoints[i].split(',').map(el => +el);
      const [finishX, finishY] = rockLinePoints[i + 1].split(',').map(el => +el);

      const xLine = finishX - startingX;
      const yLine = finishY - startingY;

      if (xLine !== 0) {
        for (let j = 0; j <= Math.abs(xLine); j++) {
          const x = startingX + j * Math.sign(xLine);
          mapOfElementsOnXAxis.has(x)
            ? mapOfElementsOnXAxis.get(x)?.push(new GridPoint<CaveElementValue>(x, startingY, CAVE_ELEMENT.ROCK))
            : mapOfElementsOnXAxis.set(x, [new GridPoint<CaveElementValue>(x, startingY, CAVE_ELEMENT.ROCK)]);
        }
      } else {
        for (let j = 0; j <= Math.abs(yLine); j++) {
          const y = startingY + j * Math.sign(yLine);
          mapOfElementsOnXAxis.has(startingX)
            ? mapOfElementsOnXAxis.get(startingX)?.push(new GridPoint<CaveElementValue>(startingX, y, CAVE_ELEMENT.ROCK))
            : mapOfElementsOnXAxis.set(startingX, [new GridPoint<CaveElementValue>(startingX, y, CAVE_ELEMENT.ROCK)]);
        }
      }
    }
  });

  return mapOfElementsOnXAxis;
};

export const getCaveDeepLevel = (cave: CaveModel): number => {
  let deepLevel = 0;
  cave.forEach(points => {
    const newDeepLevel = points.sort((pointA, pointB) => pointB.y - pointA.y)[0].y;
    deepLevel = deepLevel < newDeepLevel ? newDeepLevel : deepLevel;
  });

  return deepLevel;
};

export const analyzeSandRestAtCave = (cave: CaveModel, finishCondition: (result: Sand) => boolean, overDeepFn: (tick: Sand) => Sand): number => {
  let tickResult: Sand = [SAND_RESULT.MOVE, new Point(500, 0)];
  let sandRested: number = 0;
  const deepLevel = getCaveDeepLevel(cave);

  const checkPossibilityToMove = (point: Point): Point | undefined => {
    const cavePoint = cave.get(point.x)?.find((caveModelPoint) => caveModelPoint.stringCoords() === point.toString());
    if (cavePoint !== undefined) {
      if (cavePoint.value !== CAVE_ELEMENT.AIR) {
        return undefined;
      }
    }

    return point;
  };
  const tick = (): Sand => {
    if (tickResult[0] === SAND_RESULT.REST) {
      sandRested += 1;
      !cave.has(tickResult[1].x) && cave.set(tickResult[1].x, []);
      cave.get(tickResult[1].x)?.push(new GridPoint<CaveElementValue>(tickResult[1].x, tickResult[1].y, CAVE_ELEMENT.SAND));
      return [SAND_RESULT.MOVE, new Point(500, 0)];
    }

    if (tickResult[1].y > deepLevel) {
      return overDeepFn(tickResult);
    }

    const y = tickResult[1].y + 1;
    const sandPosition = checkPossibilityToMove(new Point(tickResult[1].x, y)) ??
      checkPossibilityToMove(new Point(tickResult[1].x - 1, y)) ??
      checkPossibilityToMove(new Point(tickResult[1].x + 1, y));

    if (sandPosition === undefined) {
      return [SAND_RESULT.REST, tickResult[1]];
    }

    return [SAND_RESULT.MOVE, sandPosition];
  };

  do {
    tickResult = tick();
  } while (!finishCondition(tickResult));

  return sandRested;
};
