import Game from './';
import {
    READY,
    COLLECTED,
    LEARN,
    LOG,
    ERROR
} from './constants';

const game = new Game(document.body);

document.addEventListener('message', () => {
    console.log('Received post message', event.data);
    if (typeof game[event.data] === 'function') {
        game[event.data]();
    }
});

const postMessage = (name, value = null) => window.postMessage(JSON.stringify({name, value}), '*');

game.app.emitter.on(READY, () => postMessage(READY));

game.app.emitter.on(COLLECTED, amount => postMessage(COLLECTED, amount));

game.app.emitter.on(LEARN, () => postMessage(LEARN));

game.app.emitter.on(LOG, message => postMessage(LOG, message));

game.app.emitter.on(ERROR, message => postMessage(ERROR, message));

window.onerror = (msg, url, lineNo, columnNo, error) => {
    const string = msg.toLowerCase();
    const substring = 'script error';
    let message = '';
    if (string.indexOf(substring) > -1) {
        message = 'Script Error';
    } else {
        message = [
            'Message: ' + msg,
            'URL: ' + url,
            'Line: ' + lineNo,
            'Column: ' + columnNo,
            'Error object: ' + JSON.stringify(error)
        ].join(' - ');

    }
    postMessage('error', message);
};

export default game;
