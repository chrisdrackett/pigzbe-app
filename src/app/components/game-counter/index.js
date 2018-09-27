import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import styles from './styles';
import GameWollo from '../game-wollo';

export default ({value, onPress}) => (
    <TouchableOpacity style={styles.wrapper} onPress={onPress}>
        <View style={styles.container}>
            <GameWollo value={value} />
        </View>
    </TouchableOpacity>
);
