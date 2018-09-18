export const strings = require('./strings.json');

export * from './screens';

export const BASE_CURRENCY = 'USD';
export const COINS = ['XLM', 'BTC', 'ETH', 'EUR', 'USD', 'JPY', 'GBP', 'GOLD'];
export const COIN_DPS = {XLM: 5, BTC: 5, ETH: 5, EUR: 2, USD: 2, JPY: 0, GBP: 2, GOLD: 5};
export const COIN_SYMBOLS = {XLM: 'XLM: ', BTC: '₿', ETH: 'Ξ', EUR: '€', USD: '$', JPY: '¥', GBP: '£', GOLD: '', WLO: 'W'};

export const ASSET_CODE = 'WLO';
export const ASSET_NAME = 'Wollo';
export const ASSET_DPS = COIN_DPS[ASSET_CODE];

export const PRIVACY_URL = 'https://pigzbe.com/pdf/pigzbe_privacy_notice.pdf';
export const TERMS_URL = 'https://pigzbe.com/pdf/pigzbe_terms_of_website_use.pdf';
export const SUPPORT_URL = 'https://pigzbe.com/support';


export const NUM_VALIDATIONS = 7;

export const KEYCHAIN_ID_MNEMONIC = 'com.pigzbe.PigzbeApp.mnemonic';
export const KEYCHAIN_ID_PASSCODE = 'com.pigzbe.PigzbeApp.passcode';
export const KEYCHAIN_ID_STELLAR_KEY = 'com.pigzbe.PigzbeApp.stellarKey';
export const KEYCHAIN_ID_ETH_KEY = 'com.pigzbe.PigzbeApp.ethKey';

export const STORAGE_KEY_SETTINGS = 'settings';
export const STORAGE_KEY_BURNING = 'burning';
export const STORAGE_KEY_KIDS = 'kids';
export const STORAGE_KEY_TASKS = 'tasks';

export const PASSCODE_LENGTH = 6;
export const KID_PASSCODE_LENGTH = 3;

export const CHILD_WALLET_BALANCE_XLM = '10';
export const CHILD_TASKS_BALANCE_XLM = '5';
// @todo make all areas of the site use this
export const CURRENCIES = {
    USD: {name: 'United States dollar', symbol: '$', dps: 2},
    EUR: {name: 'Euro', symbol: '€', dps: 2},
    JPY: {name: 'Japanese yen', symbol: '¥', dps: 0},
    GBP: {name: 'Pound sterling', symbol: '£', dps: 2},
    AUD: {name: 'Australian dollar', symbol: '$', dps: 2},
    CAD: {name: 'Canadian dollar', symbol: '$', dps: 2},
    CHF: {name: 'Swiss franc', symbol: 'CHF', dps: 2},
    CNY: {name: 'Renminbi', symbol: '¥', dps: 2},
    SEK: {name: 'Swedish krona', symbol: 'kr', dps: 2},
    NZD: {name: 'New Zealand dollar', symbol: '$', dps: 2},
    MXN: {name: 'Mexican peso', symbol: '$', dps: 2},
    SGD: {name: 'Singapore dollar', symbol: '$', dps: 2},
    HKD: {name: 'Hong Kong dollar', symbol: '$', dps: 2},
    NOK: {name: 'Norwegian krone', symbol: 'kr', dps: 2},
    KRW: {name: 'South Korean won', symbol: '₩', dps: 2},
    TRY: {name: 'Turkish lira', symbol: 'TRY ', dps: 2},
    RUB: {name: 'Russian ruble', symbol: '₽', dps: 2},
    INR: {name: 'Indian rupee', symbol: 'INR ', dps: 2},
    BRL: {name: 'Brazilian real', symbol: 'R$', dps: 2},
    ZAR: {name: 'South African rand', symbol: 'R', dps: 2},
    GOLD: {name: 'Gold', symbol: 'Gold', dps: 5},
    XLM: {name: 'Stellar Lumens', symbol: 'XLM ', dps: 5},
    BTC: {name: 'Bitcoin', symbol: '₿', dps: 5},
    ETH: {name: 'Etheruem', symbol: 'Ξ', dps: 5},
    WLO: {name: 'Wollo', symbol: 'W', dps: 5},
};
