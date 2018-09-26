import React from 'react';
import {View, Image} from 'react-native';
import styles from './styles';

export default () => (
    <View style={styles.wrapper}>
        <View style={styles.sky} />
        <View style={styles.sunWrapper}>
            <Image style={styles.sun} source={require('./images/sun.png')} />
        </View>
        <Image
            style={[styles.mountains, styles.mountainsLeft]}
            source={require('./images/mountains.png')}
        />
        <Image
            style={[styles.mountains, styles.mountainsRight]}
            source={require('./images/mountains.png')}
        />
        <Image
            style={styles.ground}
            resizeMode="repeat"
            source={require('./images/ground.png')}
        />
        <Image
            style={styles.foliage}
            source={require('./images/foliage.png')}
        />
        <Image
            style={[styles.grass, styles.grassLeft]}
            source={require('./images/grass.png')}
        />
        <Image
            style={[styles.grass, styles.grassRight]}
            source={require('./images/grass.png')}
        />
    </View>
);
