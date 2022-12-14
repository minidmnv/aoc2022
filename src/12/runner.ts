import {readFile} from "../utils/file-utils";
import {FileSeparator} from "../utils/file-separator";
import {basic_12} from "./basic";
import {advanced_12} from "./advanced";

const input = readFile('12', FileSeparator.LINE, true);

basic_12(input, true).then(r => r);
advanced_12(input, true).then(r => r);
