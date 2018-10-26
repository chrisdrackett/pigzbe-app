import {MEMO_MAX_LEN} from 'app/constants';
export default str => str.trim().slice(0, MEMO_MAX_LEN);
