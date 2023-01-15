import { advanced15 } from '../15/advanced';
import { basic15 } from '../15/basic';
import { checkCoverRanges, createSensorBeaconModel } from '../15/utils';
import { manhattanDistance, Point } from '../utils';

describe('Day 15 tests', () => {
  const TEST_INPUT: string[] = [
    'Sensor at x=2, y=18: closest beacon is at x=-2, y=15',
    'Sensor at x=9, y=16: closest beacon is at x=10, y=16',
    'Sensor at x=13, y=2: closest beacon is at x=15, y=3',
    'Sensor at x=12, y=14: closest beacon is at x=10, y=16',
    'Sensor at x=10, y=20: closest beacon is at x=10, y=16',
    'Sensor at x=14, y=17: closest beacon is at x=10, y=16',
    'Sensor at x=8, y=7: closest beacon is at x=2, y=10',
    'Sensor at x=2, y=0: closest beacon is at x=2, y=10',
    'Sensor at x=0, y=11: closest beacon is at x=2, y=10',
    'Sensor at x=20, y=14: closest beacon is at x=25, y=17',
    'Sensor at x=17, y=20: closest beacon is at x=21, y=22',
    'Sensor at x=16, y=7: closest beacon is at x=15, y=3',
    'Sensor at x=14, y=3: closest beacon is at x=15, y=3',
    'Sensor at x=20, y=1: closest beacon is at x=15, y=3'
  ];

  describe('Day 15 utils tests', () => {
    const sensorBeaconMap = createSensorBeaconModel(TEST_INPUT);

    test('should create sensor beacon map - 0', () => {
      expect(sensorBeaconMap[0]).toStrictEqual([new Point(2, 18), new Point(-2, 15)]);
    });

    test('should create sensor beacon map - 5th', () => {
      expect(sensorBeaconMap[5]).toStrictEqual([new Point(14, 17), new Point(10, 16)]);
    });

    test('should create sensor beacon map - 8th', () => {
      expect(sensorBeaconMap[8]).toStrictEqual([new Point(0, 11), new Point(2, 10)]);
    });

    test('should count manhattan distance for first input line', () => {
      expect(manhattanDistance(sensorBeaconMap[0])).toStrictEqual(7);
    });

    test('should count manhattan distance for third input line', () => {
      expect(manhattanDistance(sensorBeaconMap[2])).toStrictEqual(3);
    });

    test('should count manhattan distance point in the same quarter', () => {
      expect(manhattanDistance([new Point(2, 10), new Point(6, 1)])).toStrictEqual(13);
    });

    test('should count manhattan distance point in different quarter on x axis', () => {
      expect(manhattanDistance([new Point(2, 10), new Point(-6, 0)])).toStrictEqual(18);
    });

    test('should count manhattan distance point in different quarter on y axis', () => {
      expect(manhattanDistance([new Point(4, 10), new Point(5, -12)])).toStrictEqual(23);
    });

    test('should count manhattan distance point in different quarter on x and y axis', () => {
      expect(manhattanDistance([new Point(5, 5), new Point(-3, -2)])).toStrictEqual(15);
    });

    test('should count manhattan distance point in the same quarter inverted', () => {
      expect(manhattanDistance([new Point(6, 1), new Point(2, 10)])).toStrictEqual(13);
    });

    test('should count manhattan distance point in different quarter on x axis inverted', () => {
      expect(manhattanDistance([new Point(-6, 0), new Point(2, 10)])).toStrictEqual(18);
    });

    test('should count manhattan distance point in different quarter on y axis inverted', () => {
      expect(manhattanDistance([new Point(5, -12), new Point(4, 10)])).toStrictEqual(23);
    });

    test('should count manhattan distance point in different quarter on x and y axis inverted', () => {
      expect(manhattanDistance([new Point(-3, -2), new Point(5, 5)])).toStrictEqual(15);
    });

    test('should properly create and merge one range', () => {
      expect(checkCoverRanges(sensorBeaconMap, 9).length).toStrictEqual(1);
    });

    test('should properly split range with beacon', () => {
      expect(checkCoverRanges(sensorBeaconMap, 10).length).toStrictEqual(2);
    });

    test('should properly create ranges with gaps and sensors', () => {
      expect(checkCoverRanges(sensorBeaconMap, 11).length).toStrictEqual(3);
    });

    test('should properly create length of ranges', () => {
      const actual = checkCoverRanges(sensorBeaconMap, 11);
      expect(actual[0].length()).toStrictEqual(3);
      expect(actual[2].length()).toStrictEqual(11);
    });
  });

  describe('Day 15 basic tests', () => {
    test('test input should return correct answer', async () => {
      return await basic15(TEST_INPUT, 10, false).then(data => {
        expect(data).toStrictEqual(26);
      });
    });
  });

  describe('Day 15 advanced tests', () => {
    test('test input should return correct answer', async () => {
      return await advanced15(TEST_INPUT, 0, 20, false).then(data => {
        expect(data).toStrictEqual(56000011);
      });
    });
  });
});
