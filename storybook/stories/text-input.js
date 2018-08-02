import React from 'react';
import {View} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import TextInput from '../../src/app/components/text-input';

const style = {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 40,
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
                numberOfLines={3}
                returnKeyType="done"
            />
        </View>
    ))
    .add('multiline with text', () => (
        <View style={style}>
            <TextInput
                error={false}
                value={'Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci.'}
                placeholder={'secret key'}
                onChangeText={() => {}}
                numberOfLines={3}
                returnKeyType="done"
            />
        </View>
    ))
    .add('multiline with text 2', () => (
        <View style={style}>
            <TextInput
                error={false}
                value={'Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris.'}
                placeholder={'secret key'}
                onChangeText={() => {}}
                numberOfLines={3}
                returnKeyType="done"
            />
        </View>
    ))
    .add('multiline with text 3', () => (
        <View style={style}>
            <TextInput
                error={false}
                value={'Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris.'}
                placeholder={'secret key'}
                onChangeText={() => {}}
                numberOfLines={4}
                returnKeyType="done"
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
    ));
