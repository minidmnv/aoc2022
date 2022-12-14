import {alphabetCharCode, CartesianPoint, Grid} from "../utils";

export const buildGrid = (lines: string[]) => {
  let startingPoint: CartesianPoint | undefined, destinationPoint: CartesianPoint | undefined;
  const grid: Grid<CartesianPoint> =
      new Grid(lines.map((line, y) =>
          line.split("").map((val, x) => {
            if (val === 'S') {
              startingPoint = new CartesianPoint(x, y, alphabetCharCode('a'));
              return startingPoint;
            } else if (val === 'E') {
              destinationPoint = new CartesianPoint(x, y, alphabetCharCode('z'));
              return destinationPoint;
            }

            return new CartesianPoint(x, y, alphabetCharCode(val));
          })));

  return {
    grid,
    startingPoint,
    destinationPoint,
  }
}
