import React from 'react';
import {Image} from 'react-native';

export default ({name, style={}}) => {
    return (
        <Image style={[style]} source={require('./images/chevron.png')} />
    );
};
