import {day_06} from "./index";
import {readFileContent} from "../utils/file-utils";

const input = readFileContent('06');

day_06(input, 3, true).then(r => r);
day_06(input, 13, true).then(r => r);
