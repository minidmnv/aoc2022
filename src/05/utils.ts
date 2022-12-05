const STACK_GAP: number = 4;

export const parseInitialState = (header: string[]): string[][] => {
  const stacks: string[][] = [];
  for(let i = 0; i < header[header.length - 1].length / STACK_GAP; i++) {
    stacks.push([]);
  }

  header.reverse().forEach(headerLine => {
    const row = headerLine.split("");
    let curIndex = 0;
    do {
      const indexOfNextSupply = row.indexOf("[", curIndex);
      const supply = row[indexOfNextSupply + 1];

      if(indexOfNextSupply >= 0) {
        stacks[indexOfNextSupply / STACK_GAP].push(supply);
      }

      curIndex = indexOfNextSupply + 1;
    } while (curIndex > 0);

  });

  return stacks;
}

export const parseInstruction = (instruction: string): number[] => {
  const splitted = instruction.split(" ");

  return [+splitted[1], +splitted[3] - 1, +splitted[5] - 1];
}
