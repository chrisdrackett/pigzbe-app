import React from 'react';
import {Image} from 'react-native';

const icons = {
    wollo: require(`./images/wollo.png`),
    chevron: require(`./images/chevron.png`),
    plus: require(`./images/plus.png`),
    krona: require(`./images/krona.png`),
    nok: require(`./images/nok.png`),
    stellar: require(`./images/stellar.png`),
    swissFranc: require(`./images/swissFranc.png`),
    cross: require(`./images/cross.png`),
}

export default ({name, style={}}) => (
    icons[name] ? <Image style={[style]} source={icons[name]} resizeMode="contain" /> : null
)