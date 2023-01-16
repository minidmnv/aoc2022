import { FileSeparator, readFile } from '../utils';
import { basic16 } from './basic'
import { advanced16 } from './advanced'

const input = readFile('16', FileSeparator.LINE, true);
void basic16(input, true).then(r => r);
void advanced16(input, true).then(r => r);
