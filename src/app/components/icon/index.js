import React from 'react';
import {Image} from 'react-native';

const icons = {
    chevron: require(`./images/chevron.png`),
}

export default ({name, style={}}) => (
    icons[name] ? <Image style={[style]} source={icons[name]} /> : null
)