import { readFile } from '../utils/file-utils'
import { FileSeparator } from '../utils/fileSeparator'
import { logResponse } from '../utils/log-utils'

const TASK_DATA = ['04', 'Advanced']
const TASK_LABEL = TASK_DATA.join(' ')

export const advanced_04 = async (logIt: boolean) => {
  const input = readFile(TASK_DATA[0], FileSeparator.LINE);

  const result = input
    .map(line => line.split(",")
      .map(section => section.split("-")))
    .filter( sect => {
      const firstElf = sect[0];
      const secondElf = sect[1];

      const firstSectionStart = +firstElf[0];
      const secondSectionStart = +secondElf[0];

      const firstGroupLength = +firstElf[1] - firstSectionStart;
      const secondGroupLength = +secondElf[1] - secondSectionStart;

      return firstSectionStart > secondSectionStart ? firstSectionStart - secondSectionStart <= secondGroupLength
        : secondSectionStart - firstSectionStart <= firstGroupLength;
    }).length;

  logIt && logResponse(TASK_LABEL, result)

  return result;
}

advanced_04(true);
