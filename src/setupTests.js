import './app/global';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {combineReducers} from 'redux';

export const mockStore = reducers => createStore(combineReducers(reducers || {dummy: (state = {}) => state}), applyMiddleware(thunk));

global.window = global;

// mock fetch

global.fetch = require('jest-fetch-mock');

// mock native modules

const NM = require('react-native').NativeModules;

NM.RNRandomBytes = {
    randomBytes: (length, cb) => cb(null, 'i5gOos0YivqmiLBVAsWTbU9VWBausxF43ghv2C+n9y4=')
};

NM.CameraManager = {
    Aspect: {},
    BarCodeType: {},
    Type: {},
    CaptureMode: {},
    CaptureTarget: {},
    CaptureQuality: {},
    Orientation: {},
    FlashMode: {},
    Zoom: {},
    TorchMode: {},
};

// mock webview

jest.mock('./game/game.html', () => 'html', {virtual: true});
jest.mock('WebView', () => 'WebView');

// mock NetInfo

jest.mock('NetInfo', () => {
    return {
        isConnected: {
            addEventListener: () => {},
            removeEventListener: () => {},
            getConnectionInfo: () => {
                return new Promise((accept) => {
                    accept(true);
                });
            },
            fetch: () => {
                return new Promise((accept) => {
                    accept(true);
                });
            }
        }
    };
});

jest.useFakeTimers();
