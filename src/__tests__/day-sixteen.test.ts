import { advanced16 } from '../16/advanced'
import { basic16 } from '../16/basic'
import {Graph, Node} from "../utils";
import {valveFromLine} from "../16/types";

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
    it('should dfs of graph return road to all nodes', () => {
      const fNode = new Node<string>('F');
      const eNode = new Node<string>('E');
      const cNode = new Node<string>('C', []);
      const dNode = new Node<string>('D', [cNode, eNode]);
      const bNode = new Node<string>('B', [eNode, dNode]);
      cNode.addAdjacent(bNode);
      const aNode = new Node<string>('A', [fNode, eNode, bNode]);
      const graph = new Graph(new Map<string, Node<string>>([
          [fNode.data, fNode],
          [eNode.data, eNode],
          [cNode.data, cNode],
          [dNode.data, dNode],
          [bNode.data, bNode],
          [aNode.data, aNode],
      ]));

      expect(graph.dfs('A')).toStrictEqual(['A', 'B', 'D', 'E', 'C', 'F']);
    });

    test('should create valve() for given input with 0 rate and multiple edges', () => {
      expect(valveFromLine('Valve AA has flow rate=0; tunnels lead to valves DD, II, BB')).toStrictEqual({
        name: 'AA',
        rate: 0,
        valves: ['DD', 'II', 'BB']
      })
    });

    test('should create valve() for given input with 22 rate and single edge', () => {
      expect(valveFromLine('Valve HH has flow rate=22; tunnel leads to valve GG')).toStrictEqual({
        name: 'HH',
        rate: 22,
        valves: ['GG']
      })
    });

    test('should create valve() for given input with 2 rate and multiple edges', () => {
      expect(valveFromLine('Valve CC has flow rate=2; tunnels lead to valves DD, BB')).toStrictEqual({
        name: 'CC',
        rate: 2,
        valves: ['DD', 'BB']
      })
    });

    test('should create valve() for given input with 20 rate and multiple edges', () => {
      expect(valveFromLine('Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE')).toStrictEqual({
        name: 'DD',
        rate: 20,
        valves: ['CC', 'AA', 'EE']
      })
    });
  });

  describe('Day 16 basic tests', () => {
    test('test input should return correct answer', async () => {
      return await basic16(TEST_INPUT, false).then(data => {
        expect(data).toStrictEqual(1651);
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
