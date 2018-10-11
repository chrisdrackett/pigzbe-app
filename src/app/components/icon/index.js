import React from 'react';
import {Image} from 'react-native';

const icons = {
    wollo: require('./images/wollo.png'),
    chevron: require('./images/chevron.png'),
    plus: require('./images/plus.png'),
    krona: require('./images/krona.png'),
    nok: require('./images/nok.png'),
    stellar: require('./images/stellar.png'),
    swissFranc: require('./images/swissFranc.png'),
    cross: require('./images/cross.png'),
    qrCode: require('./images/qrCode.png'),
    qrCodeScan: require('./images/qrCodeScan.png'),
    settings: require('./images/settings.png'),
    back: require('./images/back.png'),
    gameBack: require('./images/gameBack.png'),
    crossBlue: require('./images/cross_blue.png'),
};

export default ({name, style = {}}) => (
    icons[name] ? <Image style={style} source={icons[name]} resizeMode="contain" /> : null
);
