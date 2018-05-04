import {combineReducers} from 'redux';
import auth from './auth';
import escrow from './escrow';
import loader from './loader';
import messages from './messages';
import profile from './profile';
import wollo from './wollo';

export default combineReducers({
    auth,
    escrow,
    loader,
    messages,
    profile,
    wollo
});
