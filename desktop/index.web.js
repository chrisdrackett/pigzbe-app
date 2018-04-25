import 'babel-polyfill';
import {AppRegistry} from 'react-native';
import App from '../src/App';
import PoppinsRegular from '../assets/fonts/PoppinsRegular.ttf';
import PoppinsSemiBold from '../assets/fonts/PoppinsSemiBold.ttf';

const style = document.createElement('style');
style.type = 'text/css';
style.appendChild(document.createTextNode(`
    @font-face {
        font-family: "Poppins";
        font-style: normal;
        font-weight: normal;
        src: url("${PoppinsRegular}") format("truetype");
    }
    @font-face {
        font-family: "Poppins";
        font-style: normal;
        font-weight: bold;
        src: url("${PoppinsSemiBold}") format("truetype");
    }
    html,
    body,
    #react-root,
    #react-root>div {
        height: 100%;
        -webkit-font-smoothing: antialiased;
    }
`));
document.head.appendChild(style);

const div = document.createElement('div');
div.id = 'react-root';
document.body.appendChild(div);

AppRegistry.registerComponent('App', () => App);
AppRegistry.runApplication('App', {rootTag: div});
