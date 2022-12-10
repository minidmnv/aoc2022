import {moveRope, parseInstruction} from "../09/utils";
import {basic_09} from "../09/basic";
import {Point} from "../09/types";
import {advanced_09} from "../09/advanced";

describe("Day 09 tests", () => {
  const TEST_INPUT = [
    'R 4',
    'U 4',
    'L 3',
    'D 1',
    'R 4',
    'D 1',
    'L 5',
    'R 2',
  ];

  const TEST_INPUT_2 = [
    'R 5',
    'L 9',
    'U 3',
    'D 6',
  ];

  const TEST_INPUT_3 = [
    'L 5',
    'R 9',
    'D 3',
    'U 6',
  ];

  const TEST_INPUT_4 = [
    'R 5',
    'U 8',
    'L 8',
    'D 3',
    'R 17',
    'D 10',
    'L 25',
    'U 20',
  ];

  describe("Day 09 utils tests", () => {
    test("Should parse up instruction properly", () => {
      expect(parseInstruction("U 9")).toStrictEqual([9, 0]);
    })

    test("Should parse down instruction properly", () => {
      expect(parseInstruction("D 3")).toStrictEqual([-3, 0]);
    })

    test("Should parse right instruction properly", () => {
      expect(parseInstruction("R 4")).toStrictEqual([0, 4]);
    })

    test("Should parse left instruction properly", () => {
      expect(parseInstruction("L 11")).toStrictEqual([0, -11]);
    })

    test("Move rope both from start (0,0) R 9 should add 9 points", () => {
      expect(moveRope([0, 9], [new Point(0,0), new Point(0,0)])[1].length)
      .toStrictEqual(9);
    })

    test("Move rope both from start (0,0) R 45 should add 45 points", () => {
      expect(moveRope([0, 45], [new Point(0,0), new Point(0,0)])[1].length)
      .toStrictEqual(45);
    })

    test("Move rope from HEAD(4,4), TAIL(4, 3) L 3 should add 3 points and move tail accordingly", () => {
      const result = moveRope([0, -3], [new Point(4,4), new Point(4,3)]);
      expect(result[1].length).toStrictEqual(3);
      expect(result[0][1]).toStrictEqual(new Point(2, 4));
    })

    test("Move rope both from start (0,0) L 3 should have points on x axis", () => {
      const result: Point[] = moveRope([0, -3], [new Point(0,0), new Point(0,0)])[1];
      expect(result.reduce((acc, point) => acc + point.y, 0)).toStrictEqual(0);
      expect(result.reduce((acc, point) => acc + point.x, 0)).toBeLessThan(0);
    })

    test("Move rope both from start (0,0) U 4 should move head accordingly", () => {
      expect(moveRope([4, 0], [new Point(0,0), new Point(0,0)])[0][0]).toStrictEqual(new Point(0, 4));
    })

    test("Move rope both from start (0,0) D 2 should move tail accordingly", () => {
      expect(moveRope([-2, 0], [new Point(0,0), new Point(0,0)])[0][1]).toStrictEqual(new Point(0, -1));
    })

    test("Move rope from HEAD(0,-1), TAIL(-1, 0) R 1 should add 2 points and move tail accordingly", () => {
      const result = moveRope([0, 1], [new Point(0,-1), new Point(-1,0)]);
      expect(result[1].length).toStrictEqual(1);
      expect(result[0][1]).toStrictEqual(new Point(0, -1));
    })

    test("Move rope from HEAD(1,0), TAIL(0, 1) D 1 should add 2 points and move tail accordingly", () => {
      const result = moveRope([-1, 0], [new Point(1,0), new Point(0,1)]);
      expect(result[1].length).toStrictEqual(1);
      expect(result[0][1]).toStrictEqual(new Point(1, 0));
    })

    test("Move rope from HEAD(2,0), TAIL(1, 1) U 1 should add 2 points and move tail accordingly", () => {
      const result = moveRope([1, 0], [new Point(0,2), new Point(1,1)]);
      expect(result[1].length).toStrictEqual(1);
      expect(result[0][1]).toStrictEqual(new Point(0, 2));
    })

    test("Move rope from HEAD(1,-1), TAIL(1, 1) U 1 should add 2 points and move tail accordingly", () => {
      const result = moveRope([1, 0], [new Point(-1,-1), new Point(0,-2)]);
      expect(result[1].length).toStrictEqual(1);
      expect(result[0][1]).toStrictEqual(new Point(-1, -1));
    })

    test("Move rope from HEAD(-10,-11), TAIL(-9, -10) L 1 should add 2 points and move tail accordingly", () => {
      const result = moveRope([0, -1], [new Point(-10,-11), new Point(-9,-10)]);
      expect(result[1].length).toStrictEqual(1);
      expect(result[0][1]).toStrictEqual(new Point(-10, -11));
    })

    test("Move rope from HEAD(-10,-11), TAIL(-11, -10) R 1 should add 2 points and move tail accordingly", () => {
      const result = moveRope([0, 1], [new Point(-10,-11), new Point(-10,-11)]);
      expect(result[1].length).toStrictEqual(1);
      expect(result[0][1]).toStrictEqual(new Point(-10, -11));
    })

  });

  describe("Day 09 basic tests", () => {

    test("test input should return correct answer", () => {
      return basic_09(TEST_INPUT, false).then(data => {
        expect(data).toStrictEqual(13);
      });
    });

    test("basic should cover returning of head", () => {
      return basic_09(TEST_INPUT_2, false).then(data => {
        expect(data).toStrictEqual(13);
      });
    });

    test("basic should cover returning of head reversed", () => {
      return basic_09(TEST_INPUT_3, false).then(data => {
        expect(data).toStrictEqual(13);
      });
    });

    test("basic should cover diagonal move", () => {
      const TEST_INPUT = [
        'R 1',
        'U 1',
        'R 1',
        'U 1',
        'L 1',
        'U 1',
      ];

      return basic_09(TEST_INPUT, false).then(data => {
        expect(data).toStrictEqual(3);
      });
    });

    test("basic should cover diagonal move", () => {
      const TEST_INPUT = [
        'D 1',
        'R 2',
      ];

      return basic_09(TEST_INPUT, false).then(data => {
        expect(data).toStrictEqual(2);
      });
    });

  });

  describe("Day 09 advanced tests", () => {

    test("test input should return correct answer", () => {
      return advanced_09(TEST_INPUT, false).then(data => {
        expect(data).toStrictEqual(1);
      });
    });

    test("test input should return correct answer", () => {
      return advanced_09(TEST_INPUT_4, false).then(data => {
        expect(data).toStrictEqual(36);
      });
    });

  });
})
