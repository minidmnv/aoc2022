import {readFile} from "../utils/file-utils";
import {FileSeparator} from "../utils/fileSeparator";
import {logResponse} from "../utils/log-utils";

export const basic_01 = async (logIt: boolean) => {
  const input = readFile('01', FileSeparator.LINE);
  const caloriesList = input.map(val => {
    return +val;
  })
  const result: number[] = [];
  caloriesList.reduce((acc, snackCalories) => {
    if(snackCalories > 0) {
      // console.log("To ", acc, " adding ", snackCalories);
      return acc + snackCalories;
    } else {
      result.push(acc);
      return 0;
    }
  }, 0);

  const sortedResult = result.sort((a, b) => b - a);

  logIt && logResponse("01 Basic", sortedResult[0]);

  return sortedResult;
};

basic_01(true);
