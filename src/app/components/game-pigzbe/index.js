import React from 'react';
import {Image} from 'react-native';

export default ({style = {}}) => (
    <Image style={[style]} source={require('./images/pigzbe.png')} />
);
