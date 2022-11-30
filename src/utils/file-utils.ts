import {FileSeparator} from "./fileSeparator";

const fs = require('fs');

const read = (dayDirectory: string): string => {
  return fs.readFileSync(dayDirectory || "/input.txt", 'utf-8');
}

export const readFile = (dayDirectory: string, separator: FileSeparator): string[] => {
  const content = read(dayDirectory);

  switch (separator) {
    case FileSeparator.LINE:
      const result: string[] = [];
      content.split(/\r?\n/).forEach(line =>  {
        result.push(line);
      });
      return result;

    case FileSeparator.COMMA:
      return [];
  }

}
