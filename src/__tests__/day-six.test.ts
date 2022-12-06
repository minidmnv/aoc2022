import {day_06} from "../06";

describe("Day 06 tests", () => {

  describe("Day 06 basic tests", () => {

    test("empty input should give fail result", () => {
      return day_06('', 3, false).then(data => {
        expect(data).toBe('fail');
      });
    });

    test("same letters input should give fail result", () => {
      return day_06('aaaaaaaaaaaaaaaaaa', 3, false).then(data => {
        expect(data).toBe('fail');
      });
    });

    test("same letters in consecutive buffers shouldnt be marked", () => {
      return day_06('aabaacccdefg', 3, false).then(data => {
        expect(data).toBe(11);
      });
    });

    test("case 1 should give result 5", () => {
      return day_06('bvwbjplbgvbhsrlpgdmjqwftvncz', 3, false).then(data => {
        expect(data).toBe(5);
      });
    });

    test("case 2 should give result 6", () => {
      return day_06('nppdvjthqldpwncqszvftbrmjlhg', 3, false).then(data => {
        expect(data).toBe(6);
      });
    });

    test("case 3 should give result 10", () => {
      return day_06('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 3, false).then(data => {
        expect(data).toBe(10);
      });
    });

    test("case 4 should give result 11", () => {
      return day_06('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 3, false).then(data => {
        expect(data).toBe(11);
      });
    });

  });

  describe("Day 06 advanced tests", () => {

    test("empty input should give fail result", () => {
      return day_06('', 13, false).then(data => {
        expect(data).toBe('fail');
      });
    });

    test("same letters input should give fail result", () => {
      return day_06('aaaaaaaaaaaaaaaaaa', 13, false).then(data => {
        expect(data).toBe('fail');
      });
    });

    test("case 1 should give result 19", () => {
      return day_06('mjqjpqmgbljsphdztnvjfqwrcgsmlb', 13, false).then(data => {
        expect(data).toBe(19);
      });
    });

    test("case 2 should give result 23", () => {
      return day_06('bvwbjplbgvbhsrlpgdmjqwftvncz', 13, false).then(data => {
        expect(data).toBe(23);
      });
    });

    test("case 3 should give result 23", () => {
      return day_06('nppdvjthqldpwncqszvftbrmjlhg', 13, false).then(data => {
        expect(data).toBe(23);
      });
    });

    test("case 4 should give result 29", () => {
      return day_06('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 13, false).then(data => {
        expect(data).toBe(29);
      });
    });

    test("case 5 should give result 26", () => {
      return day_06('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 13, false).then(data => {
        expect(data).toBe(26);
      });
    });

  });
})
