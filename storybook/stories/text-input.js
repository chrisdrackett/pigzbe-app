import React from 'react';
import {View} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import TextInput from '../../src/app/components/text-input';

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

storiesOf('TextInput')
    .add('default', () => (
        <View style={style}>
            <TextInput
                error={false}
                value={''}
                placeholder={'secret key'}
                onChangeText={() => {}}
            />
        </View>
    ))
    .add('with label', () => (
        <View style={style}>
            <TextInput
                label={'Lorem ipsum'}
                error={false}
                value={''}
                placeholder={'secret key'}
                onChangeText={() => {}}
            />
        </View>
    ))
    .add('with text', () => (
        <View style={style}>
            <TextInput
                error={false}
                value={'Lorem ipsum dolor'}
                placeholder={'secret key'}
                onChangeText={() => {}}
            />
        </View>
    ))
    .add('multiline', () => (
        <View style={style}>
            <TextInput
                error={false}
                value={''}
                placeholder={'secret key'}
                onChangeText={() => {}}
                numberOfLines={4}
                returnKeyType="done"
            />
        </View>
    ))
    .add('error', () => (
        <View style={style}>
            <TextInput
                error={true}
                value={''}
                placeholder={'secret key'}
                onChangeText={() => {}}
                numberOfLines={4}
                returnKeyType="done"
            />
        </View>
    ))
    .add('dark', () => (
        <View style={[style, light]}>
            <TextInput
                dark
                error={false}
                value={''}
                placeholder={'secret key'}
                onChangeText={() => {}}
                numberOfLines={4}
                returnKeyType="done"
            />
        </View>
    ));
