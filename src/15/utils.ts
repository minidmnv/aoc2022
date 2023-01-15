import {manhattanDistance, Point} from "../utils";
import {Range, rangeSort, SensorBeaconModel} from "./types";

export const createSensorBeaconModel = (inputLines: string[]): SensorBeaconModel => {
  const result: SensorBeaconModel = [];

  inputLines.map(text => {
    const sensor = new Point(+text.match(/x=(.+?),/)![1], +text.match(/y=(.+?):/)![1]);
    const beacon = new Point(+text.substring(text.indexOf(':')).match(/x=(.+?),/)![1], +text.substring(text.indexOf(':')).match(/y=(.+?)$/)![1]);

    result.push([sensor, beacon]);
  })


  return result;
}

export const checkCoverRanges = (sensorBeaconModel: SensorBeaconModel, checkY: number, minIndex: number = -Number.MAX_VALUE,
                                 maxIndex: number = Number.MAX_VALUE, removeSensorAndBeaconAsCovered: boolean = true): Range[] => {
  const ranges: Range[] = [];
  const occupiedX: Set<number> = new Set<number>();

  sensorBeaconModel.forEach(pair => {
    const sensor = pair[0];

    if (sensor.y === checkY) {
      occupiedX.add(sensor.x);
    }

    if (pair[1].y === checkY) {
      occupiedX.add(pair[1].x);
    }

    ranges.push(createRange(sensor.x, countAdditionalDistance(pair, checkY), minIndex, maxIndex));
  });

  const result = Range.merge(ranges.sort(rangeSort));

  removeSensorAndBeaconAsCovered && occupiedX.forEach(x => {
    const reorganizeRange = result.find(range => range.has(x));
    if(reorganizeRange) {
      const index = result.indexOf(reorganizeRange);
      result.splice(index, 1, ...reorganizeRange.split(x));
    }

  });

  return result;
}

const createRange = (x: number, distance: number, minIndex: number, maxIndex: number): Range => {
  const start = x - distance > minIndex ? x - distance : minIndex;
  const end = x + distance < maxIndex ? x + distance : maxIndex;

  return new Range(start, end);
}

const countAdditionalDistance = (sensorBeacon: Point[], y: number): number => {
  const sensor = sensorBeacon[0];
  const coveredDistance = manhattanDistance(sensorBeacon);
  const distanceToY = manhattanDistance([sensor, new Point(sensor.x, y)]);

  return coveredDistance - distanceToY;
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
