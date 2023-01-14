import {manhattanDistance, Point} from "../utils";
import {SensorBeaconModel} from "./types";

export const createSensorBeaconModel = (inputLines: string[]): SensorBeaconModel => {
  const result: SensorBeaconModel = [];

  inputLines.map(text => {
    const sensor = new Point(+text.match(/x=(.+?),/)![1], +text.match(/y=(.+?):/)![1]);
    const beacon = new Point(+text.substring(text.indexOf(':')).match(/x=(.+?),/)![1], +text.substring(text.indexOf(':')).match(/y=(.+?)$/)![1]);

    result.push([sensor, beacon]);
  })


  return result;
}

export const checkCover = (sensorBeaconModel: SensorBeaconModel, checkY: number, minIndex: number = -Number.MAX_VALUE,
                           maxIndex: number = Number.MAX_VALUE, removeSensorAndBeaconAsCovered: boolean = true): Set<number> => {

  const isPointInRange = (point: Point) => point.x >= minIndex && point.x <= maxIndex;

  const coveredX: Set<number> = new Set<number>();
  const occupiedX: Set<number> = new Set<number>();

  sensorBeaconModel.forEach(pair => {
    const sensor = pair[0];
    const coveredDistance = manhattanDistance(pair);

    if (sensor.y === checkY) {
      occupiedX.add(sensor.x);
    }

    if (pair[1].y === checkY) {
      occupiedX.add(pair[1].x);
    }

    if (manhattanDistance([sensor, new Point(sensor.x, checkY)]) <= coveredDistance) {
      coveredX.add(sensor.x);

      let pointToCheckRight = new Point(sensor.x + 1, checkY);
      let pointToCheckLeft = new Point(sensor.x - 1, checkY);

      let distanceToLeft = manhattanDistance([sensor, pointToCheckLeft]);
      let distanceToRight = manhattanDistance([sensor, pointToCheckRight]);

      while (distanceToLeft <= coveredDistance || distanceToRight <= coveredDistance) {
        distanceToLeft <= coveredDistance && isPointInRange(pointToCheckLeft) && coveredX.add(pointToCheckLeft.x);
        distanceToRight <= coveredDistance && isPointInRange(pointToCheckRight) && coveredX.add(pointToCheckRight.x);

        pointToCheckRight = new Point(pointToCheckRight.x + 1, checkY);
        pointToCheckLeft = new Point(pointToCheckLeft.x - 1, checkY);

        distanceToLeft = manhattanDistance([sensor, pointToCheckLeft]);
        distanceToRight = manhattanDistance([sensor, pointToCheckRight]);
      }
    }
  });

  occupiedX.forEach(x => {
    coveredX.has(x) === removeSensorAndBeaconAsCovered && coveredX.delete(x);
  });

  return coveredX;
}
