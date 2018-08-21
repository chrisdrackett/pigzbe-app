import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {FamilyNumberKids} from '../../src/app/screens/family-number-kids';

const props = {
    // dispatch: () => {},
    // navigation: {
    //     navigate: () => {},
    //     addListener: () => {},
    //     state: {
    //         key: 'SCREEN_FAMILY_MEMBER',
    //         routeName: 'SCREEN_FAMILY_MEMBER'
    //     },
    //     actions: {}
    // },
};

storiesOf('Family')
    .add('number-kids', () => (
        <FamilyNumberKids {...props}/>
    ));
