import {AppRegistry} from 'react-native';
import {getStorybookUI, configure} from '@storybook/react-native';

function loadStories() {
    require('./stories/hello.js');
    require('./stories/key-holder.js');
    require('./stories/num-pad.js');
    require('./stories/button.js');
    require('./stories/text-input.js');
    require('./stories/select-input.js');
    require('./stories/step-module.js');
    require('./stories/modal.js');
    require('./stories/balance.js');
    require('./stories/passcode.js');
    require('./stories/home.js');
    require('./stories/keys.js');
    require('./stories/settings.js');
    require('./stories/touch-id.js');
    require('./stories/transfer.js');
    require('./stories/device-auth.js');
    require('./stories/messages.js');
    require('./stories/learn.js');
    require('./stories/escrow.js');
    require('./stories/claim.js');
    require('./stories/game.js');
    require('./stories/tabs.js');
    require('./stories/loader.js');
    require('./stories/load-error.js');
    require('./stories/alert.js');
    require('./stories/child-login.js');
    require('./stories/icon-pad.js');
    require('./stories/family.js');
    require('./stories/tasks.js');
    require('./stories/tasks-assign.js');
    require('./stories/family-member.js');
    require('./stories/family-number-kids.js');
    require('./stories/family-enter-child.js');
    require('./stories/toggle.js');
    require('./stories/slider.js');
    require('./stories/wollo.js');
    require('./stories/wollo-input.js');
    require('./stories/searchable-list.js');
}

configure(loadStories, module);

const StorybookUI = getStorybookUI({
    port: 7007,
    // host: '192.168.0.15',
    host: 'localhost',
});

AppRegistry.registerComponent('PigzbeApp', () => StorybookUI);

if (typeof console !== 'undefined') {
    console.disableYellowBox = true;
}
