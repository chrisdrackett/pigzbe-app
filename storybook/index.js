import {AppRegistry} from 'react-native';
import {getStorybookUI, configure} from '@storybook/react-native';

function loadStories() {
    require('./stories/hello.js');
    require('./stories/key-holder.js');
    require('./stories/num-pad.js');
}

configure(loadStories, module);

const StorybookUI = getStorybookUI({
    port: 7007,
    host: 'localhost',
});
AppRegistry.registerComponent('PigzbeApp', () => StorybookUI);
