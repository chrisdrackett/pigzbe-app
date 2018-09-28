import '../src/app/global';
import {AppRegistry} from 'react-native';
import {getStorybookUI, configure} from '@storybook/react-native';

function loadStories() {
    require('./stories/hello.js');
    require('./stories/key-holder.js');
    require('./stories/button.js');
    require('./stories/text-input.js');
    require('./stories/select-input.js');
    require('./stories/step-module.js');
    require('./stories/modal.js');
    require('./stories/dashboard.js');
    require('./stories/passcode.js');
    require('./stories/home.js');
    require('./stories/keys.js');
    require('./stories/settings.js');
    require('./stories/touch-id.js');
    require('./stories/transfer.js');
    require('./stories/device-auth.js');
    require('./stories/messages.js');
    require('./stories/escrow.js');
    require('./stories/claim.js');
    require('./stories/game.js');
    require('./stories/game-components.js');
    require('./stories/tabs.js');
    require('./stories/loader.js');
    require('./stories/load-error.js');
    require('./stories/alert.js');
    require('./stories/kid-login.js');
    require('./stories/tasks.js');
    require('./stories/kids.js');
    require('./stories/toggle.js');
    require('./stories/slider.js');
    require('./stories/wollo.js');
    require('./stories/wollo-input.js');
    require('./stories/currency-toggle.js');
    require('./stories/kid-dashboard.js');
    require('./stories/searchable-list.js');
    require('./stories/action-sheet.js');
    require('./stories/notification-modal.js');
    require('./stories/allowance.js');
    require('./stories/claim-vip.js');
    require('./stories/loader-modal.js');
    require('./stories/view-address.js');
    require('./stories/tree.js');
    require('./stories/tree-new.js');
    require('./stories/tree-high.js');
    require('./stories/tree-with-leaf-added.js');
    require('./stories/cloud.js');
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
