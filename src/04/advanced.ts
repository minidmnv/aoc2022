import {logResponse} from '../utils/log-utils'

const TASK_DATA = ['04', 'Advanced']
const TASK_LABEL = TASK_DATA.join(' ')

export const advanced_04 = async (input: string[], logIt: boolean) => {
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
