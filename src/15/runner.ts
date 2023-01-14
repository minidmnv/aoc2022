import {FileSeparator, readFile} from '../utils';
import {basic15} from './basic';
import {advanced15} from './advanced';

const input = readFile('15', FileSeparator.LINE, true);
void basic15(input,2000000,true).then(r => r);
void advanced15(input, 0, 4000000, true).then(r => r);
