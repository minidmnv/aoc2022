import {FileSeparator, readFile} from "../utils";
import {basic_14} from "./basic";
import {advanced_14} from "./advanced";

const input = readFile('14', FileSeparator.LINE, true);
basic_14(input, true).then(r => r);
advanced_14(input, true).then(r => r);
