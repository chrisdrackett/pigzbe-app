import React from 'react';
import {storiesOf} from '@storybook/react-native';
import TokenSelector from '../../src/app/components/token-selector';

storiesOf('TokenSelector')
    .add('default', () => (
        <TokenSelector />
    ));
