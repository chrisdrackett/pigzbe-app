// https://github.com/facebook/react-native/issues/9599
if (typeof global.self === 'undefined') {
    global.self = global;
}

module.exports = require('./src/app');
