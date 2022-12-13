import {readFile} from "../utils/file-utils";
import {FileSeparator} from "../utils/file-separator";
import {basic_09} from "./basic";
import {advanced_09} from "./advanced";

const input = readFile('09', FileSeparator.LINE, true);

basic_09(input, true).then(r => r);
advanced_09(input, true).then(r => r);
