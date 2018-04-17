import {combineReducers} from 'redux';
import auth from './auth';
import profile from './profile';
import wollo from './wollo';

export default combineReducers({
    auth,
    profile,
    wollo
});
