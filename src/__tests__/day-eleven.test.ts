import { basic_11 } from '../11/basic'
import { inspectItemBasic, parseMonkey } from '../11/utils'
import { advanced_11 } from '../11/advanced'

describe("Day 11 tests", () => {

  const TEST_INPUT = [
  'Monkey 0:',
  'Starting items: 79, 98',
  '  Operation: new = old * 19',
  '  Test: divisible by 23',
  '    If true: throw to monkey 2',
  '    If false: throw to monkey 3',
    '',
  'Monkey 1:',
  '  Starting items: 54, 65, 75, 74',
  '  Operation: new = old + 6',
  '  Test: divisible by 19',
  '    If true: throw to monkey 2',
  '    If false: throw to monkey 0',
    '',
  'Monkey 2:',
  '  Starting items: 79, 60, 97',
  '  Operation: new = old * old',
  '  Test: divisible by 13',
  '    If true: throw to monkey 1',
  '    If false: throw to monkey 3',
    '',
  'Monkey 3:',
  '  Starting items: 74',
  '  Operation: new = old + 3',
  '  Test: divisible by 17',
  '    If true: throw to monkey 0',
  '    If false: throw to monkey 1',
    '',
  ]

  describe("Day 11 utils tests", () => {

    const MONKEY_INPUT = [
      'Monkey 0:',
      '  Starting items: 79, 98',
      '  Operation: new = old * 19',
      '  Test: divisible by 23',
      '    If true: throw to monkey 2',
      '    If false: throw to monkey 3',
    ];

    const MONKEY_INPUT_2 = [
      'Monkey 0:',
      '  Starting items: 79, 60, 97',
      '  Operation: new = old * old',
      '  Test: divisible by 13',
      '    If true: throw to monkey 1',
      '    If false: throw to monkey 0',
    ];

    const parsedMonkey = parseMonkey(MONKEY_INPUT)
    const parsedMonkey2 = parseMonkey(MONKEY_INPUT_2)

    test("Should parse test monkey correctly: starting items", () => {
      expect(parsedMonkey.items).toStrictEqual([79, 98]);
    });

    test("Should parse test monkey correctly: operation", () => {
      expect(parsedMonkey.operation(10)).toStrictEqual(190);
    });

    test("Should parse test monkey correctly: test", () => {
      expect(parsedMonkey.test).toStrictEqual(23);
    });

    test("Should parse test monkey correctly: true monkey index", () => {
      expect(parsedMonkey.trueMonkeyIndex).toStrictEqual(2);
    });

    test("Should parse test monkey correctly: false monkey index", () => {
      expect(parsedMonkey.falseMonkeyIndex).toStrictEqual(3);
    });

    test("Parsed monkey should correctly inspect items", () => {
      expect(inspectItemBasic(parsedMonkey)).toStrictEqual([500, 3]);
      expect(inspectItemBasic(parsedMonkey)).toStrictEqual([620, 3]);
    });

    test("Should parse test monkey 2 correctly: starting items", () => {
      expect(parsedMonkey2.items).toStrictEqual([79, 60, 97]);
    });

    test("Should parse test monkey 2 correctly: operation", () => {
      expect(parsedMonkey2.operation(10)).toStrictEqual(100);
    });

    test("Should parse test monkey 2 correctly: test", () => {
      expect(parsedMonkey2.test).toStrictEqual(13);
    });

    test("Should parse test monkey 2 correctly: true monkey index", () => {
      expect(parsedMonkey2.trueMonkeyIndex).toStrictEqual(1);
    });

    test("Should parse test monkey 2 correctly: false monkey index", () => {
      expect(parsedMonkey2.falseMonkeyIndex).toStrictEqual(0);
    });

    test("Parsed monkey 2 should correctly inspect items", () => {
      expect(inspectItemBasic(parsedMonkey2)).toStrictEqual([2080, 1]);
      expect(inspectItemBasic(parsedMonkey2)).toStrictEqual([1200, 0]);
      expect(inspectItemBasic(parsedMonkey2)).toStrictEqual([3136, 0]);
    });

  });

  describe("Day 11 basic tests", () => {

    test("test input should return correct answer", () => {
      return basic_11(TEST_INPUT, 4,20, false).then(data => {
        expect(data).toStrictEqual(10605);
      });
    });

  });

  describe("Day 11 advanced tests", () => {
    test("test input should return correct answer", () => {
      return advanced_11(TEST_INPUT, 4,10000, false).then(data => {
        expect(data).toStrictEqual(2713310158);
      });
    });
  });
})
