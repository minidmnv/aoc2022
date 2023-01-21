export interface Valve {
  name: string
  flow: number
  valves: string[]
};

export const valveFromLine = (inputLine: string): Valve => {
  const matchedRate = inputLine.match(/=(\d+);/);
  let flow = 0;
  if (matchedRate) {
    flow = +matchedRate[1];
  }

  const valvesString = 'valves ';
  const valvesTextIndex = inputLine.indexOf(valvesString);
  const valves = valvesTextIndex > 0
    ? inputLine.slice(valvesTextIndex + valvesString.length).split(', ')
    : [inputLine.slice(-2)];

  return {
    name: inputLine.slice(6, 8),
    flow,
    valves
  };
};
