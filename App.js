// https://github.com/facebook/react-native/issues/9599
if (typeof global.self === 'undefined') {
    global.self = global;
}

window.navigator.platform = 'ios';

module.exports = require('./src/App');
