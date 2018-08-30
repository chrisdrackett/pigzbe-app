import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {FamilyEnterChild} from '../../src/app/screens/family-enter-child';

const props = {
};

storiesOf('Family')
    .add('enter-child', () => (
        <FamilyEnterChild {...props}/>
    ));
