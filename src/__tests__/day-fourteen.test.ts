import {basic_14} from "../14/basic";
import {advanced_14} from "../14/advanced";
import {createCaveModel} from "../14/utils";

describe("Day 14 tests", () => {

  const TEST_INPUT: string[] = [
      '498,4 -> 498,6 -> 496,6',
      '503,4 -> 502,4 -> 502,9 -> 494,9',
  ];

  describe("Day 14 utils tests", () => {

    const testCaveModel = createCaveModel(TEST_INPUT);

    test("should create test cave map with correct sizes", () => {
      expect(testCaveModel.size).toStrictEqual(11);
    })

    test("should create test cave with sand source in correct place", () => {
      expect(testCaveModel.get(500)!.findIndex(el => el.toString() === '500,0,+')).toBeGreaterThanOrEqual(0);
    })

  });

  describe("Day 14 basic tests", () => {
    test("test input should return correct answer", () => {
      return basic_14(TEST_INPUT, false).then(data => {
        expect(data).toStrictEqual(24);
      });
    });

  });

  // describe("Day 14 advanced tests", () => {
  //   test("test input should return correct answer", () => {
  //     return advanced_14(TEST_INPUT, false).then(data => {
  //       expect(data).toStrictEqual(140);
  //     });
  //   });
  // });
})
