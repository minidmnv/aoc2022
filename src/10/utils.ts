export const parseInstruction = (line: string): string[] => {
  const [instruction, value] = line.split(" ");

  return [instruction, value];
}
