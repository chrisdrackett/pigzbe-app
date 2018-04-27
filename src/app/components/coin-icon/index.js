import React from 'react';
import {
    Image
} from 'react-native';
import styles from './styles';
import images from './images';

export default ({
    coin,
    style
}) => (
    <Image
        style={style ? [styles.coin].concat(style) : styles.coin}
        source={images[coin.toUpperCase()]}
    />
);
