import {FileSeparator, readFile} from "../utils";
import {basic_13} from "./basic";
import {advanced_13} from "./advanced";

const input = readFile('13', FileSeparator.LINE, true);
basic_13(input, true).then(r => r);
advanced_13(input, true).then(r => r);
