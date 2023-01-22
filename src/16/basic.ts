import { Graph, logResponse, Node } from '../utils';
import { State, Valve, valveFromLine } from './types'
import { Queue } from '../utils/queue/queue'

const TASK_DATA = ['16', 'Basic'];
const TASK_LABEL = TASK_DATA.join(' ');

export const basic16 = async (inputContent: string[], remainingTime: number, logIt: boolean): Promise<any> => {
  const valves = inputContent.map(line => valveFromLine(line))
    .reduce((map, valve) => {
      return map.set(valve.name, valve);
    }, new Map<string, Valve>());
  const flowingValves = [...valves.entries()].filter(valve => valve[1].flow > 0);

  const startingValve = valves.get('AA');
  const nodes = new Array(...valves.keys()).reduce((map, valve) => {
    return map.set(valve, new Node<string>(valve));
  }, new Map<string, Node<string>>());

  const graph = new Graph<string>(nodes);
  const distances = new Array(...nodes.keys()).reduce((map, valve) => {
    return map.set(valve, graph.dijkstra(valve));
  }, new Map<string, Map<string, number>>());

  let maxRelieved: number = 0;
  const queue = new Queue<State>();

  while (queue.length() > 0) {
    //TODO: if all flowing valves are opened, wait until the end
    //TODO: for every unopened valve, run simulation
      //TODO: how long would moving to dest take? +1 to open the valve
      //TODO: if opening the dest valve would exceed the time limit, wait until the end
      //TODO: relieve pressure of opened valves while we move to dest and open it
      //TODO: add opened valve to opened valves


  }

  const response = maxRelieved;
  logIt && logResponse(TASK_LABEL, response);

  return response;
};
