import Game from './';

const game = new Game(document.body);

document.addEventListener('message', () => {
    console.log('Received post message', event.data);
    // game.onMessage(event.data);
    if (typeof game[event.data] === 'function') {
        game[event.data]();
    }
});

// document.postMessage('Post message from web', '*');

export default game;
