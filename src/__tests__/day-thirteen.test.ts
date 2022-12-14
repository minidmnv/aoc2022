import { advanced_13 } from '../13/advanced'
import { basic_13 } from '../13/basic'

describe("Day 13 tests", () => {

  const TEST_INPUT = [
    ''
  ]

  describe("Day 13 utils tests", () => {

  });

  describe("Day 13 basic tests", () => {

    test("test input should return correct answer", () => {
      return basic_13(TEST_INPUT, false).then(data => {
        expect(data).toStrictEqual(31);
      });
    });

  });

  describe("Day 13 advanced tests", () => {
    test("test input should return correct answer", () => {
      return advanced_13(TEST_INPUT, false).then(data => {
        expect(data).toStrictEqual(29);
      });
    });
  });
})
