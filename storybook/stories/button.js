import React from 'react';
import {View} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import Button from '../../src/app/components/button';
import {color} from '../../src/app/styles';

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

const grey = {
    backgroundColor: 'rgb(180, 180, 180)'
};

storiesOf('Button')
    .add('default button', () => (
        <View style={[style, light]}>
            <Button
                label={'Lorem ipsum'}
                onPress={() => {}}
            />
            <Button
                disabled
                label={'Lorem ipsum'}
                onPress={() => {}}
            />
            <Button
                label={'Lorem ipsum'}
                onPress={() => {}}
                style={{backgroundColor: color.red, borderColor: color.red}}
            />
        </View>
    ))
    .add('plain button', () => (
        <View style={[style, light]}>
            <Button
                theme="plain"
                label={'Lorem ipsum'}
                onPress={() => {}}
            />
            <Button
                theme="plain"
                disabled
                label={'Lorem ipsum'}
                onPress={() => {}}
            />
        </View>
    ))
    .add('light button', () => (
        <View style={[style]}>
            <Button
                theme="light"
                label={'Lorem ipsum'}
                onPress={() => {}}
            />
            <Button
                theme="light"
                disabled
                label={'Lorem ipsum'}
                onPress={() => {}}
            />
        </View>
    ))
    .add('outline button', () => (
        <View style={[style, light]}>
            <Button
                theme="outline"
                label={'Lorem ipsum'}
                onPress={() => {}}
            />
            <Button
                theme="outline"
                disabled
                label={'Lorem ipsum'}
                onPress={() => {}}
            />
        </View>
    ))
    .add('plain light button', () => (
        <View style={[style]}>
            <Button
                theme="plain_light"
                label={'Lorem ipsum'}
                onPress={() => {}}
            />
            <Button
                theme="plain_light"
                disabled
                label={'Lorem ipsum'}
                onPress={() => {}}
            />
        </View>
    ))
    .add('all', () => (
        <View style={[style, grey]}>
            <Button
                label={'Lorem ipsum'}
                onPress={() => {}}
            />
            <Button
                disabled
                label={'Lorem ipsum'}
                onPress={() => {}}
            />
            <Button
                theme="light"
                label={'Lorem ipsum'}
                onPress={() => {}}
            />
            <Button
                theme="light"
                disabled
                label={'Lorem ipsum'}
                onPress={() => {}}
            />
            <Button
                theme="outline"
                label={'Lorem ipsum'}
                onPress={() => {}}
            />
            <Button
                theme="outline"
                disabled
                label={'Lorem ipsum'}
                onPress={() => {}}
            />

            <Button
                theme="plain"
                label={'Lorem ipsum'}
                onPress={() => {}}
            />
            <Button
                theme="plain"
                disabled
                label={'Lorem ipsum'}
                onPress={() => {}}
            />

            <Button
                theme="plain_light"
                label={'Lorem ipsum'}
                onPress={() => {}}
            />
            <Button
                theme="plain_light"
                disabled
                label={'Lorem ipsum'}
                onPress={() => {}}
            />

            <Button
                theme="plain_light"
                label={'Lorem ipsum'}
                onPress={() => {}}
                textStyle={{fontSize: 20}}
            />
            <Button
                theme="plain_light"
                disabled
                label={'Lorem ipsum'}
                onPress={() => {}}
                textStyle={{fontSize: 20}}
            />
        </View>
    ));
