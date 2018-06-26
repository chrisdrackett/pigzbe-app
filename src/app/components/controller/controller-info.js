import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import images from './images';

export default ({scanning, connected, onPress}) => {
    const source = connected ? images.connected : scanning ? images.scanning : images.idle;
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.container}>
            <Image style={styles.image} source={source}/>
        </TouchableOpacity>
    );
};
