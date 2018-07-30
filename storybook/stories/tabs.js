import React, {Fragment} from 'react';
import {storiesOf} from '@storybook/react-native';
import Tabs from '../../src/app/navigation/tabs/storybook';
import Footer from '../../src/app/components/footer';

storiesOf('Tabs')
    .add('default', () => (
        <Fragment>
            <Tabs/>
            <Footer/>
        </Fragment>
    ));
