import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {KidsIntro} from '../../src/app/screens/kids-intro';
import {KidsParentNickname} from '../../src/app/screens/kids-parent-nickname';
import {KidsNumberToAdd} from '../../src/app/screens/kids-number-to-add';
import {KidsEnterProfile} from '../../src/app/screens/kids-enter-profile';

const props = {
    dispatch: () => {},
    navigation: {
        navigate: () => {},
        addListener: () => {},
        state: {
            key: 'SCREEN_KIDS_INTRO',
            routeName: 'SCREEN_KIDS_INTRO'
        },
        actions: {}
    },
};

storiesOf('Kids')
    .add('intro', () => (
        <KidsIntro {...props}/>
    ))
    .add('parent nickname', () => (
        <KidsParentNickname {...props}/>
    ))
    .add('number to add', () => (
        <KidsNumberToAdd {...props}/>
    ))
    .add('enter profile', () => (
        <KidsEnterProfile {...props}/>
    ));
