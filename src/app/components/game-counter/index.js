import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import GameWollo from '../game-wollo';

export default ({value}) => (
    <View style={styles.wrapper}>
        <View style={styles.container}>
            <GameWollo value={value} />
        </View>
    </View>
);
