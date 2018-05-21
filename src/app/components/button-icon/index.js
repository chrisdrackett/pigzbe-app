import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import styles from './styles';

const ButtonIcon = ({icon, onClick, selected}) => (
    <TouchableOpacity
        style={selected ? [styles.container, styles.selected] : styles.container}
        data-icon={icon}
        onPress={onClick}>
        <Image
            style={styles.image}
            source={icon}
        />
    </TouchableOpacity>
);

export default ButtonIcon;
