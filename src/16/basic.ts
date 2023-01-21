import { Graph, logResponse, Node } from '../utils';
import { Valve, valveFromLine } from './types';

const TASK_DATA = ['15', 'Basic'];
const TASK_LABEL = TASK_DATA.join(' ');

export const basic16 = async (inputContent: string[], remainingTime: number, logIt: boolean): Promise<any> => {
  const valves = inputContent.map(line => valveFromLine(line));
  const startingValve = valves.find(valve => valve.name === 'AA');
  const nodes = new Map<Valve, Node<Valve>>();
  const distances = new Map<Valve, >

  valves.forEach(valve => nodes.set(valve, new Node<Valve>(valve)));

  new Graph().dfs(startingValve, (time: number) => time > 0);

  const response = 'fail';
  logIt && logResponse(TASK_LABEL, response);

  return response;
};
