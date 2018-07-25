import React from 'react';
import {View} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import Button from '../../src/app/components/button';

const style = {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 40,
};

const light = {
    backgroundColor: 'white'
};

storiesOf('Button')
    .add('default button', () => (
        <View style={style}>
            <Button
                label={'Lorem ipsum'}
                onPress={() => {}}
            />
            <Button
                disabled
                label={'Lorem ipsum'}
                onPress={() => {}}
            />
        </View>
    ))
    .add('plain button', () => (
        <View style={style}>
            <Button
                plain
                label={'Lorem ipsum'}
                onPress={() => {}}
            />
        </View>
    ))
    .add('secondary button', () => (
        <View style={style}>
            <Button
                secondary
                label={'Lorem ipsum'}
                onPress={() => {}}
            />
        </View>
    ))
    .add('outline button', () => (
        <View style={[style, light]}>
            <Button
                outline
                label={'Lorem ipsum'}
                onPress={() => {}}
            />
        </View>
    ));
