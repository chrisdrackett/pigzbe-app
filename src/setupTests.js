global.window = global;

// mock fetch

global.fetch = require('jest-fetch-mock');

// mock native modules

require('react-native').NativeModules.RNRandomBytes = {
    randomBytes: (length, cb) => cb(null, 'i5gOos0YivqmiLBVAsWTbU9VWBausxF43ghv2C+n9y4=')
};

// mock webview

jest.mock('./game/game.html', () => 'html');
jest.mock('WebView', () => 'WebView');
