import {logResponse} from '../utils/log-utils'
import {checkVisibility} from "./utils";

const TASK_DATA = ['08', 'Basic']
const TASK_LABEL = TASK_DATA.join(' ')

export const basic_08 = async (inputContent: string[], logIt: boolean) => {

  const griddedInput: string[][] = inputContent.map(row => row.split(""));

  let result = 0;

  griddedInput.forEach((treeRow, rowIndex) => {
    treeRow.forEach((tree, columnIndex) => {
      if(rowIndex === 0 || rowIndex === griddedInput.length - 1) {
        result += 1;
      } else if(columnIndex === 0 || columnIndex === griddedInput[0].length - 1) {
        result += 1;
      } else if(checkVisibility(griddedInput, rowIndex, columnIndex)) {
        result += 1;
      }
    })
  })

  logIt && logResponse(TASK_LABEL, result);

  return result;
}
