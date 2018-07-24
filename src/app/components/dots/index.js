import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import array from 'usfl/array/array';

const Dot = ({active}) => <View style={active ? styles.dotActive : styles.dot}/>;

export default ({length = 6, progress = 0}) => (
    <View style={[styles.dots, {width: 20 * length}]}>
        {array(length).map(n => <Dot key={n} active={n < progress}/>)}
    </View>
);
