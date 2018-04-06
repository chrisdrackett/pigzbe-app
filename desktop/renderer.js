import {AppRegistry} from 'react-native';
import App from './bundle.web.js';

AppRegistry.registerComponent('App', () => App);
AppRegistry.runApplication('App', {rootTag: document.getElementById('react-root')});
