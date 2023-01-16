import { advanced16 } from '../16/advanced'
import { basic16 } from '../16/basic'

describe('Day 16 tests', () => {
  const TEST_INPUT: string[] = [
    'Valve AA has flow rate=0; tunnels lead to valves DD, II, BB',
    'Valve BB has flow rate=13; tunnels lead to valves CC, AA',
    'Valve CC has flow rate=2; tunnels lead to valves DD, BB',
    'Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE',
    'Valve EE has flow rate=3; tunnels lead to valves FF, DD',
    'Valve FF has flow rate=0; tunnels lead to valves EE, GG',
    'Valve GG has flow rate=0; tunnels lead to valves FF, HH',
    'Valve HH has flow rate=22; tunnel leads to valve GG',
    'Valve II has flow rate=0; tunnels lead to valves AA, JJ',
    'Valve JJ has flow rate=21; tunnel leads to valve II'
  ];

  describe('Day 16 utils tests', () => {

  });

  describe('Day 16 basic tests', () => {
    test('test input should return correct answer', async () => {
      return await basic16(TEST_INPUT, false).then(data => {
        expect(data).toStrictEqual(364);
      });
    });
  });

  describe('Day 16 advanced tests', () => {
    test('test input should return correct answer', async () => {
      return await advanced16(TEST_INPUT, false).then(data => {
        expect(data).toStrictEqual(56000011);
      });
    });
  });
});
