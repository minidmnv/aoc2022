import { readFile } from '../utils/file-utils'
import { FileSeparator } from '../utils/fileSeparator'
import { logResponse } from '../utils/log-utils'

const TASK_DATA = ['04', 'Basic']
const TASK_LABEL = TASK_DATA.join(' ')

export const basic_04 = async (logIt: boolean) => {
  const input = readFile(TASK_DATA[0], FileSeparator.LINE, true);

  const result = input
    .map(line => line.split(",")
      .map(section => section.split("-")))
    .filter( sect => {
      const firstElf = sect[0];
      const secondElf = sect[1];
      return +firstElf[0] > +secondElf[0] ? +firstElf[1] <= +secondElf[1] : +firstElf[0] === +secondElf[0] ? +firstElf[0] <= +secondElf[0] : +firstElf[1] >= +secondElf[1];
    }).length;

  logIt && logResponse(TASK_LABEL, result)

  return result;
}

basic_04(true);
