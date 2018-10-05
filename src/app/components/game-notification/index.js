import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import GameCloud from '../game-cloud';

export default ({amount, memo, hash, onActivateCloud, type}) => (
    <View>
        <View style={styles.wrapper}>
            <GameCloud
                type={type}
                value={amount}
                name={memo}
                callback={() => onActivateCloud({amount, memo, hash, type}) }
            />
        </View>
    </View>
);
