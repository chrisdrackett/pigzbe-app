import 'babel-polyfill';
import '../src/game/index.webview.js';

const style = document.createElement('style');
style.type = 'text/css';
style.appendChild(document.createTextNode(`
    html,
    body,
    canvas {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
    }
`));
document.head.appendChild(style);
