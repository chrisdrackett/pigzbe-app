import React from 'react';
import {Image} from 'react-native';
import styles from './styles';
import avatarImg from './avatar.png';

export default ({
    image
}) => (
    <Image
        source={image ? {uri: image} : avatarImg}
        style={styles.avatarImage}
    />
);
