import {readFile} from "../utils/file-utils";
import {FileSeparator} from "../utils/fileSeparator";
import { basic_11 } from './basic'
import { advanced_11 } from './advanced'

const input = readFile('11', FileSeparator.LINE, false);

basic_11(input, 8, 20, true).then(r => r);
advanced_11(input, 8, 10000, true).then(r => r);
