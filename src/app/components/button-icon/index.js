import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import styles from './styles';
import images from '../overlay/images';

const ButtonIcon = ({icon, onClick}) => (
    <TouchableOpacity
        style={styles.container}
        data-icon={icon}
        onPress={onClick}>
        <Image
            style={styles.image}
            source={images[icon]}
        />
    </TouchableOpacity>
);

export default ButtonIcon;
