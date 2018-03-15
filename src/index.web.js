import 'babel-polyfill';
import {AppRegistry} from 'react-native';
import App from './App';

const div = document.createElement('div');
div.id = 'react-root';
document.body.appendChild(div);

AppRegistry.registerComponent('App', () => App);
AppRegistry.runApplication('App', {rootTag: div});
