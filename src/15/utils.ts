import { manhattanDistance, Point } from '../utils';
import { Range, rangeSort, SensorBeaconModel } from './types';

export const createSensorBeaconModel = (inputLines: string[]): SensorBeaconModel => {
  const result: SensorBeaconModel = [];

  inputLines.map(text => {
    const sensor = new Point(+text.match(/x=(.+?),/)![1], +text.match(/y=(.+?):/)![1]);
    const beacon = new Point(+text.substring(text.indexOf(':')).match(/x=(.+?),/)![1], +text.substring(text.indexOf(':')).match(/y=(.+?)$/)![1]);

    result.push([sensor, beacon]);
  });

  return result;
};

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

    const newRange = createRange(sensor.x, countAdditionalDistance(pair, checkY), minIndex, maxIndex);
    newRange && ranges.push(newRange);
  });

  const result = Range.merge(ranges.sort(rangeSort));

  removeSensorAndBeaconAsCovered && occupiedX.forEach(x => {
    const reorganizeRange = result.find(range => range.has(x));
    if (reorganizeRange != null) {
      const index = result.indexOf(reorganizeRange);
      result.splice(index, 1, ...reorganizeRange.split(x));
    }
  });

  return result;
};

const createRange = (x: number, distance: number, minIndex: number, maxIndex: number): Range | undefined => {
  if (distance < 0) {
    return undefined;
  }
  const start = x - distance > minIndex ? x - distance : minIndex;
  const end = x + distance < maxIndex ? x + distance : maxIndex;

  return new Range(start, end);
};

const countAdditionalDistance = (sensorBeacon: Point[], y: number): number => {
  const sensor = sensorBeacon[0];
  const coveredDistance = manhattanDistance(sensorBeacon);
  const distanceToY = manhattanDistance([sensor, new Point(sensor.x, y)]);

  return coveredDistance - distanceToY;
};
