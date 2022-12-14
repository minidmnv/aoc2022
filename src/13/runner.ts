import {readFile} from "../utils/file-utils";
import {FileSeparator} from "../utils/file-separator";
import { advanced_13 } from './advanced'
import { basic_13 } from './basic'

const input = readFile('13', FileSeparator.LINE, true);

basic_13(input, true).then(r => r);
advanced_13(input, true).then(r => r);
