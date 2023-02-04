import { advanced16 } from '../16/advanced';
import { basic16 } from '../16/basic';
import { Graph, Node } from '../utils';
import { State, Valve, valveFromLine } from '../16/types';
import { createGraph, createValves, insertCheckState } from '../16/utils';
import { Queue } from '../utils/queue/queue';

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
    const testDataValves = createValves(TEST_INPUT);
    const testDataGraph = createGraph(testDataValves);

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
        [aNode.data, aNode]
      ]));

      expect(graph.dfs('A')).toStrictEqual(['A', 'B', 'D', 'E', 'C', 'F']);
    });

    test('should create valve() for given input with 0 rate and multiple edges', () => {
      expect(valveFromLine('Valve AA has flow rate=0; tunnels lead to valves DD, II, BB')).toStrictEqual({
        name: 'AA',
        flow: 0,
        valves: ['DD', 'II', 'BB']
      });
    });

    test('should create valve() for given input with 22 rate and single edge', () => {
      expect(valveFromLine('Valve HH has flow rate=22; tunnel leads to valve GG')).toStrictEqual({
        name: 'HH',
        flow: 22,
        valves: ['GG']
      });
    });

    test('should create valve() for given input with 2 rate and multiple edges', () => {
      expect(valveFromLine('Valve CC has flow rate=2; tunnels lead to valves DD, BB')).toStrictEqual({
        name: 'CC',
        flow: 2,
        valves: ['DD', 'BB']
      });
    });

    test('should create valve() for given input with 20 rate and multiple edges', () => {
      expect(valveFromLine('Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE')).toStrictEqual({
        name: 'DD',
        flow: 20,
        valves: ['CC', 'AA', 'EE']
      });
    });

    describe('Dijkstra tests', () => {
      const distances = testDataGraph.dijkstra('AA');

      it('should count dijkstra for test data between nodes AA and DD = 1', () => {
        expect(distances.get('DD')).toStrictEqual(1);
      });

      it('should count dijkstra for test data between nodes AA and EE = 2', () => {
        expect(distances.get('EE')).toStrictEqual(2);
      });

      it('should count dijkstra for test data between nodes AA and EE = 4', () => {
        expect(distances.get('GG')).toStrictEqual(4);
      });
    });

    describe('insert check state tests', () => {
      const defaultDestination: [string, Valve] = ['FF', {
        name: 'FF',
        flow: 10,
        valves: ['SS', 'GG', 'YY']
      }];
      const defaultState = {
        alreadyOpened: new Set<string>(['AA', 'CC', 'ZZ', 'KK']),
        elapsedTime: 15,
        relievedPressure: 100,
        destination: defaultDestination
      };

      it('should insert new state when queue is empty', () => {
        const queue = new Queue<State>();
        const checked = new Set<string>();

        insertCheckState({
          ...defaultState
        }, checked, queue, defaultState.destination);

        expect(queue.length()).toStrictEqual(1);
        expect(queue.dequeue()).toStrictEqual({
          currentNode: defaultDestination[0],
          alreadyOpened: new Set<string>(['AA', 'CC', 'ZZ', 'KK']),
          elapsedTime: 15,
          relievedPressure: 100
        });
      });

      it('should insert new state when queue already has different state => elapsedTime', () => {
        const queue = new Queue<State>();
        const checked = new Set<string>();

        insertCheckState({
          ...defaultState
        }, checked, queue, defaultState.destination);

        insertCheckState({
          ...defaultState,
          elapsedTime: 12
        }, checked, queue, defaultState.destination);

        expect(queue.length()).toStrictEqual(2);
        expect(queue.dequeue()).toStrictEqual({
          currentNode: defaultDestination[0],
          alreadyOpened: new Set<string>(['AA', 'CC', 'ZZ', 'KK']),
          elapsedTime: 15,
          relievedPressure: 100
        });
        expect(queue.dequeue()).toStrictEqual({
          currentNode: defaultDestination[0],
          alreadyOpened: new Set<string>(['AA', 'CC', 'ZZ', 'KK']),
          elapsedTime: 12,
          relievedPressure: 100
        });
      });

      it('should insert new state when queue already has different state => relievedPressure', () => {
        const queue = new Queue<State>();
        const checked = new Set<string>();

        insertCheckState({
          ...defaultState
        }, checked, queue, defaultState.destination);

        insertCheckState({
          ...defaultState,
          relievedPressure: 190
        }, checked, queue, defaultState.destination);

        expect(queue.length()).toStrictEqual(2);
        expect(queue.dequeue()).toStrictEqual({
          currentNode: defaultDestination[0],
          alreadyOpened: new Set<string>(['AA', 'CC', 'ZZ', 'KK']),
          elapsedTime: 15,
          relievedPressure: 100
        });
        expect(queue.dequeue()).toStrictEqual({
          currentNode: defaultDestination[0],
          alreadyOpened: new Set<string>(['AA', 'CC', 'ZZ', 'KK']),
          elapsedTime: 15,
          relievedPressure: 190
        });
      });

      it('should insert new state when queue already has different state => alreadyOpened', () => {
        const queue = new Queue<State>();
        const checked = new Set<string>();

        insertCheckState({
          ...defaultState
        }, checked, queue, defaultState.destination);

        insertCheckState({
          ...defaultState,
          alreadyOpened: new Set<string>(['AA', 'CC', 'ZZ', 'VV'])
        }, checked, queue, defaultState.destination);

        expect(queue.length()).toStrictEqual(2);
        expect(queue.dequeue()).toStrictEqual({
          currentNode: defaultDestination[0],
          alreadyOpened: new Set<string>(['AA', 'CC', 'ZZ', 'KK']),
          elapsedTime: 15,
          relievedPressure: 100
        });
        expect(queue.dequeue()).toStrictEqual({
          currentNode: defaultDestination[0],
          alreadyOpened: new Set<string>(['AA', 'CC', 'ZZ', 'VV']),
          elapsedTime: 15,
          relievedPressure: 100
        });
      });

      it('should not insert new state when queue already has exactly the same state', () => {
        const queue = new Queue<State>();
        const checked = new Set<string>();

        insertCheckState({
          ...defaultState
        }, checked, queue, defaultState.destination);

        insertCheckState({
          ...defaultState
        }, checked, queue, defaultState.destination);

        expect(queue.length()).toStrictEqual(1);
        expect(queue.dequeue()).toStrictEqual({
          currentNode: defaultDestination[0],
          alreadyOpened: new Set<string>(['AA', 'CC', 'ZZ', 'KK']),
          elapsedTime: 15,
          relievedPressure: 100
        });
        expect(queue.dequeue()).toBeUndefined();
      });

      it('should not insert new state when queue already has exactly the same state, even if destination is different', () => {
        const queue = new Queue<State>();
        const checked = new Set<string>();
        const differentDistination: [string, Valve] = ['OO', {
          name: 'OO',
          flow: 90,
          valves: ['PP', 'II', 'UU']
        }];

        insertCheckState({
          ...defaultState
        }, checked, queue, defaultState.destination);

        insertCheckState({
          ...defaultState
        }, checked, queue, differentDistination);

        expect(queue.length()).toStrictEqual(1);
        expect(queue.dequeue()).toStrictEqual({
          currentNode: defaultDestination[0],
          alreadyOpened: new Set<string>(['AA', 'CC', 'ZZ', 'KK']),
          elapsedTime: 15,
          relievedPressure: 100
        });
        expect(queue.dequeue()).toBeUndefined();
      });

      it('should not insert new state when queue already has exactly the same state, but already opened valves in different order', () => {
        const queue = new Queue<State>();
        const checked = new Set<string>();

        insertCheckState({
          ...defaultState
        }, checked, queue, defaultState.destination);

        insertCheckState({
          ...defaultState,
          alreadyOpened: new Set<string>(['CC', 'ZZ', 'AA', 'KK'])
        }, checked, queue, defaultState.destination);

        expect(queue.length()).toStrictEqual(1);
        expect(queue.dequeue()).toStrictEqual({
          currentNode: defaultDestination[0],
          alreadyOpened: new Set<string>(['AA', 'CC', 'ZZ', 'KK']),
          elapsedTime: 15,
          relievedPressure: 100
        });
        expect(queue.dequeue()).toBeUndefined();
      });
    });
  });

  describe('Day 16 basic tests', () => {
    test('test input should return correct answer', async () => {
      return await basic16(TEST_INPUT, 30, false).then(data => {
        expect(data).toStrictEqual(1651);
      });
    });
  });

  describe('Day 16 advanced tests', () => {
    test('test input should return correct answer', async () => {
      return await advanced16(TEST_INPUT, 26, false).then(data => {
        expect(data).toStrictEqual(1707);
      });
    });
  });
});
