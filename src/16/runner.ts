import { FileSeparator, readFile } from '../utils';
import { basic16 } from './basic'
import { advanced16 } from './advanced'

const input = readFile('16', FileSeparator.LINE, true);
void basic16(input, 30, true).then(r => r);
void advanced16(input, 26, true).then(r => r);
