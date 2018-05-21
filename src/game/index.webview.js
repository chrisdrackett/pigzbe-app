import Game from './';

const game = new Game(document.body);

document.addEventListener('message', () => {
    console.log('Received post message', event.data);
    if (typeof game[event.data] === 'function') {
        game[event.data]();
    }
});

const postMessage = msg => document.postMessage(msg, '*');

game.emitter.on('ready', () => postMessage('ready'));

export default game;
