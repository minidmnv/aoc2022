import {basic_13} from "../13/basic";
import {advanced_13} from "../13/advanced";
import {comparePackets, parseSignalPacketsInput} from "../13/utils";
import {FileSeparator, readFile} from "../utils";

describe("Day 13 tests", () => {

  const TEST_INPUT = [
    '[1,1,3,1,1]',
    '[1,1,5,1,1]',
    '[[1],[2,3,4]]',
    '[[1],4]',
    '[9]',
    '[[8,7,6]]',
    '[[4,4],4,4]',
    '[[4,4],4,4,4]',
    '[7,7,7,7]',
    '[7,7,7]',
    '[]',
    '[3]',
    '[[[]]]',
    '[[]]',
    '[1,[2,[3,[4,[5,6,7]]]],8,9]',
    '[1,[2,[3,[4,[5,6,0]]]],8,9]',
  ]

  describe("Day 13 utils tests", () => {

    const testPacketPairs = parseSignalPacketsInput(TEST_INPUT);

    test('test packet pairs should parse numbers correctly', () => {
      const packets = testPacketPairs[0];

      expect(Array.isArray(packets.left) && packets.left[0].length).toBe(5);
      expect(Array.isArray(packets.right) && packets.right[0].length).toBe(5);
    })

    test('test packet pairs should parse numbers correctly - values', () => {
      const packets = testPacketPairs[0];

      expect(Array.isArray(packets.left) && packets.left[0][2]).toBe(3);
      expect(Array.isArray(packets.right) && packets.right[0][2]).toBe(5);
    })

    test('test packet pairs should parse inner array correctly', () => {
      const packets = testPacketPairs[1];
      const innerArray = Array.isArray(packets.left) && packets.left[0];

      expect(innerArray[1].length).toBe(3);
      expect(innerArray[1][1]).toBe(3);
    })

    test('test packet pairs should parse empty array correctly', () => {
      const packets = testPacketPairs[5];
      const innerArray = Array.isArray(packets.left) && packets.left[0];

      expect(innerArray.length).toBe(0);
    })

    test('test packet pairs should parse multiple nested array correctly', () => {
      const packets = testPacketPairs[6];
      const innerArray = Array.isArray(packets.left) && packets.left[0];

      expect(innerArray[0][0].length).toBe(0);
    })

    test('test packet pairs should parse all packet pairs', () => {
      expect(testPacketPairs.length).toBe(8);
    })

    test('packets should not match because of right side run out of items ', () => {
      const packets = parseSignalPacketsInput(['[[5],[1,[[0]]],[],[3,[[9,1],[3,4,10],8,3],6]]', '[[],[[6,8],4]]',])
      expect(comparePackets(packets[0])).toBe(false);
    })

    test('packets should match because of left side run out of items on first array ', () => {
      const packets = parseSignalPacketsInput(['[[[],[[],5],[[10,9,5],[8,2,5],8,1,4],3],[[[7,8,9,0],3,[5],[4,9]],[[3],9,[4,0],[0,9,0]],[1,10,9],[1,[7,8],9],4]]',
          '[[7,[9,[3,1],[10,6,2,3,1]]],[[2,10],6],[[[3,9,10],[6,9]],6,5,[8,[0,3],0,7,1],[]]]',])
      expect(comparePackets(packets[0])).toBe(true);
    })

    test('packets should not match because of right has only one item ', () => {
      const packets = parseSignalPacketsInput(['[[7,6],[],[[2,[1,1,9,1,1],[5]]]]', '[[7]]',])
      expect(comparePackets(packets[0])).toBe(false);
    })

    test('packets should not match because of right first element is an empty array ', () => {
      const packets = parseSignalPacketsInput(['[[7,0,[]]]', '[[],[],[2,8],[2,0,2,6,8]]',])
      expect(comparePackets(packets[0])).toBe(false);
    })

    test('test packets should match because of left side has one four less', () => {
      const packets = parseSignalPacketsInput(['[[4,4],4,4]', '[[4,4],4,4,4]',])
      expect(comparePackets(packets[0])).toBe(true);
    })

    test(' packets should not match because right first item is an empty array', () => {
      const packets = parseSignalPacketsInput(['[[7,0,[]]]', '[[],[],[2,8],[2,0,2,6,8]]',])
      expect(comparePackets(packets[0])).toBe(false);
    })

    test('packets should not match because left item is bigger then the right one 8 - 1', () => {
      const packets = parseSignalPacketsInput(['[[8,2,[[0,5],5,10]]]', '[[1,[],[7,7,4,2,[4]],8],[[],5,4,[[2,6,2],[8],0],[]],[5,8,8,9],[[[8,8,3,5],[7,10],2,[0,1,6],8],[0,[],3,[8,7,10,2]],[8,8,[4,1],2,[8,4,9]]]]',])
      expect(comparePackets(packets[0])).toBe(false);
    })

    test('packets should not match because left first array is bigger then the right one', () => {
      const packets = parseSignalPacketsInput(['[[[5,[10,10],[9,6],[],9],1]]', '[[],[7,[]],[],[9]]',])
      expect(comparePackets(packets[0])).toBe(false);
    })

    test('packets should not match because left side value is bigger, even if it has less elements', () => {
      const packets = parseSignalPacketsInput(['[[4],[5]]', '[[[[3,8,10],10],9,[7,[0,0,9,5,1],4],[]],[1,[1,5,0,[10,5,9,0],0],8,1,[[7],1,4]]]',])
      expect(comparePackets(packets[0])).toBe(false);
    })

    test('packets should not match because right side has empty array very quickly', () => {
      const packets = parseSignalPacketsInput(['[[[[0,9,3,7,1],2],[[10,2,2,4,6],5],10,0,5],[4,[]],[[[],2],[],[[6,6],8,4,[10,8]],[[5,1,2,4],4,[9],7]],[[[9],7,2,[6,0,9,8],[4,1]],5,[],[5,8,[5,2,7,6,5]],[[2]]]]',
          '[[],[2,[7,0,[0],[0,1,2,1,6]],2,6]]',])
      expect(comparePackets(packets[0])).toBe(false);
    })

    test('packets should be in the right order, since in the end we are comparing 7 on the right side and 0 on the left side', () => {
      const packets = parseSignalPacketsInput(['[[[[0,7,7,1,8],[2,1,9]],0,2,6,3],[5,[2,[10],6]]]', '[[7,[],[[1],[4,6]],7,[9,[1],9]]]',])
      expect(comparePackets(packets[0])).toBe(true);
    })

    test('packets should be in the right order, since in the end we are comparing 3 on the right side and 2 on the left side', () => {
      const packets = parseSignalPacketsInput(['[[[2,[],[8,10,7],[0,1]],7,[8],[[8,3,3]]]]', '[[3],[6,[[3,6],3,[4,4,6,2]],4,7,[]],[[10,4,5,[2,8,4,5],4],[1],[[4,5,2,0,6]],[[],8,5],[6,[4,9,10],1,4]],[[7],[3,[9,10,2,1],5,3],10]]',])
      expect(comparePackets(packets[0])).toBe(true);
    })

    test('packets should be in the right order, because on the second item left side run out of items', () => {
      const packets = parseSignalPacketsInput(['[[],[],[6,4,8],[0,[]],[[7,[]],5]]', '[[],[[4,2],0,[2]],[[[3,9],[1,0,1],6],7,[[2,4,9,5],9,[4,8,6],10,[2,2,8,4]]],[0,4]]',])
      expect(comparePackets(packets[0])).toBe(true);
    })

    test('packets should be false since right side run out of items on first comparison to 0', () => {
      const packets = parseSignalPacketsInput(['[[0,0]]', '[[[],[[4,9,2,6],[],[10,1,7,0,1]],7],[3],[],[[[],[3,2],[4,8]]]]',])
      expect(comparePackets(packets[0])).toBe(false);
    })

    test('empty lists should not break and packets should be false since 4 is bigger than 3', () => {
      const packets = parseSignalPacketsInput(['[[],4]', '[[],3]',]);
      expect(comparePackets(packets[0])).toBe(false);
    })

    test('empty lists should not break and packets should be true since 3 is lesser than 4', () => {
      const packets = parseSignalPacketsInput(['[[],3]', '[[],4]',]);
      expect(comparePackets(packets[0])).toBe(true);
    })

    test('empty lists should not break on multiple empty lists and packets should be true since 1 is lesser than 5', () => {
      const packets = parseSignalPacketsInput(['[[],[],[[]], 1]', '[[],[],[[]], 5]',]);
      expect(comparePackets(packets[0])).toBe(true);
    })

    test('empty lists should not break on multiple empty lists and packets should be false since 5 is bigger than 2', () => {
      const packets = parseSignalPacketsInput(['[[],[],[[]], 5]', '[[],[],[[]], 2]',]);
      expect(comparePackets(packets[0])).toBe(false);
    })

    test('zero values should be handled properly against empty lists 0 on left side, empty list on right should be false', () => {
      const packets = parseSignalPacketsInput(['[[0,0]]', '[[[],[[4,9,2,6],[],[10,1,7,0,1]],7],[3],[],[[[],[3,2],[4,8]]]]',])
      expect(comparePackets(packets[0])).toBe(false);
    })

    test('zero values should be handled properly against empty lists 0 is bigger than empty list', () => {
      const packets = parseSignalPacketsInput(['[[0,0]]', '[[[],[]]]',]);
      expect(comparePackets(packets[0])).toBe(false);
    })

    test('zero values should be handled properly against empty lists empty list on left side, 0 on right should give true', () => {
      const packets = parseSignalPacketsInput(['[[[],[]]]', '[[0,0]]',]);
      expect(comparePackets(packets[0])).toBe(true);
    })

    test('two digit values should be handled properly 10 is bigger than 6 on right side, so false should be returned', () => {
      const packets = parseSignalPacketsInput(['[10]', '[6]',]);
      expect(comparePackets(packets[0])).toBe(false);
    })

    test('two digit values should be handled properly 6 is lesser than 6 on right side, so true should be returned', () => {
      const packets = parseSignalPacketsInput(['[6]', '[10]',]);
      expect(comparePackets(packets[0])).toBe(true);
    })

    test('0 is lesser than 3, both are the first values to compare, so true should be returned', () => {
      const packets = parseSignalPacketsInput(['[[0,10],[[[2]],5,3]]', '[[[3,3,[10],[2,4,4,6],[6]],3],[[8,[4]]],[4,[5,[7,4,5,4,1],5],[[],[3,9,5],8],[],[10,[4,10,1],4]],[[8,5],4],[2,[3]]]',]);
      expect(comparePackets(packets[0])).toBe(true);
    })

    test('empty list before value 6 should give true result', () => {
      const packets = parseSignalPacketsInput(['[[[],6]]', '[[[[6,7],9,[8,7,9],5],10,3],[[6,[9],9,6]],[],[],[10,[1],[[9,1,10,0]]]]',]);
      expect(comparePackets(packets[0])).toBe(true);
    })

    test('equal values should not terminate comparison, should give false when there is no right value left', () => {
      const packets = parseSignalPacketsInput(['[0,3,7,3,4]', '[0,3,7,3]',]);
      expect(comparePackets(packets[0])).toBe(false);
    })

    test('equal values should not terminate comparison, should give true when there is no left value left', () => {
      const packets = parseSignalPacketsInput(['[0,3,7,3]', '[0,3,7,3,4]',]);
      expect(comparePackets(packets[0])).toBe(true);
    })

    test('equal values should not terminate comparison, should give null when all values are the same', () => {
      const packets = parseSignalPacketsInput(['[0,3,7,3,4]', '[0,3,7,3,4]',]);
      expect(comparePackets(packets[0])).toBe(undefined);
    })

    test('smaller values on left, longer list on right so return true', () => {
      const packets = parseSignalPacketsInput(['[[[[3,5,5,0],3,8,9]]]','[[[9,[10,4,9]]]]',]);
      expect(comparePackets(packets[0])).toBe(true);
    })

    test('smaller values on left, right value run out of values on first item', () => {
      const packets = parseSignalPacketsInput(['[[[[3,5,5,0],3,8,9]]]','[[[3,[10,4,9]]]]',]);
      expect(comparePackets(packets[0])).toBe(false);
    })

    test('if left value will match array on right side it should be converted to array and compared to true', () => {
      const packets = parseSignalPacketsInput(['[3]','[[4,1,1]]',]);
      expect(comparePackets(packets[0])).toBe(true);
    })

    test('if left value will match array on right side it should be converted to array and compared to false', () => {
      const packets = parseSignalPacketsInput(['[6]','[[4,1,1]]',]);
      expect(comparePackets(packets[0])).toBe(false);
    })

    test('if left value will match array on right side it should be converted to array and compared to true because of lack of items', () => {
      const packets = parseSignalPacketsInput(['[6,[10,9,10]]','[[6,1,1],[1,1,1]]',]);
      expect(comparePackets(packets[0])).toBe(true);
    })

    test('if right value will match array on left side it should be converted to array and compared to false', () => {
      const packets = parseSignalPacketsInput(['[[4,1,1]]','[2,[3,3,5]]',]);
      expect(comparePackets(packets[0])).toBe(false);
    })

    test('if right value will match array on left side it should be converted to array and compared to true', () => {
      const packets = parseSignalPacketsInput(['[[4,1,1]]','[5,[3,3,5]]',]);
      expect(comparePackets(packets[0])).toBe(true);
    })

    test('if right value will match array on left side it should be converted to array and compared to false because of lack of items', () => {
      const packets = parseSignalPacketsInput(['[[4,1,1]]','[4,[3,3,5]]',]);
      expect(comparePackets(packets[0])).toBe(false);
    })

    test('simple input should be parsed and matched correctly', () => {
      const testPackets = parseSignalPacketsInput(['[5,6,0,4]', '[5,6,0,4,2]']);
      expect(testPackets).toStrictEqual([{
        left: [[5,6,0,4]],
        right: [[5,6,0,4,2]]
      }]);
      expect(comparePackets(testPackets[0])).toBe(true);
    })

    const BASIC_INPUT_PACKETS = parseSignalPacketsInput(readFile('13', FileSeparator.LINE, true));

    test('130 line should be parsed and matched correctly', () => {
      const testPackets = BASIC_INPUT_PACKETS[129];
      expect(testPackets).toStrictEqual({
        left: [[[3,[[0,0,6,2,4],[],8]],[[8,10,9,7,[8,3,5,6,4]],[[8,10,8,2],[4,6,5,0],1,4,[4,6,9,0,6]],[[7,6],[1,2,4],3,8,1],[6,[8,9],[]]],[1,1]]],
        right: [[[9,[[2,2,3]],4,[1,0]],[7,10,4,[[9,5,2,3],[7,3],[5,6,2,8],[8,4,10],8],0]]]
      });
      expect(comparePackets(testPackets)).toBe(true);
    })

  });

  describe("Day 13 basic tests", () => {
    test("test input should return correct answer", () => {
      return basic_13(TEST_INPUT, false).then(data => {
        expect(data).toStrictEqual(13);
      });
    });

  });

  describe("Day 13 advanced tests", () => {
    test("test input should return correct answer", () => {
      return advanced_13(TEST_INPUT, false).then(data => {
        expect(data).toStrictEqual(140);
      });
    });
  });
})
