import {logResponse} from '../utils'
import {comparePackets, parsePacketsIndividually} from "./utils";

const TASK_DATA = ['13', 'Advanced']
const TASK_LABEL = TASK_DATA.join(' ')

const DIVIDER_PACKETS = [[[[2]]], [[[6]]]];
const DIVIDER_PACKETS_STR = [JSON.stringify([[[2]]]), JSON.stringify([[[6]]])];

export const advanced_13 = async (inputContent: string[], logIt: boolean) => {

  const packets: any[] = parsePacketsIndividually(inputContent);
  packets.push(...DIVIDER_PACKETS);

  const response = findDecoderKey(packets);
  logIt && logResponse(TASK_LABEL, response);

  return response;
}

const findDecoderKey = (packets: any[]) => {
  return  packets.sort((packetA, packetB) => {
    const result = comparePackets({
      left: packetA,
      right: packetB
    })

    return result !== undefined ? result ? -1 : 1 : 0
  }).map(packet => DIVIDER_PACKETS_STR.some(divider => divider === JSON.stringify(packet)))
  .reduce((acc, isDivider, index) => acc * (isDivider ? index + 1 : 1), 1);
}
