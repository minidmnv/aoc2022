import { Graph, logResponse, Node } from '../utils';
import { State, Valve, valveFromLine } from './types';
import { Queue } from '../utils/queue/queue';
import { labelsToValves, waitTillEnd } from './utils';

const TASK_DATA = ['16', 'Basic'];
const TASK_LABEL = TASK_DATA.join(' ');

export const basic16 = async (inputContent: string[], remainingTime: number, logIt: boolean): Promise<any> => {
  const valves = inputContent.map(line => valveFromLine(line))
    .reduce((map, valve) => {
      return map.set(valve.name, valve);
    }, new Map<string, Valve>());
  const flowingValves = [...valves.entries()].filter(valve => valve[1].flow > 0);

  const nodes = new Array(...valves.keys()).reduce((map, valve) => {
    return map.set(valve, new Node<string>(valve));
  }, new Map<string, Node<string>>());

  const graph = new Graph<string>(nodes);
  const distances = new Array(...nodes.keys()).reduce((map, valve) => {
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

    // if all flowing valves are opened, wait until the end
    if (alreadyOpened.size === flowingValves.length || elapsedTime >= 30) {
      const totalRelieved = waitTillEnd(30, elapsedTime, relievedPressure, labelsToValves(alreadyOpened, valves));
      maxRelieved = Math.max(maxRelieved, totalRelieved);
      continue;
    }

    // for every unopened valve, run simulation
    flowingValves.filter(flowing => ![...alreadyOpened.keys()].includes(flowing[0])).forEach(unopened => {
      // how long would moving to dest take? +1 to open the valve
      const cost = distances.get(currentNode)?.get(unopened[0]) ?? 0;
      const newElapsed = elapsedTime + cost;

      // if opening the dest valve would exceed the time limit, wait until the end
      if (newElapsed >= 30) {
        const totalRelieved = waitTillEnd(30, elapsedTime, relievedPressure, labelsToValves(alreadyOpened, valves));
        maxRelieved = Math.max(maxRelieved, totalRelieved);
      }

      // relieve pressure of opened valves while we move to dest and open it
      const newRelieved = relievedPressure + [...labelsToValves(alreadyOpened, valves).keys()].reduce((acc, valve) => acc + valve.flow, 0) * cost;

      // add opened valve to opened valves
      alreadyOpened.add(unopened[0]);

      // insert opened valve set to already checked if it wasn't there
      const checkState = JSON.stringify({
        alreadyOpened,
        elapsedTime: newElapsed,
        relievedPressure: newRelieved
      });

      if (!checked.has(checkState)) {
        checked.add(checkState);
        queue.enqueue({
          currentNode: unopened[0],
          alreadyOpened,
          elapsedTime: newElapsed,
          relievedPressure: newRelieved
        });
      }
    });
  }

  const response = maxRelieved;
  logIt && logResponse(TASK_LABEL, response);

  return response;
};
