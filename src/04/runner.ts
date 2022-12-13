import {basic_04} from "./basic";
import {advanced_04} from "./advanced";
import {readFile} from "../utils/file-utils";
import {FileSeparator} from "../utils/file-separator";

const input = readFile('04', FileSeparator.LINE, true);

basic_04(input, true).then(r => r);
advanced_04(input, true).then(r => r);
