import {basic_08} from "../08/basic";
import {advanced_08} from "../08/advanced";
import {checkVisibility, countVisibility, setGridValue} from "../08/utils";
import {readFile, readFileContent} from "../utils/file-utils";
import {FileSeparator} from "../utils/fileSeparator";

describe("Day 08 tests", () => {
  const TEST_INPUT = [
    '30373',
    '25512',
    '65332',
    '33549',
    '35390',
  ];

  describe("Day 08 utils tests", () => {

    const testGrid = TEST_INPUT.map(row => row.split(""));

    test("test grid should return return true for 1 1", () => {
      expect(checkVisibility(testGrid, 1, 1)).toBe(true);
    });

    test("setting grid value should change grid accordingly", () => {
      setGridValue(testGrid, 3, 4, 2);
      expect(testGrid[3][4]).toBe(2);
    });

    test("setting grid value should change only given value", () => {
      setGridValue(testGrid, 2, 4, 3);
      expect(testGrid[3][4]).toBe(2);
    });

    test("test grid middle 5 tree should give result 4", () => {
      expect(countVisibility(testGrid, 1, 2)).toBe(4);
    });

    test("test grid middle fourth tree should give result 8", () => {
      expect(countVisibility(testGrid, 3, 2)).toBe(8);
    });

    test("test grid bottom middle three tree should give result 1", () => {
      expect(countVisibility(testGrid, 4, 2)).toBe(0);
    });

    test("test grid bottom left three tree should give result 0", () => {
      expect(countVisibility(testGrid, 4, 0)).toBe(0);
    });

    test("test grid most left side tree should give result 0", () => {
      expect(countVisibility(testGrid, 2, 0)).toBe(0);
    });

    test("input grid 58 69 should give result 191400", () => {
      const grid = readFile("08", FileSeparator.LINE, true).map(row => row.split(""));
      expect(countVisibility(grid, 69, 58)).toBe(191400);
    });

  });

  describe("Day 08 basic tests", () => {

    test("test input should return correct answer", () => {
      return basic_08(TEST_INPUT, false).then(data => {
        expect(data).toBe(21);
      });
    });

  });

  describe("Day 08 advanced tests", () => {

    test("test input should return correct answer", () => {
      return advanced_08(TEST_INPUT, false).then(data => {
        expect(data).toBe(8);
      });
    });

  });
})
