import React from 'react';
import {Image, View, Text} from 'react-native';
import styles from './styles';
import images from './images';
import {CURRENCIES} from 'app/constants';

export default ({
    coin,
    style,
    small,
    light
}) => {
    let icon = coin;

    if (small && light) {
        icon = `${coin}_SM_LIGHT`;
    } else if (small) {
        icon = `${coin}_SM`;
    }

    const baseStyle = [styles.coin, small ? styles.coinSmall : null];

    if (!images[coin]) {
        return (
            <View style={[...baseStyle, styles.coinHolder, style]}>
                <Text style={styles.coinText}>{CURRENCIES[coin].symbol}</Text>
            </View>
        );
    }
    return (
        <Image
            style={[...baseStyle, style]}
            source={images[icon]}
        />
    );
};
