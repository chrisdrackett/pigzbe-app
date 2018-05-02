import React from 'react';
import {Image} from 'react-native';
import styles from './styles';
import profileUnset from './images/unset.png';
import profileSelect from './images/profile.png';

export default ({
    image,
    select
}) => (
    <Image
        source={image ? {uri: image} : select ? profileSelect : profileUnset}
        style={image ? styles.avatarImage : select ? styles.avatarImageSelect : styles.avatarImageUnset}
    />
);
