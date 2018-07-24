import React from 'react';
import {View} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import KeyHolder from '../../src/app/components/key-holder';

storiesOf('KeyHolder')
    .add('default view', () => (
        <View style={{backgroundColor: 'black'}}>
            <KeyHolder
                title={'Secret Key'}
                content={'SBBZSQRKV4NDIKRVSXYL3T7NYKR3QP4X23VYGLEWYITFCKFN6Y4GY2PA'}
                onPress={() => {}}
            />
        </View>
    ));
