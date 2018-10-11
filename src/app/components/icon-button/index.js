import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from '../icon';
import styles from './styles';

export default ({
    icon,
    size = 20,
    padding = 10,
    style,
    onPress,
}) => (
    <TouchableOpacity style={[styles.button, {padding}, style]} onPress={onPress}>
        <Icon style={{width: size, height: size}} name={icon} />
    </TouchableOpacity>
);
