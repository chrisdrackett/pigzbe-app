// https://github.com/facebook/react-native/issues/9599
if (typeof global.self === 'undefined') {
    global.self = global;
}

// Proxies src/App.js for compatibility with create-react-native-app
// import App from './src/App';
// export default App;
// export * from './src/App';

module.exports = require('./src/App');
