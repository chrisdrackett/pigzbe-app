import Game from './';

const game = new Game(document.body);

document.addEventListener('message', () => {
    console.log('Received post message', event.data);
    if (typeof game[event.data] === 'function') {
        game[event.data]();
    }
});

const postMessage = (name, value = null) => window.postMessage(JSON.stringify({name, value}), '*');

game.app.emitter.on('ready', () => postMessage('ready'));

game.app.emitter.on('collected', amount => postMessage('collected', amount));

game.app.emitter.on('learn', () => postMessage('learn'));

game.app.emitter.on('log', message => postMessage('log', message));

game.app.emitter.on('error', message => postMessage('error', message));

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
