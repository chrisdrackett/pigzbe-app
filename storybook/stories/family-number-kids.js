import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {FamilyNumberKids} from '../../src/app/screens/family-number-kids';

const props = {
};

storiesOf('Family')
    .add('number-kids', () => (
        <FamilyNumberKids {...props}/>
    ));
