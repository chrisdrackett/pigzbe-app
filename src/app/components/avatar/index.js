import React from 'react';
import {Image} from 'react-native';
import styles from './styles';
import avatarImg from './avatar.png';
import profileSelect from '../../../../assets/images/profile.png'

export default ({
    image
}) => (
    <Image
        source={image ? {uri: image} : profileSelect}
        style={image ? styles.avatarImage : styles.avatarImageSelect}
    />
);
