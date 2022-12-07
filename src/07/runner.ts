import {basic_07} from "./basic";
import {readFile} from "../utils/file-utils";
import {FileSeparator} from "../utils/fileSeparator";
import {advanced_07} from "./advanced";

const input = readFile('07', FileSeparator.LINE);

basic_07(input, true).then(r => r);
advanced_07(input, true).then(r => r);
