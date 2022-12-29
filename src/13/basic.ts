import {logResponse} from '../utils'
import {PacketPair} from "./types";
import {comparePackets, parseSignalPacketsInput} from "./utils";

const TASK_DATA = ['13', 'Basic']
const TASK_LABEL = TASK_DATA.join(' ')

export const basic_13 = async (inputContent: string[], logIt: boolean) => {

  const packets: PacketPair[] = parseSignalPacketsInput(inputContent);

  const response = countMatchingPacketPairs(packets);
  logIt && logResponse(TASK_LABEL, response);

  return response;
}

const countMatchingPacketPairs = (packets: PacketPair[]): number => {
  return packets.reduce((acc, packetPair, index) =>
      acc + (comparePackets(packetPair) ? index + 1 : 0), 0);
}
