import {FileSeparator} from "./fileSeparator";

const fs = require('fs');

const read = (dayDirectory: string): string => {
  return fs.readFileSync("./src/" + dayDirectory + "/input.txt", 'utf-8');
}

export const readFile = (dayDirectory: string, separator: FileSeparator): string[] => {
  const content = read(dayDirectory);

  switch (separator) {
    case FileSeparator.LINE:
      const result: string[] = [];
      content.split(/\r?\n/).forEach(line =>  {
        if(line.length > 0) {
          result.push(line);
        }
      });
      return result;

    case FileSeparator.COMMA:
      return [];
  }

}
