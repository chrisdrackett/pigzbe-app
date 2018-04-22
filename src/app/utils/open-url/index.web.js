const remote = window.require('electron').remote;
const main = remote.require('./main.js');

export default main.openURL;
