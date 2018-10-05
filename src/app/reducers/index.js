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

import eth from './claim/eth';
import events from './claim/events';
import contract from './claim/contract';
import claimData from './claim/claim-data';
import web3 from './claim/web3';

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
    // claim reducers
    eth,
    events,
    contract,
    claimData,
    web3,
});
