import {basic_12} from "../12/basic";
import {advanced_12} from "../12/advanced";
import {buildGrid} from "../12/utils";
import {CartesianPoint} from "../utils";

describe("Day 12 tests", () => {

  const TEST_INPUT = [
    'Sabqponm',
    'abcryxxl',
    'accszExk',
    'acctuvwj',
    'abdefghi',
  ]

  describe("Day 12 utils tests", () => {
    test("test input should build grid with starting point at right position", () => {
      expect(buildGrid(TEST_INPUT).startingPoint!.toString()).toStrictEqual(new CartesianPoint(0, 0, 0).toString());
    })

    test("test input should build grid with destination point at right position", () => {
      expect(buildGrid(TEST_INPUT).destinationPoint!.toString()).toStrictEqual(new CartesianPoint(5, 2, 25).toString());
    })

    test("test input should build grid with point at right position", () => {
      expect(buildGrid(TEST_INPUT).grid.getPoint(3, 3).toString()).toStrictEqual(new CartesianPoint(3, 3, 19).toString());
    })

    test("test input should build grid with point with right value", () => {
      expect(buildGrid(TEST_INPUT).grid.getPoint(1, 1).value).toStrictEqual(1);
    })

  });

  describe("Day 12 basic tests", () => {

    test("test input should return correct answer", () => {
      return basic_12(TEST_INPUT, false).then(data => {
        expect(data).toStrictEqual(31);
      });
    });

  });

  describe("Day 12 advanced tests", () => {
    test("test input should return correct answer", () => {
      return advanced_12(TEST_INPUT, false).then(data => {
        expect(data).toStrictEqual(29);
      });
    });
  });
})
