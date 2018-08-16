import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {FamilyIntro} from '../../src/app/screens/family-intro';

const props = {
    dispatch: () => {},
    navigation: {
        navigate: () => {},
        addListener: () => {},
        state: {
            key: 'SCREEN_FAMILY_INTRO',
            routeName: 'SCREEN_FAMILY_INTRO'
        },
        actions: {}
    },
};

storiesOf('Family')
    .add('intro', () => (
        <FamilyIntro {...props}/>
    ));
