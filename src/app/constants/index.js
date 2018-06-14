export const strings = require('./strings.json');

export * from './screens';

export const BASE_CURRENCY = 'USD';
export const COINS = ['XLM', 'BTC', 'ETH', 'EUR', 'USD', 'JPY', 'GBP', 'GOLD'];
export const COIN_DPS = {XLM: 6, BTC: 6, ETH: 6, EUR: 2, USD: 2, JPY: 0, GBP: 2, GOLD: 6};
export const COIN_SYMBOLS = {XLM: 'XLM: ', BTC: '₿', ETH: 'Ξ', EUR: '€', USD: '$', JPY: '¥', GBP: '£', GOLD: ''};

export const ASSET_CODE = 'WLO';
export const ASSET_NAME = 'Wollo';
export const ASSET_DPS = COIN_DPS[ASSET_CODE];

export const PRIVACY_URL = 'https://pigzbe.com/pdf/pigzbe_privacy_notice.pdf';

export const NUM_VALIDATIONS = 7;
