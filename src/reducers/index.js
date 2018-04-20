import {combineReducers} from 'redux';
import auth from './auth';
import messages from './messages';
import profile from './profile';
import wollo from './wollo';

export default combineReducers({
    auth,
    messages,
    profile,
    wollo
});
