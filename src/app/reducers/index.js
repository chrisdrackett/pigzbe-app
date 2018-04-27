import {combineReducers} from 'redux';
import auth from './auth';
import loader from './loader';
import messages from './messages';
import profile from './profile';
import wollo from './wollo';

export default combineReducers({
    auth,
    loader,
    messages,
    profile,
    wollo
});
