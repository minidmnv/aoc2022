import {basic_12} from "../12/basic";
import {advanced_12} from "../12/advanced";

describe("Day 12 tests", () => {

  const TEST_INPUT = [
    'Sabqponm',
    'abcryxxl',
    'accszExk',
    'acctuvwj',
    'abdefghi',
  ]

  describe("Day 12 utils tests", () => {

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
        expect(data).toStrictEqual(2713310158);
      });
    });
  });
})
