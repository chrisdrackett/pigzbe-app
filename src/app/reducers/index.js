import {combineReducers} from 'redux';
import app from './app';
import auth from './auth';
import config from './config';
import escrow from './escrow';
import loader from './loader';
import keys from './keys';
import messages from './messages';
import wollo from './wollo';
import coins from './coins';
import game from './game';
import deviceAuth from './device-auth';
import settings from './settings';
import kids from './kids';
import tasks from './tasks';
import vip from './vip';
import kyc from './kyc';
import claim from './claim';

export default combineReducers({
    app,
    auth,
    config,
    escrow,
    loader,
    keys,
    messages,
    wollo,
    coins,
    game,
    deviceAuth,
    settings,
    kids,
    tasks,
    vip,
    kyc,
    claim,
});
