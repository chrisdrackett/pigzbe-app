import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {FamilyMemberType} from '../../src/app/screens/family-member-type';

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
    .add('member-type', () => (
        <FamilyMemberType {...props}/>
    ));
