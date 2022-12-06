import {logResponse} from '../utils/log-utils'

const TASK_DATA = ['06', 'Basic']
const TASK_LABEL = TASK_DATA.join(' ')

const BUFFER_INDEX_SHIFT: number = 1

export const day_06 = async (inputContent: string, bufferSize: number, logIt: boolean) => {

  const characters = inputContent.split("");
  let bufferIndex = bufferSize;

  while (bufferIndex < characters.length) {
    const buffer = characters.slice(bufferIndex - bufferSize, bufferIndex);
    const found = new Set(buffer).size === buffer.length ? buffer.indexOf(characters[bufferIndex]) : 0;

    //we always have to move at least by one index, also array index and response index are different by exactly one
    bufferIndex += BUFFER_INDEX_SHIFT;

    if(found >= 0) {
      bufferIndex += found;
    } else {
      logIt && logResponse(TASK_LABEL, bufferIndex);
      return bufferIndex;
    }
  }

  return 'fail';
}
