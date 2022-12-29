import {PacketPair} from "./types";

export const parsePacketsIndividually = (inputContent: string[]) => {
  const result: any[] = [];

  for(let i = 0; i < inputContent.length; i++) {
    if(inputContent[i].length > 0) result.push(parseSignal(inputContent[i])[0])
  }

  return result;
}

export const parseSignalPacketsInput = (input: string[]): PacketPair[] => {
  const result: PacketPair[] = [];

  for(let i = 0; i < input.length - 1; i += 2) {
    result.push({
      left: parseSignal(input[i])[0],
      right: parseSignal(input[i+1])[0],
    });
  }

  return result;
}

const parseSignal = (input: string): any[] => {
  const result: any[] = [[]];

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (char === '[') {
      const [signal, index] = parseSignal(input.slice(i + 1));
      result[0].push(signal);
      i += index;
    } else if (char === ']') {
      result.push(i + 1);
      break;
    } else if (!isNaN(+char)) {
      if(!isNaN(+input[i + 1])) {
        result[0].push(+(char + input[i + 1]));
        i++;
      } else {
        result[0].push(+char);
      }
    }
  }

  return result;
}

export const comparePackets = (packetPair: PacketPair): boolean | undefined => {

  const {left, right} = packetPair;

  if(typeof left === 'number' && typeof right === 'number') {
    return left < right ? true : right < left ? false : undefined;
  }

  if(Array.isArray(left) && Array.isArray(right)) {
    for(let i = 0; i < Math.max(left.length, right.length); i++ ) {
      if(i >= right.length) return false;
      if(i >= left.length) return true;

      const innerResult = comparePackets({
        left: left[i],
        right: right[i],
      });

      if(innerResult !== undefined) return innerResult;
    }
  } else {
    if(Array.isArray(left) && !Array.isArray(right)) {
      const innerResult = comparePackets({
        left: left,
        right: [right],
      });

      if(innerResult !== undefined) return innerResult;
    } else if (!Array.isArray(left) && Array.isArray(right)) {
      const innerResult = comparePackets({
        left: [left],
        right: right,
      });

      if(innerResult !== undefined) return innerResult;
    }
  }
}
