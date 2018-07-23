import {combineReducers} from 'redux';
import auth from './auth';
import config from './config';
import escrow from './escrow';
import loader from './loader';
import messages from './messages';
import wollo from './wollo';
import coins from './coins';
import connected from './connected';
import game from './game';
import deviceAuth from './device-auth';
import settings from './settings';

import user from './claim/user';
import events from './claim/events';
import contract from './claim/contract';
import content from './claim/content';
import web3 from './claim/web3';

export default combineReducers({
    auth,
    config,
    escrow,
    loader,
    messages,
    wollo,
    connected,
    coins,
    game,
    deviceAuth,
    settings,
    // claim reducers
    user,
    events,
    contract,
    content,
    web3,
});
