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

export default game;
