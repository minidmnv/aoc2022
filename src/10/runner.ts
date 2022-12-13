import {readFile} from "../utils/file-utils";
import {FileSeparator} from "../utils/file-separator";
import {basic_10} from "./basic";
import { advanced_10 } from './advanced'

const input = readFile('10', FileSeparator.LINE, true);

basic_10(input, true).then(r => r);
advanced_10(input, false).then(r => r);
