import {basic_05} from "./basic";
import {advanced_05} from "./advanced";
import {readFile} from "../utils/file-utils";
import {FileSeparator} from "../utils/file-separator";

const input = readFile('05', FileSeparator.LINE);

basic_05(input, true).then(r => r);
advanced_05(input, true).then(r => r);
