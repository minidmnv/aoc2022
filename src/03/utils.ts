const PRIORITY_CAPITAL_BOUNDARY = 90
const PRIORITY_SMALL_LETTER_OFFSET = 96
const PRIORITY_CAPITAL_LETTER_OFFSET = 38

export const splitInHalf = (input: string): string[] => {
  return [input.slice(0, input.length / 2), input.slice(input.length / 2)];
}

export const countItemPriority = (item: string) => {
  const charCode = item!.charCodeAt(0);
  return countCharCodePriority(charCode);
}

export const countCharCodePriority = (charCode: number) => {
  const priority = charCode > PRIORITY_CAPITAL_BOUNDARY ? charCode - PRIORITY_SMALL_LETTER_OFFSET : charCode - PRIORITY_CAPITAL_LETTER_OFFSET;

  return priority;
}
