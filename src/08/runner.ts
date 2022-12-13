import {basic_08} from "./basic";
import {readFile} from "../utils/file-utils";
import {FileSeparator} from "../utils/file-separator";
import {advanced_08} from "./advanced";

const input = readFile('08', FileSeparator.LINE, true);

basic_08(input, true).then(r => r);
advanced_08(input, true).then(r => r);
