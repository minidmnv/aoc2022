import {CAVE_ELEMENT, CaveElementValue} from "./types";
import {GridPoint} from "../utils";

export const createCaveModel = (input: string[]): Map<number, GridPoint<CaveElementValue>[]> => {
  const mapOfElementsOnXAxis: Map<number, GridPoint<CaveElementValue>[]> = new Map<number, GridPoint<CaveElementValue>[]>();

  mapOfElementsOnXAxis.set(500, [new GridPoint<CaveElementValue>(500, 0, CAVE_ELEMENT.SAND_SOURCE)]);

  input.forEach(lineInput => {
    const rockLinePoints = lineInput.split(" -> ");
    for (let i = 0; i < rockLinePoints.length - 1; i++) {
      const [startingX, startingY] = rockLinePoints[i].split(",").map(el => +el);
      const [finishX, finishY] = rockLinePoints[i + 1].split(",").map(el => +el);

      const xLine = startingX - finishX;
      const yLine = startingY - finishY;

      if(xLine !== 0) {
        for (let j = 0; j < Math.abs(xLine); j++) {
          const x = startingX + j * Math.sign(xLine);
          mapOfElementsOnXAxis.has(x) ?
              mapOfElementsOnXAxis.get(x)!.push(new GridPoint<CaveElementValue>(x, startingY, CAVE_ELEMENT.ROCK)) :
              mapOfElementsOnXAxis.set(x, [new GridPoint<CaveElementValue>(x, startingY, CAVE_ELEMENT.ROCK)]);
        }
      } else {
        for (let j = 0; j < Math.abs(yLine); j++) {
          const y = startingY + j * Math.sign(yLine);
          mapOfElementsOnXAxis.has(startingX) ?
              mapOfElementsOnXAxis.get(startingX)!.push(new GridPoint<CaveElementValue>(startingX, y, CAVE_ELEMENT.ROCK)) :
              mapOfElementsOnXAxis.set(startingX, [new GridPoint<CaveElementValue>(startingX, y, CAVE_ELEMENT.ROCK)]);
        }
      }
    }
  })

  return mapOfElementsOnXAxis;
}
