import { logResponse } from '../utils';
import { State } from './types';
import { Queue } from '../utils/queue/queue';
import { createGraph, createValves, insertCheckState, labelsToValves, waitTillEnd } from './utils';

const TASK_DATA = ['16', 'Basic'];
const TASK_LABEL = TASK_DATA.join(' ');

export const basic16 = async (inputContent: string[], remainingTime: number, logIt: boolean): Promise<any> => {
  const valves = createValves(inputContent);

  const flowingValves = [...valves.entries()].filter(valve => valve[1].flow > 0);
  const graph = createGraph(valves);
  const distances = new Array(...valves.keys()).reduce((map, valve) => {
    return map.set(valve, graph.dijkstra(valve));
  }, new Map<string, Map<string, number>>());

  let maxRelieved: number = 0;
  const queue = new Queue<State>();
  queue.enqueue({
    currentNode: 'AA',
    alreadyOpened: new Set<string>(),
    elapsedTime: 0,
    relievedPressure: 0
  });
  const checked = new Set<string>();

  while (queue.length() > 0) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { currentNode, alreadyOpened, elapsedTime, relievedPressure } = queue.dequeue()!;

    if (alreadyOpened.size === flowingValves.length || elapsedTime >= 30) {
      const totalRelieved = waitTillEnd(30, elapsedTime, relievedPressure, labelsToValves(alreadyOpened, valves));
      maxRelieved = Math.max(maxRelieved, totalRelieved);
      continue;
    }

    const unopened = flowingValves.filter(flowing => ![...alreadyOpened.keys()].includes(flowing[0]));
    for (let i = 0; i < unopened.length; i++) {
      const destination = unopened[i];

      const cost = (distances.get(currentNode)?.get(destination[0]) ?? 0) + 1;
      const newElapsed = elapsedTime + cost;

      if (newElapsed >= 30) {
        const totalRelieved = waitTillEnd(30, elapsedTime, relievedPressure, labelsToValves(alreadyOpened, valves));
        maxRelieved = Math.max(maxRelieved, totalRelieved);

        continue;
      }

      const newRelieved = relievedPressure + [...labelsToValves(alreadyOpened, valves).keys()]
        .reduce((acc, valve) => acc + valve.flow, 0) * cost;

      const newOpened = new Set<string>(alreadyOpened).add(destination[0]);

      insertCheckState({
        alreadyOpened: newOpened,
        elapsedTime: newElapsed,
        relievedPressure: newRelieved
      }, checked, queue, destination);
    }
  }

  const response = maxRelieved;
  logIt && logResponse(TASK_LABEL, response);

  return response;
};
