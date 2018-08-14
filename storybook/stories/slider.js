import React from 'react';
import {View} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import Slider from '../../src/app/components/slider';

const props = {
    onValueChange: value => console.log(value),
};

storiesOf('Slider')
    .add('default', () => (
        <View style={{padding: 20, marginTop: 20}}>
            <Slider {...props}/>
        </View>
    ))
    .add('disabled', () => (
        <View style={{padding: 20, marginTop: 20}}>
            <Slider {...{
                ...props,
                disabled: true
            }}/>
        </View>
    ));
