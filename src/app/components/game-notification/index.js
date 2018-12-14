import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import GameCloud from '../game-cloud';

export default ({amount, memo, name, hash, onActivateCloud, type}) => (
    <View>
        <View style={styles.wrapper}>
            <GameCloud
                type={type}
                value={amount}
                name={name}
                callback={() => onActivateCloud({amount, memo, hash, type, total: amount}) }
            />
        </View>
    </View>
);
