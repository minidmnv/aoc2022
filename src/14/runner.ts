import { FileSeparator, readFile } from '../utils';
import { basic14 } from './basic';
import { advanced14 } from './advanced';

const input = readFile('14', FileSeparator.LINE, true);
void basic14(input, true).then(r => r);
void advanced14(input, true).then(r => r);
